import type { AstroIntegration } from "astro";

const astroVanjs: AstroIntegration = {
	name: "astro-vanjs",
	hooks: {
		"astro:config:setup": async ({ addRenderer }) => {
			addRenderer({
				name: "vanjs",
				serverEntrypoint: "astro-vanjs/server.js",
				clientEntrypoint: "astro-vanjs/client.js",
			});
		},
	},
};

export default astroVanjs;
