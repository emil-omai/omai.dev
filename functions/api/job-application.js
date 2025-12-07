/**
 * Cloudflare Pages Function to handle job application form submissions
 * Set environment variables in Cloudflare Pages dashboard:
 * - EMAIL_TO: The email address to send applications to
 * - RESEND_API_KEY: Your Resend API key (get from https://resend.com)
 * - TRELLO_API_KEY: Your Trello API key (get from https://trello.com/app-key)
 * - TRELLO_TOKEN: Your Trello API token (generate using the authorization URL:
 *   https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&name=YourAppName&key=YOUR_API_KEY)
 * - TRELLO_LIST_ID: The ID of the Trello list where cards should be created
 *   (Find this by opening a card in the list and adding .json to the URL)
 */

/**
 * Helper function to create a Trello card for a job application
 * @param {Object} params - Application data
 * @param {string} params.name - Applicant name
 * @param {string} params.email - Applicant email
 * @param {string} params.message - Cover letter/message
 * @param {string} params.cvFileName - Name of the CV file
 * @param {string} params.cvBase64 - Base64 encoded CV file content
 * @param {Object} env - Environment variables
 */
async function createTrelloCard({ name, email, message, cvFileName, cvBase64 }, env) {
  // Check if Trello credentials are configured
  // Support TRELLO_TOKEN (preferred) or TRELLO_SECRET for backwards compatibility
  const trelloToken = env.TRELLO_TOKEN || env.TRELLO_SECRET;
  if (!env.TRELLO_API_KEY || !trelloToken || !env.TRELLO_LIST_ID) {
    console.warn('Trello credentials not fully configured, skipping card creation');
    console.warn('Required: TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_LIST_ID');
    return null;
  }

  try {
    // Create the card
    const cardData = {
      name: `Jobbansökan: ${name}`,
      desc: `**E-post:** ${email}\n\n**Meddelande:**\n${message}\n\n**CV:** ${cvFileName}`,
      idList: env.TRELLO_LIST_ID,
      key: env.TRELLO_API_KEY,
      token: env.TRELLO_SECRET,
    };

    // Trello API requires key and token as query parameters, not in the body
    const cardPayload = {
      name: cardData.name,
      desc: cardData.desc,
      idList: cardData.idList,
    };

    const queryParams = new URLSearchParams({
      key: env.TRELLO_API_KEY,
      token: trelloToken,
    });

    const trelloUrl = `https://api.trello.com/1/cards?${queryParams.toString()}`;
    console.log('Trello card data:', cardPayload);
    console.log('About to call Trello API:', trelloUrl);
    
    let trelloResponse;
    try {
      trelloResponse = await fetch(trelloUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardPayload),
      });
      console.log('Trello response received:', trelloResponse.status, trelloResponse.statusText);
    } catch (fetchError) {
      console.error('Fetch error when calling Trello API:', fetchError);
      throw fetchError;
    }

    if (!trelloResponse.ok) {
      const errorText = await trelloResponse.text();
      console.error('Trello API error:', trelloResponse.status, errorText);
      return null;
    }

    const card = await trelloResponse.json();
    console.log('Trello card created successfully:', card.id);

    // Attach the CV file to the card
    if (cvBase64 && cvFileName) {
      try {
        // Convert base64 to binary for FormData
        const binaryString = atob(cvBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes]);

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', blob, cvFileName);
        formData.append('key', env.TRELLO_API_KEY);
        formData.append('token', trelloToken);

        const attachmentResponse = await fetch(
          `https://api.trello.com/1/cards/${card.id}/attachments`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!attachmentResponse.ok) {
          const errorText = await attachmentResponse.text();
          console.error('Trello attachment error:', attachmentResponse.status, errorText);
        } else {
          const attachment = await attachmentResponse.json();
          console.log('CV attached to Trello card:', attachment.id);
        }
      } catch (attachError) {
        // Don't fail the whole process if attachment fails
        console.error('Failed to attach CV to Trello card:', attachError);
      }
    }

    return card;
  } catch (error) {
    // Don't throw - Trello failure shouldn't break the application submission
    console.error('Failed to create Trello card:', error);
    return null;
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  console.log('onRequestPost');

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const cvFile = formData.get('cv');

    if (!name || !email || !message || !cvFile) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Convert file to base64 for email attachment (chunked to avoid stack overflow)
    const arrayBuffer = await cvFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const chunkSize = 8192; // Process in 8KB chunks
    let binaryString = '';
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, chunk);
    }
    
    const base64File = btoa(binaryString);

    // Send email using Resend API with attachment
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${name} via Omai Website <contact@updates.omai.dev>`,
        to: [env.EMAIL_TO],
        subject: `Jobbansökan: ${name}`,
        html: `
          <h2>Ny jobbansökan</h2>
          <p><strong>Namn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <p><strong>Meddelande:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><em>CV bifogat som bilaga.</em></p>
        `,
        reply_to: email,
        attachments: [
          {
            filename: cvFile.name,
            content: base64File,
          },
        ],
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send application' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Create Trello card with CV attachment (non-blocking - don't fail if Trello is unavailable)
    // Use context.waitUntil to ensure the async operation completes
    console.log('Creating Trello card');
    const trelloPromise = createTrelloCard(
      {
        name,
        email,
        message,
        cvFileName: cvFile.name,
        cvBase64: base64File,
      },
      env
    ).catch(err => {
      // Already logged in createTrelloCard, just ensure it doesn't throw
      console.error('Trello card creation failed silently:', err);
    });
    
    // Ensure Trello operation completes even after response is sent
    if (context.waitUntil) {
      context.waitUntil(trelloPromise);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Ansökan har skickats!' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
