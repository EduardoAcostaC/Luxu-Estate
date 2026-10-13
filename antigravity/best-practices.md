# Buenas Prácticas — Real Estate en Next.js (Luxe Estate)

Guía rápida y condensada de estándares, arquitectura y funcionalidades clave para el proyecto.

---

## 1. Arquitectura y Rendimiento (Next.js App Router)

- **Server Components (RSC) por defecto:** Mantener páginas y layouts en el servidor; limitar `'use client'` a interactividad pura (filtros, mapa, modales, carrusel).
- **Optimización de imágenes (`next/image`):**
  - Activar `priority` en la foto principal/hero de cada propiedad para optimizar el **LCP**.
  - Configurar `sizes` responsivos y placeholders tipo `blur` para evitar imágenes pesadas y saltos de layout (**CLS**).
  - Configurar dominios remotos de imágenes en `next.config.ts` (Supabase Storage / CDN).
- **Carga diferida (Dynamic Imports):** Cargar mapas (Leaflet / Mapbox) y visores 360° con `next/dynamic` y `{ ssr: false }`.
- **Streaming y Skeletons:** Usar `<Suspense>` y `loading.tsx` con skeletons que repliquen las medidas exactas de las tarjetas de propiedades.
- **Estrategia de Caché e ISR:** Usar `revalidateTag()` o `revalidatePath()` al actualizar precios o estatus de venta/renta desde el backend.

---

## 2. SEO y Visibilidad (Específico para Inmobiliaria)

- **Metadata dinámica (`generateMetadata`):** Generar título, descripción y canonical únicos por propiedad (`[slug]` o `[id]`).
- **Open Graph y redes sociales:** Incluir siempre la foto principal de la propiedad y precio para visualización previa al compartir enlaces por WhatsApp/redes.
- **Datos estructurados (JSON-LD):** Inyectar Schema markup (`RealEstateListing`, `SingleFamilyResidence`, `Apartment`) con precio, moneda, dirección y coordenadas GPS.
- **URLs amigables:** Usar slugs semánticos legibles (e.g., `/propiedades/depto-lujo-polanco-cdmx`).
- **Sitemaps dinámicos:** Generar `sitemap.ts` automático con todas las propiedades activas y `robots.ts` para proteger rutas privadas.

---

## 3. Diseño y UX/UI (Identidad Luxe Estate)

- **Filtros en URL (`searchParams`):** Persistir filtros (precio, recámaras, tipo, zona) en la URL para compartir búsquedas y permitir recarga sin perder estado.
- **Paleta oficial estricta:**
  - **Nordic (`#19322F`):** Textos principales, cabeceras y elementos estructurales.
  - **Mosque (`#006655`):** Botones de acción principal (CTA), estados activos y acentos.
  - **Hint of Green (`#D9ECC8`):** Tarjetas destacadas, badges y fondos suaves.
  - **Clear Day (`#EEF6F6`):** Fondo general de la aplicación.
- **Tipografía obligatoria:** Usar exclusivamente **SF Pro Display**.
- **Búsqueda predictiva:** Input con autocompletado por zona o desarrollo con *debounce* (300ms).
- **Galerías táctiles:** Mosaico de fotos responsivo con visor a pantalla completa y soporte para teclado y gestos móviles (*swipe*).

---

## 4. Backend, Datos y Seguridad (Supabase)

- **Tipado TypeScript estricto:** Tipar todas las entidades (`Property`, `Location`, `Agent`, `Inquiry`) en `@/types`.
- **Búsqueda geoespacial:** Usar coordenadas (`lat`, `lng`) y PostGIS para búsquedas por proximidad y radio en el mapa.
- **Políticas RLS (Row Level Security):** Propiedades públicas de solo lectura; datos de contacto y leads protegidos solo para agentes/admin.
- **Paginación eficiente:** Paginación por cursor o por lotes (9 a 12 propiedades por vista) para no saturar la red.

---

## 5. Conversión y Captación de Leads

- **CTA directo a WhatsApp:** Botón flotante o en la ficha con mensaje pre-rellenado con título y referencia del inmueble.
- **Agendamiento de visitas contextual:** Formulario integrado con fecha, hora y modalidad (presencial/videollamada) procesado con Server Actions y validado con Zod.
- **Calculadora hipotecaria:** Estimador mensual interactivo según enganche, plazo y tasa de interés dentro de la ficha de la propiedad.
- **Comparador de propiedades:** Comparación lado a lado de 2 a 4 inmuebles (precio/m², amenidades, mantenimiento).
- **Ficha técnica imprimible / PDF:** Vista optimizada para impresión (`@media print`) o descarga directa de brochure comercial.
- **Favoritos sin fricción:** Almacenar favoritos en `localStorage` y sincronizar opcionalmente con sesión de usuario.

---

## 6. Accesibilidad (a11y) y Robustez

- **Textos `alt` descriptivos:** Detallar elementos clave de la imagen (e.g., *"Terraza con vista panorámica y alberca infinita"*).
- **Contraste accesible:** Mantener legibilidad WCAG AA entre texto `Nordic` y fondo `Clear Day`.
- **Manejo de errores:** Páginas `not-found.tsx` (con recomendaciones de propiedades similares) y `error.tsx` con botón de reintento.
- **Navegación por teclado:** Asegurar anillos de enfoque (`focus-visible`) en inputs, botones y modales.

---

## 7. Checklist Rápido de Implementación

- [ ] ¿El componente es Server Component a menos que requiera interactividad?
- [ ] ¿La imagen principal tiene `priority` y las secundarias son lazy?
- [ ] ¿Los filtros de búsqueda se reflejan en los parámetros de la URL?
- [ ] ¿La ficha de propiedad incluye Schema JSON-LD y Open Graph?
- [ ] ¿Los colores respetan la paleta oficial (Nordic, Mosque, Hint of Green, Clear Day)?
- [ ] ¿Tiene skeleton de carga y manejo de `not-found`?
- [ ] ¿El CTA de contacto incluye la referencia del inmueble?
