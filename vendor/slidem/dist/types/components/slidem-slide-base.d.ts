import { GluonElement, PropertyDeclarations, PropertyValues, Styles } from '@gluon/gluon';
/**
 * Behaviour shared by every slide: a scaled content box, `reveal` steps and
 * the `auto` timer. Pure class with no registration side effect; it is the
 * base for `SlidemSlide` and `SlidemVideoSlide`, and for custom slide types.
 */
export declare class SlidemSlideBase extends GluonElement {
    #private;
    static styles: Styles;
    static properties: PropertyDeclarations;
    /**
     * Milliseconds between automatic step advances, or `false` when the slide
     * does not advance by itself. Reflects the `auto` attribute.
     */
    auto: number | false;
    /** Number of `reveal` steps on this slide, excluding the initial state. */
    steps: number;
    /** Whether this is the slide on screen. The deck sets it, as the `active` attribute. */
    active: boolean;
    /** Whether this slide was on screen before the active one. */
    previous: boolean;
    /** Whether this slide comes after the active one. */
    next: boolean;
    /** The scale that fits the content box into the window. */
    contentScale: number;
    /** The current 1-based step, clamped to one past the last reveal. Reflects the `step` attribute. */
    get step(): number;
    set step(step: number);
    connectedCallback(): void;
    /**
     * Imperatively defines the list of step elements for this slide. Slides
     * collect their light DOM `[reveal]` children on connect; call this when
     * the steps live elsewhere, for example in a declarative shadow root:
     *
     * ```ts
     * class DeclarativeShadowSlide extends SlidemSlideBase {
     *   override connectedCallback() {
     *     super.connectedCallback();
     *     this.defineSteps(this.shadowRoot!.querySelectorAll("[reveal]"));
     *   }
     * }
     * ```
     */
    defineSteps(nodes: Iterable<Element> | null | undefined): void;
    render(): unknown;
    /** What goes inside the content box. The slotted light DOM by default; override it in a custom slide. */
    protected renderContent(): unknown;
    updated(changed: PropertyValues<this>): void;
}
