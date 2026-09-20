# Sigastra Weekly

Documentación del endpoint semanal de Sigastra utilizado durante la exploración de la API para Cielovivo.

---

## 1. Endpoint

### Request

```text
GET /weekly?lang=es&sign=aries&full=1
```

### Base URL

```text
https://sigastra.com/api/v1
```

### URL completa utilizada durante la prueba

```text
https://sigastra.com/api/v1/weekly?lang=es&sign=aries&full=1
```

---

## 2. Parámetros utilizados

| Parámetro | Valor   | Función                          |
| --------- | ------- | -------------------------------- |
| `lang`    | `es`    | Solicita la respuesta en español |
| `sign`    | `aries` | Indica el signo consultado       |
| `full`    | `1`     | Solicita el contenido completo   |

---

## 3. Respuesta general confirmada

La respuesta incluye, entre otros, los siguientes campos:

```text
api
kind
lang
date
period
full
generator
attribution
count
items
```

Para Cielovivo, la información principal se encuentra dentro de:

```text
items[0]
```

---

## 4. Información del signo

El primer elemento de `items` contiene información identificatoria del horóscopo:

```text
items[0].sign
items[0].title
items[0].url
```

Ejemplo observado:

```text
sign: "Aries"
title: "Aries — Horóscopo semanal"
```

---

## 5. Contenido semanal

Con `full=1`, el primer elemento contiene:

```text
items[0].text
```

Este campo contiene el texto completo del horóscopo semanal.

El contenido está formado por varios párrafos separados por saltos de línea.

---

## 6. Sections

Con `full=1`, se confirmó la existencia de:

```text
items[0].sections
```

Las propiedades observadas son:

```text
items[0].sections.overview
items[0].sections.love
items[0].sections.work
items[0].sections.advice
items[0].sections.wellbeing
```

### Significado para Cielovivo

| Campo       | Uso previsto                      |
| ----------- | --------------------------------- |
| `overview`  | Panorama principal de la semana   |
| `love`      | Situación relacionada con el amor |
| `work`      | Situación laboral/profesional     |
| `advice`    | Consejo de la semana              |
| `wellbeing` | Bienestar y energía personal      |

Estos campos fueron observados en la respuesta real de la API.

---

## 7. Información del período

La respuesta incluye:

```text
items[0].data.range
items[0].data.periodKey
```

### `data.range`

Representa el período visible de la semana.

Ejemplo observado:

```text
14 sept – 20 sept 2026
```

### `data.periodKey`

Representa la fecha utilizada como identificador del período.

Ejemplo observado:

```text
2026-09-14
```

---

## 8. Media

La respuesta incluye información de una imagen:

```text
items[0].media
```

Se observaron propiedades como:

```text
media.url
media.width
media.height
media.alt
media.credit
media.license
media.contentType
```

La imagen observada tiene formato:

```text
1200 × 630
```

La API también informa las condiciones de uso de la imagen.

---

## 9. Información editorial

La respuesta incluye:

```text
items[0].editorial
```

Se observaron campos como:

```text
editorial.id
editorial.sign
editorial.headline
editorial.dek
editorial.byline
editorial.published
editorial.canonical
editorial.category
editorial.tags
editorial.wordCount
editorial.body
editorial.image
```

La información editorial contiene una representación estructurada del contenido semanal.

---

## 10. Diferencia entre `text` y `sections`

La API proporciona más de una forma de acceder al contenido.

### Texto completo

```text
items[0].text
```

Contiene todo el contenido semanal como texto.

### Contenido estructurado

```text
items[0].sections
```

Permite acceder directamente a partes específicas:

```text
overview
love
work
advice
wellbeing
```

Para Cielovivo, la estructura `sections` resulta especialmente interesante para una futura interfaz porque permite mostrar cada parte de forma independiente.

---

## 11. Comportamiento de `full`

Durante la investigación se comprobó que:

```text
full=1
```

hace que la respuesta incluya el contenido completo.

La respuesta observada establece:

```text
full: true
```

Sin `full=1`, la respuesta semanal también puede proporcionar información útil, pero el contenido completo no está disponible de la misma manera.

---

## 12. Attribution

La respuesta incluye:

```text
attribution
```

y establece que debe mostrarse una atribución visible.

Texto requerido:

```text
Powered by Sigastra
```

La respuesta también proporciona:

```text
attribution.localizedHref
```

para enlazar la atribución hacia la página correspondiente de Sigastra.

El enlace debe conservar la condición:

```text
rel="dofollow"
```

Cuando se publica el contenido FULL, Sigastra también proporciona un `canonicalTag`.

---

## 13. Ejemplo de estructura relevante

La estructura que interesa conservar para futuras etapas puede representarse conceptualmente así:

```text
data
└── items
    └── [0]
        ├── sign
        ├── title
        ├── url
        ├── text
        ├── sections
        │   ├── overview
        │   ├── love
        │   ├── work
        │   ├── advice
        │   └── wellbeing
        │
        ├── data
        │   ├── range
        │   └── periodKey
        │
        ├── media
        │   ├── url
        │   ├── width
        │   ├── height
        │   ├── alt
        │   └── ...
        │
        └── editorial
            ├── headline
            ├── dek
            ├── published
            ├── canonical
            ├── tags
            ├── wordCount
            └── body

attribution
├── required
├── text
├── localizedHref
├── rel
└── canonicalTag
```

---

## 14. Relevancia para la futura UI

Todavía no se implementa la interfaz semanal.

Sin embargo, los datos descubiertos permiten imaginar posteriormente una estructura como:

```text
Horóscopo semanal

14 sept – 20 sept 2026

[ Panorama ]
overview

[ Amor ]
love

[ Trabajo ]
work

[ Bienestar ]
wellbeing

[ Consejo ]
advice

[ Ver horóscopo completo ]
text

Powered by Sigastra
```

Esta estructura es solamente una referencia de los datos disponibles.

**No forma parte todavía de la implementación.**

---

## 15. Decisión actual

El endpoint Weekly se considera **investigado y cerrado**.

Por ahora:

* No modificar `Horoscope.jsx`.
* No crear componentes específicos para Weekly.
* No diseñar la interfaz Weekly.
* No crear todavía un modelo interno definitivo.
* No asumir que otros endpoints tendrán exactamente esta estructura.

La información queda registrada para utilizarla después de investigar el resto de los endpoints.

---

## 16. Próximo endpoint

El siguiente endpoint a investigar es:

```text
GET /monthly?lang=es&sign=aries&full=1
```

La investigación de Monthly debe realizarse sobre la respuesta real de la API.

No se debe asumir que Monthly utiliza las mismas propiedades que Weekly.

---

## 17. Orden de investigación

```text
Daily      → investigado
Weekly     → investigado y documentado
Monthly    → próximo
Moon       → pendiente
Cosmic     → pendiente
Compat     → pendiente
```

Después:

```text
Comparar estructuras
        ↓
Confirmar campos realmente disponibles
        ↓
Crear modelo interno de Cielovivo
        ↓
Normalizar respuestas
        ↓
Diseñar UI
        ↓
Implementar componentes
```

---

## 18. Principio del proyecto

> La API define qué información existe.
>
> La UX decide cómo presentarla.

Cielovivo no debe diseñarse suponiendo qué debería devolver Sigastra.

Primero se observa la respuesta real.

Después se decide qué información es útil.

Finalmente se construye la interfaz.
