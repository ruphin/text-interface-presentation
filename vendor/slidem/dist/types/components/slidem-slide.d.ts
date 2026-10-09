import { PropertyDeclarations, PropertyValues } from '@gluon/gluon';
import { SlidemSlideBase } from './slidem-slide-base.js';
/**
 * The standard slide. Adds the `background` attribute and the inline styling
 * attributes (`fit`, `uppercase`, `color`, ...) on its content. Pure class
 * with no registration side effect: import "slidem/elements/slidem-slide" to
 * register it as <slidem-slide>, or extend it for a custom slide type.
 */
export declare class SlidemSlide extends SlidemSlideBase {
    #private;
    static properties: PropertyDeclarations;
    /** A CSS colour, a `--custom-property` name, or the URL of an image. Reflects the `background` attribute. */
    background: string | null;
    /** The opacity of a black overlay on a background image. Reflects the `darken-background` attribute. */
    darkenBackground: string | null;
    connectedCallback(): void;
    updated(changed: PropertyValues<this>): void;
}
