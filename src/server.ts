import type { AstroComponentMetadata, NamedSSRLoadedRendererValue } from "astro";
import type { SSRResult } from "astro";
import { registerEnv } from "mini-van-plate/shared";
import van, { type Element } from "mini-van-plate/van-plate";

registerEnv({ van });

type RendererContext = {
	result: SSRResult;
};

async function check(
	this: RendererContext,
	Component: any,
	props: Record<string, any>,
	children: any,
) {
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;

	try {
		const { html } = await renderToStaticMarkup.call(this, Component, props, children, undefined);

		if (typeof html !== "string") {
			return false;
		}

		return true;
	} catch (e) {
		return false;
	}
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
