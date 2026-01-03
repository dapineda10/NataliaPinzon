# Landing page para servicios de Microblading (en español)

Proyecto simple con HTML, CSS y JS. Todo el contenido es configurable desde `config.json`.

Instrucciones rápidas:

- Abrir `config.json` y editar textos, lista `services`, `portfolio` y `about`.
- Abrir `index.html` en un navegador (si usas `file://` algunos navegadores pueden bloquear `fetch` — usa un servidor local como `npx serve` o `python -m http.server`).

Nota sobre Tailwind y WhatsApp:

- Este proyecto ahora usa Tailwind CSS vía CDN incluido en `index.html`.
- El botón flotante de WhatsApp y el enlace en la sección de contacto se generan desde el campo `whatsapp` en `config.json`.
- Edita `config.json` > `whatsapp.number` con tu número en formato internacional (ej. `+34600000000`) y `whatsapp.message`.
 - Este proyecto ahora usa Tailwind CSS vía CDN incluido en `index.html`.
 - El proyecto no tiene backend; todo es frontend estático. El formulario de contacto es de demostración (alerta) y no envía datos a un servidor.
 - El botón flotante de WhatsApp y el enlace en la sección de contacto se generan desde el campo `whatsapp` en `config.json`.
 - El icono de WhatsApp se encuentra en `images/whatsapp.png`. Puedes reemplazarlo por una PNG real conservando el nombre `whatsapp.png`.
 - Edita `config.json` > `whatsapp.number` con tu número en formato internacional (ej. `+34600000000`) y `whatsapp.message`.
 - Este proyecto usa exclusivamente Tailwind CSS (CDN). Se ha eliminado `css/style.css` para usar solo utilidades Tailwind.
 - El proyecto no tiene backend; todo es frontend estático. El formulario de contacto es de demostración (alerta) y no envía datos a un servidor.
 - El icono de WhatsApp está integrado como un SVG en línea (usa `currentColor`) para un estilo consistente de Tailwind; no se requiere una imagen externa.

Estructura:

- `index.html` — plantilla principal
- `css/style.css` — estilos
- `js/app.js` — carga `config.json` y renderiza
- `config.json` — cambia textos, servicios, portafolio y datos de contacto
- `images/` — placeholders

Personalización rápida:

- Para añadir un servicio: agregar un objeto con `title`, `desc` y opcional `price` en `services`.
- Para añadir una foto al portafolio: subir imagen en `images/` y añadir su ruta en `portfolio[].image`.
