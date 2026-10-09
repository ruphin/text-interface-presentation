import { PropertyDeclarations, PropertyValues } from '@gluon/gluon';
import { SlidemSlideBase } from './slidem-slide-base.js';
/**
 * A slide that plays the video given by its `video` attribute while it is
 * active. Pure class with no registration side effect: import
 * "slidem/elements/slidem-video-slide" to register it as <slidem-video-slide>.
 */
export declare class SlidemVideoSlide extends SlidemSlideBase {
    #private;
    static styles: import('@gluon/gluon').StyleSheet[];
    static properties: PropertyDeclarations;
    /** The URL of the video. Reflects the `video` attribute. */
    video: string;
    /** Whether the video plays without sound. Reflects the `muted` attribute. */
    muted: boolean;
    protected renderContent(): unknown;
    updated(changed: PropertyValues<this>): void;
}
