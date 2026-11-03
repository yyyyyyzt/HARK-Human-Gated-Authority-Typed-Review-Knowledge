/** splitmix32-derived generator: deterministic across platforms, good enough for resampling. */
export declare function seededRandom(seed: number): () => number;
export interface BootstrapOptions {
    resamples?: number;
    seed?: number;
    alpha?: number;
}
export interface BootstrapResult {
    estimate: number;
    lower: number;
    upper: number;
    resamples: number;
}
/** Percentile bootstrap over `items` (resampling unit = one item, e.g. one solution). */
export declare function bootstrapCI<T>(items: T[], statistic: (sample: T[]) => number, opts?: BootstrapOptions): BootstrapResult;
export declare function normalTwoSidedP(z: number): number;
export interface WilcoxonResult {
    n: number;
    statistic: number;
    z: number;
    pValue: number;
}
/** Paired Wilcoxon signed-rank test (normal approximation with tie correction; zero differences dropped). */
export declare function wilcoxonSignedRank(a: number[], b: number[]): WilcoxonResult;
export interface McNemarResult {
    b: number;
    c: number;
    method: 'exact' | 'chi2';
    statistic: number;
    pValue: number;
}
/** McNemar test on discordant counts b (A right, B wrong) and c (A wrong, B right). */
export declare function mcnemar(b: number, c: number): McNemarResult;
/** Holm step-down adjusted p-values (same order as input). */
export declare function holm(pValues: number[]): number[];
export declare function mean(xs: number[]): number;
export declare function stddev(xs: number[]): number;
