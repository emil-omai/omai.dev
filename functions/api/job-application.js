/**
 * Cloudflare Pages Function to handle job application form submissions
 * Set environment variables in Cloudflare Pages dashboard:
 * - EMAIL_TO: The email address to send applications to
 * - RESEND_API_KEY: Your Resend API key (get from https://resend.com)
 */

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
