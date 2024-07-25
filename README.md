# elysia-accepts

Plugin for [Elysia](https://github.com/elysiajs/elysia) for content negotiation based on Accept headers based on `@tinyhttp/accepts` which is based on old good `negotiator`.

## Installation

```sh
bun a elysia-accepts
```

```ts
import { accepts } from "elysia-accepts";

const app = new Elysia()
  .use(accepts());
```

No options currently available and plugin is always registered in global scope.

## Context

### Type

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.type("text/html")); // Returns "html" if acceptable
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.type(["text/html", "application/json"]));
  // Returns the first acceptable or false if none
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.type(["html", "json"]));
  // Can pass file extension. In this case "html" returned if acceptable.
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.types); // Returns the list of all acceptable encodings
```

### Encoding

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.encoding("gzip")); // Returns "gzip" if acceptable
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.encoding(["gzip", "deflate"])); // Returns the first acceptable or false if none
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.encodings); // Returns the list of all acceptable encodings
```

### Languages

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.language("en")); // Returns "en" if acceptable
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.language(["en", "ru"])); // Returns the first acceptable or false if none
```

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => ctx.languages); // Returns the list of all acceptable languages
```

## Guard

### Per Route

```ts
const app = new Elysia()
  .use(accepts())
  .get("/", (ctx) => 'hi', { types: ['text/plain'] });
  // Returns 406 if plain text is not acceptable
```

### Global

```ts
const app = new Elysia()
  .use(accepts())
  .guard({ types: ['text/plain'] })
  .get("/", (ctx) => 'hi');
  // Returns 406 if plain text is not acceptable
```
