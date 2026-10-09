import { GluonElement, PropertyDeclarations, PropertyValues } from '@gluon/gluon';
import { DeckState } from '../lib/state.js';
import { SlidemSlideBase } from './slidem-slide-base.js';
/**
 * The deck: routes the location hash to a slide and step, animates the
 * transitions, and provides presenter mode. Pure class with no registration
 * side effect: import "slidem/elements/slidem-deck" to register it as
 * <slidem-deck>.
 */
export declare class SlidemDeck extends GluonElement {
    #private;
    static styles: string;
    static properties: PropertyDeclarations;
    /** Whether presenter mode is on. Reflects the `presenter` attribute. */
    presenter: boolean;
    /** The font family of the deck. Reflects the `font` attribute. */
    font: string | null;
    /** The slides, in order. Collected from the deck's children on connect. */
    slides: SlidemSlideBase[];
    /** The 1-based index of the slide on screen, from the location hash. */
    slide: number;
    /** The 1-based step of the slide on screen, from the location hash. */
    step: number;
    /** The elapsed time shown in presenter mode, empty while the timer is off. */
    timerText: string;
    /** The 1-based slide and step from the location hash. Setting it navigates. */
    get state(): DeckState;
    set state(next: Partial<DeckState>);
    get currentStepIndex(): number;
    get currentSlideIndex(): number;
    get previousSlide(): SlidemSlideBase | null;
    get currentSlide(): SlidemSlideBase | null;
    get nextSlide(): SlidemSlideBase | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): unknown;
    updated(changed: PropertyValues<this>): void;
    /** Goes to the next step, or the first step of the next slide. */
    forward(): void;
    /** Goes to the previous step, or the last step of the previous slide. */
    back(): void;
    togglePresenter(): void;
    toggleTimer(): void;
}
declare global {
    interface WindowEventMap {
        "location-changed": Event;
    }
}
