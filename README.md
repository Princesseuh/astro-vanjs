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

## License

MIT
