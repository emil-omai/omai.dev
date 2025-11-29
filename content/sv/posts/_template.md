---
title: "Din rubrik här"
date: 2025-01-01
slug: "din-rubrik-har"
ingress: "Kort ingress som sammanfattar artikeln. Denna visas i listan och i början av artikeln."
---

**Filenamn:** Använd formatet `YYMMDD-Titel-Här.md` (t.ex. `251129-Omai-landade-stort-projekt.md`)

**Slug:** Lägg till `slug: "din-rubrik-har"` i front matter för att kontrollera URL:en. URL:en blir `/posts/din-rubrik-har` (lowercase, inga datum).

**Översättningar:** För att länkar mellan språkversioner ska fungera, måste filnamnet vara identiskt i både `content/posts/` och `content/en/posts/`. Använd samma slug i båda versionerna.

**Assets:** Placera bilder och andra assets i `static/posts/YYMMDD/` (t.ex. `static/posts/251129/`) för att matcha filnamnets datum.

## En underrubrik

Här skriver du ditt innehåll. Du kan använda **fetstil** och *kursiv* text.

### En mindre underrubrik

Flera stycken är möjliga. Varje stycke separeras med en tom rad.

Ett nytt stycke börjar här.

## Bilder med beskrivning

Använd kortkoden `post-image` för att lägga till bilder med beskrivning:

{{< post-image 
    src="posts/YYMMDD/din-bild.jpg" 
    alt="Beskrivande alt-text för tillgänglighet"
    description="Huvudbeskrivning av bilden"
    subtext="Opcional undertext, t.ex. foto: Fotografens namn"
>}}

## Länkar

Du kan skapa [länkar till andra sidor](/about) eller [externa länkar](https://example.com).

## Ytterligare tips

- Använd listor för att strukturera information
- Varje avsnitt kan ha flera stycken
- Bilder kan placeras var som helst i texten
- Använd kortkoder för specialfunktioner:
  - highlight: för highlight-boxar i Warm Coral
  - innovation: för innovation-boxar i Bright Yellow  
  - calm: för calm-section-boxar i Calm Blue
  - Se exempel i befintliga inlägg för syntax

