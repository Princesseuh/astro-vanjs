import van from "vanjs-core";
import { registerEnv } from "mini-van-plate/shared";

registerEnv({ van });

export default (element: HTMLElement) =>
	(
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
