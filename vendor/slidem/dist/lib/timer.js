//#region src/lib/timer.ts
function e(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return `${n ? `${a(n)}:` : ""}${a(r)}:${a(i)}`;
}
//#endregion
export { e as formatElapsed };

//# sourceMappingURL=timer.js.map