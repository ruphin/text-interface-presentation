import { fontsReady as e } from "../lib/fonts.js";
import { formatState as t, isValidState as n, parseState as r, sameState as i } from "../lib/state.js";
import { formatElapsed as a } from "../lib/timer.js";
import { GluonElement as o, css as s, html as c } from "@gluon/gluon";
//#region src/components/slidem-deck.ts
var l = s`
  body {
    margin: 0;
  }

  slidem-deck [reveal] {
    opacity: 0;
    transition: opacity 0.2s;
  }

  slidem-deck [current],
  slidem-deck [past] {
    opacity: 1;
  }

  slidem-slide h1,
  slidem-slide h2,
  slidem-slide h3,
  slidem-slide h4,
  slidem-slide h5,
  slidem-slide h6,
  slidem-slide p {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  slidem-slide a {
    color: inherit;
    text-decoration: none;
  }

  /* Keyframes are defined here to patch a scoping bug in Chrome */
  @keyframes slidem-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slidem-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slidem-slide-in-forward {
    from {
      translate: 100vw 0;
    }
    to {
      translate: 0 0;
    }
  }

  @keyframes slidem-slide-in-backward {
    from {
      translate: 0 0;
    }
    to {
      translate: 100vw 0;
    }
  }

  @keyframes slidem-slide-out-forward {
    from {
      translate: 0 0;
    }
    to {
      translate: -100vw 0;
    }
  }

  @keyframes slidem-slide-out-backward {
    from {
      translate: -100vw 0;
    }
    to {
      translate: 0 0;
    }
  }
`, u, d = 2e3, f = "location";
function p(e) {
	return e.composedPath().some((e) => e instanceof HTMLInputElement || e instanceof Element && e.hasAttribute("contenteditable"));
}
function m({ search: e = location.search, hash: t = location.hash }) {
	let n = new URL(location.href);
	n.search = new URLSearchParams(e).toString(), n.hash = t, history.pushState({}, "", n.toString()), dispatchEvent(new Event("location-changed")), localStorage.setItem(f, location.hash);
}
var h = class extends o {
	static styles = s`
      :host {
        /* inset for active slide */
        --active-inset-block-start: calc(25% - 20px);
        --active-inset-block-end: calc(25% - 20px);
        --active-inset-inline-start: calc(5% - 20px);
        --active-inset-inline-end: calc(45% - 20px);

        /* inset for next slide */
        --presenter-inset-block-start: calc(32.5% - 20px);
        --presenter-inset-block-end: calc(32.5% - 20px);
        --presenter-inset-inline-start: calc(60.5% - 20px);
        --presenter-inset-inline-end: calc(4.5% - 20px);
      }

      :host {
        display: block;
        overflow: hidden;
        position: absolute;
        inset: 0 0 0 0;
        font-family: "sans-serif";
        font-size: 56px;
        line-height: 1;
      }

      #slides ::slotted(*) {
        position: absolute;
        inset: 0 0 0 0;
        animation-duration: 0.4s;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
      }

      #slides ::slotted(:not([active]):not([previous]):not([next])) {
        display: none;
      }

      :host(:not([presenter])) #slides ::slotted([next]:not([previous])) {
        display: none;
      }

      #progress {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        inset-inline-end: 0;
        height: 50px;
        text-align: center;
        display: flex;
        flex-flow: row;
        justify-content: center;
        z-index: 10;
      }

      #progress div {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        border: 2px solid white;
        margin-left: 6px;
        margin-right: 6px;
        background: transparent;
        transition:
          background 0.2s,
          scale 0.2s;
      }

      #progress div.active {
        background: white;
        scale: 1.3;
      }

      :host([progress="dark"]) #progress div {
        border: 2px solid black;
      }

      :host([progress="dark"]) #progress div.active {
        background: black;
      }

      :host([progress="none"]) #progress {
        display: none;
      }

      #timer {
        display: none;
        position: absolute;
        inset-block-start: 5%;
        inset-inline-end: 5%;
        color: white;
        font-size: 4vw;
        font-weight: bold;
        font-family: Helvetica, Arial, sans-serif;
      }

      :host([presenter]) #timer {
        display: inline;
      }

      :host([presenter]) {
        background: black;
      }

      /* White box around active slide */
      :host([presenter])::before,
      :host([presenter])::after {
        display: block;
        position: absolute;
        content: "";
        border: 2px solid white;
      }

      :host([presenter])::before {
        inset-block: var(--active-inset-block-start) var(--active-inset-block-end);
        inset-inline: var(--active-inset-inline-start)
          var(--active-inset-inline-end);
      }

      /* White box around next slide */
      :host([presenter])::after {
        inset-block: var(--presenter-inset-block-start)
          var(--presenter-inset-block-end);
        inset-inline: var(--presenter-inset-inline-start)
          var(--presenter-inset-inline-end);
      }

      :host([presenter]) #slides ::slotted(*) {
        animation: none !important; /* Block user-configured animations */
      }

      :host([presenter]) #slides ::slotted([previous]:not([next])) {
        display: none;
      }

      :host([presenter]) #slides ::slotted([active]) {
        translate: -20% 0;
        scale: 0.5 !important; /* Force presenter layout */
      }

      :host([presenter]) #slides ::slotted([next]) {
        translate: 28% 0;
        scale: 0.35 !important; /* Force presenter layout */
      }

      :host([presenter]) #progress {
        translate: -20% 25vh;
        scale: 0.5;
      }

      #notes {
        font-size: 18px;
        position: absolute;
        inset-block-start: calc(
          var(--presenter-inset-block-start) + var(--presenter-inset-block-end) +
            80px
        );
        inset-inline-start: var(--presenter-inset-inline-start);
      }

      :host(:not([presenter])) #notes,
      #notes ::slotted(:not([active])) {
        display: none !important;
      }

      #slides ::slotted([active]) {
        z-index: 2;
      }

      #slides ::slotted([previous]) {
        z-index: 0;
      }

      #slides ::slotted([in="fade"][active].animate-forward) {
        animation-name: slidem-fade-in;
      }

      #slides ::slotted([in="fade"][previous].animate-backward) {
        animation-name: slidem-fade-out;
        z-index: 3;
      }

      #slides ::slotted([out="fade"][active].animate-backward) {
        animation-name: slidem-fade-in;
      }

      #slides ::slotted([out="fade"][previous].animate-forward) {
        animation-name: slidem-fade-out;
        z-index: 3;
      }

      #slides ::slotted([in="slide"][active].animate-forward) {
        animation-name: slidem-slide-in-forward;
      }

      #slides ::slotted([in="slide"][previous].animate-backward) {
        animation-name: slidem-slide-in-backward;
        z-index: 3;
      }

      #slides ::slotted([out="slide"][active].animate-backward) {
        animation-name: slidem-slide-out-backward;
      }

      #slides ::slotted([out="slide"][previous].animate-forward) {
        animation-name: slidem-slide-out-forward;
        z-index: 3;
      }

      @keyframes slidem-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slidem-fade-out {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      @keyframes slidem-slide-in-forward {
        from {
          translate: 100vw 0;
        }
        to {
          translate: 0 0;
        }
      }

      @keyframes slidem-slide-in-backward {
        from {
          translate: 0 0;
        }
        to {
          translate: 100vw 0;
        }
      }

      @keyframes slidem-slide-out-forward {
        from {
          translate: 0 0;
        }
        to {
          translate: -100vw 0;
        }
      }

      @keyframes slidem-slide-out-backward {
        from {
          translate: -100vw 0;
        }
        to {
          translate: 0 0;
        }
      }
  `;
	static properties = {
		presenter: {
			type: Boolean,
			attribute: !0,
			reflect: !0
		},
		font: { attribute: !0 },
		slides: { type: Array },
		slide: { type: Number },
		step: { type: Number },
		timerText: {}
	};
	presenter = !1;
	font = null;
	slides = [];
	slide = 1;
	step = 1;
	timerText = "";
	#e;
	#t;
	#n;
	#r = !1;
	#i = document.title;
	get state() {
		return r(location.hash);
	}
	set state(e) {
		let r = this.state, a = {
			slide: e.slide ?? r.slide,
			step: e.step ?? r.step
		};
		n(a) && !i(a, r) && m({ hash: t(a) });
	}
	get currentStepIndex() {
		return this.state.step - 1;
	}
	get currentSlideIndex() {
		return this.state.slide - 1;
	}
	get previousSlide() {
		return this.slides[this.currentSlideIndex - 1] ?? null;
	}
	get currentSlide() {
		return this.slides[this.currentSlideIndex] ?? null;
	}
	get nextSlide() {
		return this.slides[this.currentSlideIndex + 1] ?? null;
	}
	connectedCallback() {
		super.connectedCallback(), this.#a(), u || (u = new CSSStyleSheet(), u.replaceSync(l)), document.adoptedStyleSheets.includes(u) || (document.adoptedStyleSheets = [...document.adoptedStyleSheets, u]), new URLSearchParams(location.search).has("presenter") && (this.presenter = !0), this.slides = Array.from(this.children).filter((e) => !e.hasAttribute("slot")), this.slides.forEach((e, t) => {
			for (let n of e.querySelectorAll("[slot=\"notes\"]")) n.setAttribute("slide", String(t + 1)), this.append(n);
		}), this.#o();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), clearInterval(this.#t), this.#t = void 0;
	}
	#a() {
		let e = this.disconnectSignal, t = () => this.#l();
		window.addEventListener("hashchange", t, { signal: e }), window.addEventListener("location-changed", t, { signal: e }), window.addEventListener("popstate", t, { signal: e }), window.addEventListener("storage", ({ key: e, newValue: t }) => {
			e === f && t !== null && location.hash !== t && m({ hash: t });
		}, { signal: e }), window.addEventListener("keyup", (e) => this.#c(e), { signal: e });
		let n = 0, r = 0;
		document.addEventListener("touchstart", ({ touches: e }) => {
			let t = e[0];
			t && (n = t.clientX, r = t.clientY);
		}, { signal: e }), document.addEventListener("touchend", ({ changedTouches: e }) => {
			let t = e[0];
			if (!t) return;
			let i = t.clientX - n, a = t.clientY - r;
			Math.abs(i) > 60 && Math.abs(i) > Math.abs(a) && (i < 0 ? this.forward() : this.back());
		}, { signal: e });
	}
	async #o() {
		await Promise.race([
			this.#s(),
			e(),
			new Promise((e) => setTimeout(e, d))
		]), await e(), await new Promise(requestAnimationFrame), this.isConnected && (this.removeAttribute("loading"), this.#l());
	}
	async #s() {
		await Promise.all(this.slides.filter((e) => e.localName.includes("-")).map((e) => customElements.whenDefined(e.localName)));
	}
	#c(e) {
		if (!p(e)) switch (e.key) {
			case "PageDown":
			case "ArrowRight":
			case "j":
			case "l":
				this.forward();
				break;
			case "PageUp":
			case "ArrowLeft":
			case "h":
			case "k":
				this.back();
				break;
			case "t":
				this.presenter && this.toggleTimer();
				break;
			case "p": this.togglePresenter();
		}
	}
	#l() {
		let { slide: e, step: t } = this.state;
		this.slides[e - 1] && (this.slide = e, this.step = t, this.#r = !0, this.requestUpdate());
	}
	render() {
		return c`
      <div id="slides" part="slides">
        <slot></slot>
      </div>

      <div id="progress" part="progress">
        <slot name="progress">
          ${this.slides.map((e, t) => c`<div class=${t === this.slide - 1 ? "active" : ""}></div>`)}
        </slot>
      </div>

      <div id="notes" part="notes">
        <slot name="notes"></slot>
      </div>

      <div id="timer" part="timer">${this.timerText}</div>

      <div id="forward" @click=${this.forward}>
        <slot name="forward"></slot>
      </div>

      <div id="backward" @click=${this.back}>
        <slot name="backward"></slot>
      </div>
    `;
	}
	updated(e) {
		e.has("font") && (this.style.fontFamily = this.font ?? "");
		let t = this.slides[this.slide - 1];
		if (!t || !this.#r && this.#n === void 0) return;
		let n = this.#r;
		this.#r = !1;
		let r = this.#n !== this.slide;
		n && r && (this.#u(this.#n), this.#n = this.slide), n && (t.step = this.step), (r || e.has("presenter")) && (this.#d(), this.#f()), n && this.dispatchEvent(new Event("change"));
	}
	#u(e) {
		let t = this.slide - 1, n = this.slides[t], r = e === void 0 ? void 0 : this.slides[e - 1];
		clearInterval(this.#t), this.#t = void 0, n.auto && (this.#t = setInterval(() => {
			let { steps: e, step: t } = n;
			n.step = t === e + 1 ? 1 : t + 1;
		}, n.auto));
		for (let e of this.slides) e !== n && e !== r && (e.removeAttribute("previous"), e.removeAttribute("next"));
		if (r) {
			let t = e < this.slide;
			for (let e of [r, n]) e.classList.toggle("animate-forward", t), e.classList.toggle("animate-backward", !t);
			r.removeAttribute("active"), r.removeAttribute("next"), r.setAttribute("previous", "");
		}
		n.removeAttribute("previous"), n.removeAttribute("next"), n.setAttribute("active", ""), this.slides[t + 1]?.setAttribute("next", "");
	}
	#d() {
		let e = this.currentSlide?.getAttribute("name");
		document.title = e ? `${e} | ${this.#i}` : this.#i;
	}
	#f() {
		if (!this.presenter) return;
		let e = String(this.slide), t = this.renderRoot.querySelector("#notes slot");
		for (let n of t?.assignedElements() ?? []) n.toggleAttribute("active", n.getAttribute("slide") === e);
	}
	forward() {
		let e = this.currentSlide;
		if (!e) return;
		let { slide: t, step: n } = this.state;
		e.steps && n <= e.steps ? this.state = {
			slide: t,
			step: n + 1
		} : this.nextSlide && (this.state = {
			slide: t + 1,
			step: 1
		});
	}
	back() {
		let e = this.currentSlide, t = this.previousSlide;
		if (!e) return;
		let { slide: n, step: r } = this.state;
		e.steps && r > 1 ? this.state = {
			slide: n,
			step: r - 1
		} : t && (this.state = {
			slide: n - 1,
			step: t.steps + 1
		});
	}
	togglePresenter() {
		this.presenter = !this.presenter, m({ search: this.presenter ? "?presenter" : "" });
	}
	toggleTimer() {
		if (this.#e) clearInterval(this.#e), this.#e = void 0, this.timerText = "";
		else {
			this.timerText = a(0);
			let e = Date.now();
			this.#e = setInterval(() => {
				this.timerText = a(Date.now() - e);
			}, 1e3);
		}
	}
};
//#endregion
export { h as SlidemDeck };

//# sourceMappingURL=slidem-deck.js.map