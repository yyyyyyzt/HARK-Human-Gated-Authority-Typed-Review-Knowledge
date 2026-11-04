import type { Severity, Verdict } from '../engine/types.js';
import type { SyntheticSet } from './synthetic.js';
export interface TruthDefect {
    ruleId: string;
    severity: Severity;
    plantedKind?: string;
}
export interface SolutionTruth {
    expectedVerdict: Verdict;
    defects: TruthDefect[];
}
export interface DatasetSolution {
    id: string;
    markdown: string;
    truth: SolutionTruth;
}
export interface Dataset {
    id: string;
    manifest: Record<string, unknown>;
    solutions: DatasetSolution[];
}
export declare function toDataset(set: SyntheticSet): Dataset;
/** File map (relative path → contents) for a synthetic set; used for byte-identity checks and writing. */
export declare function serializeDataset(set: SyntheticSet): Record<string, string>;
export declare function writeDataset(dir: string, set: SyntheticSet): string[];
export declare function readDataset(dir: string): Dataset;
