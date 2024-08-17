import type {
	AstroComponentMetadata,
	NamedSSRLoadedRendererValue,
} from "astro";
import type { SSRResult } from "astro";
import van, { type Element } from "mini-van-plate/van-plate";
import { registerEnv } from "mini-van-plate/shared";

registerEnv({ van });

type RendererContext = {
	result: SSRResult;
};

async function check(this: RendererContext, Component: unknown) {
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;

	return true;
}

async function renderToStaticMarkup(
	this: RendererContext,
Component: (props: any) => Element,
	props: Record<string, any>,
	{ default: children, ...slotted }: Record<string, any>,
	metadata: AstroComponentMetadata | undefined,
) {
	const properties = props ?? {};
	const html = van.html(Component(properties));
	return { html };
}

export default {
	name: "astro-vanjs",
	check,
	renderToStaticMarkup,
} satisfies NamedSSRLoadedRendererValue;
