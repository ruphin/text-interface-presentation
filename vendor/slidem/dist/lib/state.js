//#region src/lib/state.ts
var e = {
	slide: 1,
	step: 1
}, t = /^#(?:slide-(?<slide>\d+))?(?:\/step-(?<step>\d+))?/;
function n(n) {
	let r = t.exec(n)?.groups;
	return {
		slide: Number(r?.slide ?? e.slide),
		step: Number(r?.step ?? e.step)
	};
}
function r({ slide: e, step: t }) {
	return `#slide-${e}/step-${t}`;
}
function i(e, t) {
	return e.slide === t.slide && e.step === t.step;
}
function a({ slide: e, step: t }) {
	return Number.isInteger(e) && Number.isInteger(t) && e > 0 && t > 0;
}
//#endregion
export { e as INITIAL_STATE, r as formatState, a as isValidState, n as parseState, i as sameState };

//# sourceMappingURL=state.js.map