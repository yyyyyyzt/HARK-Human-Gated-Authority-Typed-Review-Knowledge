export declare const DEFAULT_PRIVATE_DIR = "paper/data/private";
export interface AnonymizerDict {
    /** Exact replacements for unit / product names, e.g. { 某平台: 'OSP' }. */
    fixed: Record<string, string>;
    provinces: string[];
    thirdParties: string[];
    services: string[];
    tables: string[];
    codes: string[];
    reviewers: string[];
    dateShiftDays: number;
}
export interface Anonymizer {
    anonymize(text: string): string;
    /** Original → alias, accumulated over every call (sequence aliases depend on first occurrence). */
    map(): Record<string, string>;
}
export declare function createAnonymizer(dict: AnonymizerDict): Anonymizer;
export interface LeakHit {
    term: string;
    count: number;
}
/** Count occurrences of every forbidden term; publication requires an empty result. */
export declare function leakCheck(text: string, forbidden: string[]): LeakHit[];
