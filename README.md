# astro-vanjs

[Astro](https://astro.build/) integration for [VanJS](https://vanjs.org/).

## Installation

```bash
astro add astro-vanjs
```

## Usage

```ts
// src/components/Hello.ts
import { env } from "mini-van-plate/shared";

export default () => {
	const { a, div, li, p, ul } = env.van.tags;

	const fromServer = typeof window === "undefined";
	return div(
		p(() => `👋Hello (from ${fromServer ? "server" : "client"})`),
		ul(li("🗺️World"), li(a({ href: "https://vanjs.org/" }, "🍦VanJS"))),
	);
};
```

```astro
---
import Hello from "../components/Hello.ts";
---

<Hello />

<!-- Can also be hydrated -->
<Hello client:idle />
```

## Troubleshooting & Tips

### My component does not hydrate correctly depending on how I import it

There seems to be an issue in Astro with how hydrated components files are imported. Make sure that your import statement matches the file extension of the component you're importing (ex: `Hello.ts` should be imported with `import Component from "./Hello.ts"`, not `.js`).

### My component does not work on both the server and client at the same time

In order for components to be able to work on both the server and client, they must be written in a way that is compatible with both environments. For VanJS, this means that you always need to import `env` from `mini-van-plate/shared` and use it to access the tags, instead of importing them directly from `vanjs-core` or `mini-van-plate`.

**Good (works everywhere):**
```ts
// src/components/Hello.good.ts
import { env } from "mini-van-plate/shared";

export default () => {
	const { div } = env.van.tags;
	return div(() => "Hello");
};
```

**Bad (would only work on the server):**
```ts
// src/components/Hello.bad.ts
import { div } from "mini-van-plate";

export default () => div(() => "Hello");
```

Note that it's not necessarily a problem to import directly from `vanjs-core` or `mini-van-plate` in your component if you know that it'll only ever be rendered on the client or server. Some components might be client-only or server-only, and that's perfectly fine.

### How to determine if the component is being rendered on the server or client?

You can use the `typeof window === "undefined"` check to determine if the component is being rendered on the server or client.

```ts
// src/components/Hello.ts
import { env } from "mini-van-plate/shared";

export default () => {
	const { div, p } = env.van.tags;

	const fromServer = typeof window === "undefined";
	return div(
		p(() => `Hello (from ${fromServer ? "server" : "client"})`),
	);
};
```

## License

MIT
