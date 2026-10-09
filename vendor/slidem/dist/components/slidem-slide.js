import { fontsReady as e } from "../lib/fonts.js";
import { SlidemSlideBase as t } from "./slidem-slide-base.js";
import "@gluon/gluon";
//#region src/components/slidem-slide.ts
var n = "h1, h2, h3, h4, h5, h6, p, li, span, em, strong, small", r = class extends t {
	static properties = {
		background: { attribute: !0 },
		darkenBackground: { attribute: !0 }
	};
	background = null;
	darkenBackground = null;
	get #e() {
		return this.querySelectorAll(n);
	}
	connectedCallback() {
		super.connectedCallback();
		for (let e of this.#e) this.#n(e);
		for (let e of this.querySelectorAll("div")) this.#r(e);
	}
	updated(e) {
		super.updated(e), (e.has("background") || e.has("darkenBackground")) && this.#t(), e.has("active") && this.active && this.dispatchEvent(new Event("activated")), (e.has("active") || e.has("next")) && this.#i();
	}
	#t() {
		let e = this.background;
		if (e) {
			if (e.startsWith("--")) this.style.setProperty("background", `var(${e})`);
			else if (/^(http|\/|\.)/.test(e)) {
				let t = `url(${e})`, n = this.darkenBackground;
				n && (t = `linear-gradient(rgba(0,0,0,${n}), rgba(0,0,0,${n})), ${t}`), this.style.backgroundImage = t;
			} else this.style.setProperty("background", e);
		}
	}
	#n(e) {
		let t = e.getAttribute("font-size");
		t !== null && (e.style.fontSize = t), e.hasAttribute("bold") && (e.style.fontWeight = "bold"), e.hasAttribute("underline") && (e.style.textDecoration = "underline"), e.hasAttribute("italic") && (e.style.fontStyle = "italic"), e.hasAttribute("uppercase") && (e.style.textTransform = "uppercase"), e.hasAttribute("center") && (e.style.textAlign = "center");
		let n = e.getAttribute("line-height");
		n !== null && (e.style.lineHeight = n);
		let r = e.getAttribute("color");
		r !== null && (e.style.color = r.startsWith("--") ? `var(${r})` : r);
	}
	#r(e) {
		e.hasAttribute("center") && (e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center");
	}
	async #i() {
		await e();
		let t = this.renderRoot.querySelector("#content")?.clientWidth ?? 0;
		for (let e of this.#e) {
			if (!e.hasAttribute("fit")) continue;
			e.style.display = "table", e.style.whiteSpace = "nowrap";
			let n = parseFloat(getComputedStyle(e).fontSize);
			t && e.clientWidth && n && (e.style.fontSize = `${Math.floor(n * t / e.clientWidth)}px`);
		}
	}
};
//#endregion
export { r as SlidemSlide };

//# sourceMappingURL=slidem-slide.js.map