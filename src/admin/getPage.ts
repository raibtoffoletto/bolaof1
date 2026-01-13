const template = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bolão da F1 2026</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css" />
    <style>
      table {
        table-layout: auto;
      }

      body {
        max-width: 1200px;
      }
    </style>
    <script src="/app.js" defer></script>
  </head>

  <body>
    <h1>Bolão da F1 2026 - <em>Admin</em></h1>

    <nav>
      <a href="/"><button>Classificações</button></a>
      <a href="/gps"><button>Grands Prix</button></a>
      <a href="/drivers"><button>Pilotos</button></a>
    </nav>

    <hr />

    <content />
  </body>
</html>
`;

export default function getPage(args?: PageArgs): string {
  let content = template;

  if (args?.title) {
    content = content.replace('<em>Admin</em>', args.title);
  }

  if (args?.content) {
    content = content.replace('<content />', args.content);
  }

  return content;
}
