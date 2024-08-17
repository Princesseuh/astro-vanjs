import { env } from "mini-van-plate/shared";

interface Props {
	message: string;
}

export default ({ message }: Props) => {
	const { a, div, li, p, ul } = env.van.tags;

	const fromServer = typeof window === "undefined";
	return div(
		p(() => `${message} (from ${fromServer ? "server" : "client"})`),
		ul(li("🗺️World"), li(a({ href: "https://vanjs.org/" }, "🍦VanJS"))),
	);
};
