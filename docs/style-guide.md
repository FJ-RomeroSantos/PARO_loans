# PARO Style Guide

Tone: sober, clean, professional. Use Bootstrap 5 classes first, custom CSS only when needed.

## Colors

| Use | Color | Hex |
|---|---|---|
| Primary (navbar, buttons, titles) | Navy blue | `#1F3A5F` |
| Page background | Light gray | `#F4F6F8` |
| Cards, forms | White | `#FFFFFF` |
| Text | Dark gray | `#212529` |
| Approved | Green | `#2E7D32` |
| Rejected | Red | `#C62828` |
| Pending | Amber | `#F9A825` |

## Typography

Font: **Inter** (fallback Arial). Titles `h1`–`h3` in bold navy; body text regular.

## Components (Bootstrap only)

- Layout: `container`, `row`, `col-*`
- Cards: `card shadow-sm`
- Buttons: `btn btn-primary` (main action), `btn btn-outline-primary` (secondary)
- Forms: `form-control`, `form-label`, `form-select`
- Tables: `table table-hover`
- Status: `badge bg-success`, `badge bg-danger`, `badge bg-warning`
- Spacing: use `p-4`, `mb-3`, `gap-3`. Leave white space.

## HTML Template (copy for every page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PARO – Page Name</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
</head>
<body>
  <!-- page content -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/auth.js"></script>
</body>
</html>
```

## Rules

- All text in English.
- Money format: `$1,234.56`.
- Every page shows the PARO name/logo (text is fine) at the top.
