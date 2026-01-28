---
title: "Case: OMAI utvecklar AI agenter"
date: 2026-01-28
slug: "omai-utvecklar-ai-agenter"
ingress: "Hur OMAI tillsammans med kunden designade, tränade och satte en AI‑agent i produktion för att avlasta supporten och skapa nya insikter."
---

## Bakgrund

En snabbväxande digital tjänst hade en kundsupport som redan gick på högvarv. Teamet lade mycket tid på att svara på återkommande frågor, samtidigt som ledningen ville förstå *varför* kunder hörde av sig – inte bara hur många som gjorde det.

Bolaget hade testat traditionella chattbotar tidigare, men upplevde dem som rigida, svåra att underhålla och med låg träffsäkerhet. De ville i stället utforska moderna AI‑agenter som både kunde förstå sammanhang och anpassa sig över tid.

## Målbild

Tillsammans med kunden definierade vi tre tydliga mål:

1. **Avlasta supporten**: Minst 30 % av inkommande ärenden skulle hanteras helt automatiskt av AI‑agenten.
2. **Förbättra kundupplevelsen**: Kortare svarstid och mer konsekventa svar, oavsett när på dygnet kunden hör av sig.
3. **Generera insikter**: Strukturerad data kring vilka frågor som ställs, vilka svar som ges och var det uppstår friktion i kundresan.

## Lösningen – en domäntränad AI‑agent

OMAI tog fram en AI‑agent som:

- **Förstår produktens kontext** genom att läsa in dokumentation, historiska supportärenden och FAQ‑artiklar.
- **Anpassar svaren** efter kanal (webbchat, e‑post, internt supportverktyg) men delar samma kunskapsbas.
- **Hanterar osäkerhet** genom att:
  - ställa följdfrågor när information saknas,
  - föreslå svar för mänskliga handläggare vid tveksamhet,
  - och eskalera ärenden där mänsklig bedömning krävs.

Tekniskt sett använder agenten en kombination av retrieval‑baserad kontext (för att alltid ha uppdaterad information) och styrning via noggrant utformade policies kring tonläge, ansvarstagande och dataskydd.

## Genomförande steg för steg

1. **Kartläggning av data**  
   Vi inventerade vilka källor som fanns: kunskapsdatabas, tidigare tickets, produktdokumentation och interna rutiner. Fokus låg på att hitta de 20 % av frågetyperna som stod för majoriteten av volymen.

2. **Design av agentens roll och mandat**  
   Tillsammans med supportteamet definierade vi:
   - vilka typer av ärenden agenten får lösa själv,
   - när den ska involvera en människa,
   - och hur den ska kommunicera vid osäkerhet eller fel.

3. **Träning och test i skarpt men begränsat läge**  
   Agenten kopplades först in som *co‑pilot* inne i supportverktyget: den föreslog svar, men en människa klickade ”skicka”. Detta gav både träning och förtroende hos teamet.

4. **Gradvis automatisering**  
   Efter att vi nått överenskommen kvalitetsnivå (mätt både i intern bedömning och kundnöjdhet) började agenten själv besvara utvalda ärenden i webbchatten.

## Resultat efter lansering

Efter tre månader såg vi följande effekter:

- **37 %** av alla inkommande chattärenden hanterades fullt ut av AI‑agenten.
- **Genomsnittlig svarstid** i chatten minskade från minuter till sekunder.
- Supportteamet rapporterade att de kunde lägga **mer tid på komplexa ärenden** och proaktiv kundvård.
- Ledningen fick en **ny typ av rapportering**: inte bara volym per kanal, utan tematiska insikter om vad kunder faktiskt fastnar på.

## Lärdomar

- **Tydligt mandat är avgörande.** När teamet vet exakt vad agenten får och inte får göra blir adoptionen mycket högre.
- **Datahygien lönar sig.** Att lägga tid tidigt på att städa och strukturera kunskapskällor gör agenten både säkrare och lättare att vidareutveckla.
- **Människan är en del av loopen.** De bästa resultaten kom när supportteamet aktivt gav feedback till agenten och vi byggde in den feedbacken i förbättringsloopar.

## Nästa steg för kunden

Efter den första fasen tittar kunden nu på hur samma agentteknik kan användas:

- internt, för att stötta nya medarbetare i att hitta rätt information,
- i säljprocessen, för att snabbt svara på tekniska frågor från potentiella kunder,
- och i produktutvecklingen, genom att analysera mönster i återkommande kundproblem.

---

Detta case visar hur en AI‑agent kan gå från idé till verkligt värde – utan att ersätta människan, utan genom att förstärka ett befintligt team med kapacitet, konsekvens och nya insikter.

