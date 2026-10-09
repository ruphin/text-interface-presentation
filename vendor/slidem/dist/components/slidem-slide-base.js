import { GluonElement as e, css as t, html as n } from "@gluon/gluon";
//#region src/components/slidem-slide-base.ts
var r = 5e3, i = 1760, a = 990, o = {
	fromAttribute: (e) => e === null ? !1 : parseInt(e, 10) || r,
	toAttribute: (e) => typeof e == "number" && !Number.isNaN(e) ? String(e) : null
}, s = class extends e {
	static styles = t`
    :host {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      align-items: center;
      background: var(--background, white);
      background-size: cover;
      background-position: center;
    }

    :host([in="zoom"]) #content,
    :host([out="zoom"]) #content {
      animation-duration: 0.4s;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
    }

    :host([in="zoom"][active].animate-forward) #content {
      animation-name: zoom-in;
    }

    :host([in="zoom"][previous].animate-backward) #content {
      animation-name: zoom-out;
    }

    :host([out="zoom"][previous].animate-forward) #content {
      animation-name: zoom-out;
    }

    :host([out="zoom"][active].animate-backward) #content {
      animation-name: zoom-in;
    }

    #container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    #content {
      width: var(--slidem-content-width, 1760px);
      max-height: var(--slidem-content-height, 990px);
      flex-shrink: 0;
    }

    :host(:not([center])) #content {
      height: var(--slidem-content-height, 990px);
    }

    @keyframes zoom-in {
      from {
        opacity: 0;
        scale: 0;
      }
      to {
        opacity: 1;
        scale: var(--slidem-content-scale, 1);
      }
    }

    @keyframes zoom-out {
      from {
        opacity: 1;
        scale: var(--slidem-content-scale, 1);
      }
      to {
        opacity: 0;
        scale: 0;
      }
    }
  `;
	static properties = {
		auto: {
			attribute: !0,
			reflect: !0,
			converter: o
		},
		step: {
			type: Number,
			attribute: !0,
			reflect: !0
		},
		steps: { type: Number },
		active: {
			type: Boolean,
			attribute: !0,
			reflect: !0
		},
		previous: {
			type: Boolean,
			attribute: !0,
			reflect: !0
		},
		next: {
			type: Boolean,
			attribute: !0,
			reflect: !0
		},
		contentScale: { type: Number }
	};
	auto = !1;
	steps = 0;
	active = !1;
	previous = !1;
	next = !1;
	contentScale = 1;
	#e = 1;
	#t = [];
	get step() {
		return this.#e;
	}
	set step(e) {
		this.#e = Math.max(1, Math.min(Number(e) || 1, this.steps + 1));
	}
	connectedCallback() {
		super.connectedCallback();
		let e;
		window.addEventListener("resize", () => {
			clearTimeout(e), e = setTimeout(() => this.#r(), 200);
		}, { signal: this.disconnectSignal }), this.defineSteps(this.querySelectorAll("[reveal]"));
	}
	defineSteps(e) {
		this.#t = Array.from(e ?? []), this.steps = this.#t.length, this.#r(), this.#t.forEach((e, t) => e.setAttribute("step", String(t + 2))), this.#t[0]?.previousElementSibling?.setAttribute("step", "1"), this.#n();
	}
	render() {
		return n`
      <div id="container">
        <div id="content" part="content" style=${`scale: ${this.contentScale}`}>
          ${this.renderContent()}
        </div>
      </div>
    `;
	}
	renderContent() {
		return n`<slot></slot>`;
	}
	updated(e) {
		(e.has("step") || e.has("steps")) && (this.step = this.#e, this.#n());
	}
	#n() {
		let e = this.#e;
		this.querySelector("[step=\"1\"]")?.toggleAttribute("past", e > 1), this.#t.forEach((t, n) => {
			let r = n + 2;
			t.toggleAttribute("past", r < e), t.toggleAttribute("current", r === e);
		});
	}
	#r() {
		let e = getComputedStyle(document.documentElement), t = parseFloat(e.getPropertyValue("--slidem-content-width")) || i, n = parseFloat(e.getPropertyValue("--slidem-content-height")) || a, r = Math.min(1, window.innerHeight / 1.09 / n, window.innerWidth / 1.09 / t);
		document.documentElement.style.setProperty("--slidem-content-scale", String(r)), this.contentScale = r;
	}
};
//#endregion
export { s as SlidemSlideBase };

//# sourceMappingURL=slidem-slide-base.js.map