import type { Severity, Verdict } from '../engine/types.js';
export declare const VERDICT_ORDER: readonly Verdict[];
export declare const SEVERITY_WEIGHT: Record<Severity, number>;
export interface SolutionAlignment {
    id: string;
    predicted: string[];
    truth: string[];
}
export interface IssueMetrics {
    tp: number;
    fp: number;
    fn: number;
    precision: number;
    recall: number;
    f1: number;
    weightedRecall: number;
}
export declare function f1Of(precision: number, recall: number): number;
/** Alignment granularity is (solution, rule): duplicates inside one solution collapse to one. */
export declare function issueMetrics(rows: SolutionAlignment[], severityOf: (ruleId: string) => Severity): IssueMetrics;
export interface VerdictPair {
    predicted: Verdict;
    actual: Verdict;
}
/** Rows = actual, columns = predicted, both in VERDICT_ORDER. */
export declare function confusionMatrix(pairs: VerdictPair[]): number[][];
export declare function accuracy(matrix: number[][]): number;
export declare function cohenKappa(matrix: number[][], weights?: 'none' | 'quadratic'): number;
export declare function macroF1(matrix: number[][]): number;
export type OnlineAction = 'adopt' | 'reject' | 'rewrite' | 'add';
export type IssueLabel = 'TP' | 'FP' | 'FN' | 'TP-pending' | 'FP-pending';
export declare function labelOf(input: {
    action: OnlineAction;
    wasPending?: boolean;
}): IssueLabel;
