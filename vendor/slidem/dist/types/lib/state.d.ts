/** Where a deck is: both numbers are 1-based. */
export interface DeckState {
    slide: number;
    step: number;
}
export declare const INITIAL_STATE: Readonly<DeckState>;
/** Reads the deck state from a location hash; falls back to the first step of the first slide. */
export declare function parseState(hash: string): DeckState;
/** Formats a deck state as a location hash. */
export declare function formatState({ slide, step }: DeckState): string;
export declare function sameState(a: DeckState, b: DeckState): boolean;
/** True when both parts are usable slide and step numbers. */
export declare function isValidState({ slide, step }: Partial<DeckState>): boolean;
