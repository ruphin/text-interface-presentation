import { SlidemSlideBase as e } from "./slidem-slide-base.js";
import { css as t, html as n } from "@gluon/gluon";
//#region src/components/slidem-video-slide.ts
var r = class extends e {
	static styles = [e.styles, t`
      :host {
        background: black;
        color: white;
      }

      video {
        width: 100%;
        max-height: 100%;
        max-width: 100%;
      }
    `].flat();
	static properties = {
		video: { attribute: !0 },
		muted: {
			type: Boolean,
			attribute: !0
		}
	};
	video = "";
	muted = !1;
	get #e() {
		return this.renderRoot.querySelector("video");
	}
	renderContent() {
		return n`<video controls src=${this.video} .muted=${this.muted}></video>`;
	}
	updated(e) {
		if (super.updated(e), !e.has("active")) return;
		let t = this.#e;
		t && (this.active ? (t.currentTime = 0, t.play()?.catch(() => void 0)) : t.pause());
	}
};
//#endregion
export { r as SlidemVideoSlide };

//# sourceMappingURL=slidem-video-slide.js.map