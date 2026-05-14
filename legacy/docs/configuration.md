# Configuracion del evento

Este proyecto es HTML estatico. Por eso no usa variables de entorno reales como `process.env`, porque el navegador no las lee sin un paso de build.

La configuracion reutilizable vive en `scripts/config.js`.

## Que debe ir en `scripts/config.js`

- Nombre corto del evento: `SCD·26`
- Nombre del evento: `AWS Student Community Day`
- Ciudad, pais y sede
- Fecha y anio
- Cupos, confirmados y waitlist
- Correo de contacto
- Redes sociales
- Sponsors
- Textos principales que cambian por edicion

## Que debe ir en `styles/tokens.css`

- Colores
- Fuentes
- Escala de texto
- Espaciado
- Radios
- Sombras
- Medidas globales de layout

## Que no debe ir en configuracion publica

- API keys
- Tokens privados
- Claves de AWS
- Passwords
- Correos personales no publicos

Todo lo que este en `scripts/config.js` se descarga en el navegador, asi que debe ser informacion publica.

## Como reutilizar para otro SCD

1. Cambiar datos en `scripts/config.js`.
2. Ajustar colores globales en `styles/tokens.css` si cambia la identidad local.
3. Mantener componentes y estructura en los HTML.
4. No duplicar textos repetidos: usar `data-config-text`, `data-config-template` o `data-config-html`.

Ejemplo:

```html
<span data-config-template="{event.city} · {event.dateDisplay}">
  Cochabamba · 17.10.2026
</span>
```

El texto dentro del tag queda como fallback si JavaScript no carga.
