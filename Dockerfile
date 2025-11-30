# Steg 1: Använd den officiella Nginx Alpine-bilden som bas. 
# Alpine-varianten är mindre och snabbare att bygga/ladda ner.
FROM nginx:stable-alpine

# Steg 2: Ta bort Nginx standard-indexfil för att undvika konflikter
# och säkerställa att din indexfil visas.
RUN rm -rf /usr/share/nginx/html/index.html

# Steg 3: Kopiera innehållet i din lokala 'public' mapp 
# till Nginx standardplats för statiska filer inuti containern.
# '.' representerar alla filer och mappar inuti './public'.
COPY ./public /usr/share/nginx/html

# Steg 4 (Valfritt men bra): Exponera port 80. Detta är enbart dokumentation
# och påverkar inte hur portar mappas externt.
EXPOSE 80

# Nginx körs som standard i förgrunden (vilket är nödvändigt för Docker),
# så du behöver inget CMD-direktiv här.