# Learn Course Content

Future courses should follow this structure:

```text
app/learn/courses/<course-slug>/lessons/<lesson-slug>.mdx
```

Add each new course to `app/learn/utils.ts` in `courseCatalog`.

Lesson frontmatter:

```md
---
title: 'Lesson title'
summary: 'Short listing summary.'
description: 'Longer SEO description.'
order: 1
updatedAt: 'YYYY-MM-DD'
image: '/learn/<course-slug>/<image>.png'
---
```

The `/learn`, `/learn/<course>`, and `/learn/<course>/<lesson>` pages are
generated from this content.
