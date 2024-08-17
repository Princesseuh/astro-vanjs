import { registerEnv } from "mini-van-plate/shared";
import van from "vanjs-core";

registerEnv({ van });

export default function (element: HTMLElement) {
	return (
		Component: any,
		props: Record<string, any>,
		{ default: children, ...slotted }: Record<string, any>,
		{ client }: Record<string, string>,
	) => {
		if (!element.hasAttribute("ssr")) return;

		const properties = props ?? {};
		if (client !== "only") {
			van.hydrate(element, () => Component(properties));
		} else {
			van.add(element, Component(properties));
		}
	};
}
