# Publicación desde WhatsApp — grupo «Diario NSAC»

Ejecuta el skill `publicar-lote` (`.devin/skills/publicar-lote/SKILL.md`)
sobre todos los `inbox/lote-*/` sin marca `.hecho`, en orden. Sigue sus
pasos y reglas duras al pie de la letra: filtro de decencia y conducta del
evento, dedup por contenido (nada se publica dos veces), un post por lote
con su traducción al castellano (`_posts/es/`; el inglés es el idioma
por defecto del sitio), galería, OG, commit + push a `master`.
