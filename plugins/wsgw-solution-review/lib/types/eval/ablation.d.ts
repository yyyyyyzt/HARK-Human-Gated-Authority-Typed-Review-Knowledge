import type { Rule, RulePack, Severity, Tier, Verdict, VerdictConfig } from '../engine/types.js';
import type { EvalRunRecord } from '../store/domain.js';
import type { Dataset } from './dataset.js';
import { type Judge } from './judge.js';
export declare const ABLATIONS: readonly ["B0", "B1", "S-full", "S-gate", "S-verifier", "S-policy", "S-memory"];
export type Ablation = (typeof ABLATIONS)[number];
export interface RunConfig {
    ablation: Ablation;
    judge: string;
    model: string;
    promptHash: string;
    repetition: number;
    rulePackVersion: string;
    minorThreshold: number;
}
export interface PerSolution {
    id: string;
    truth: string[];
    expectedVerdict: Verdict;
    predicted: string[];
    predictedTiers: Record<string, Tier>;
    pending: string[];
    predictedVerdict: Verdict;
    f1: number;
    gateRejects: number;
    submitted: number;
}
export interface PerRule {
    ruleId: string;
    tier: Tier;
    severity: Severity;
    tp: number;
    fp: number;
    fn: number;
    precision: number;
    recall: number;
}
export interface RunOptions {
    ablation: Ablation;
    dataset: Dataset;
    pack: RulePack;
    cfg: VerdictConfig;
    judge: Judge;
    repetition: number;
    now?: () => string;
}
export interface EvalRun extends EvalRunRecord {
    config: RunConfig;
    perSolution: PerSolution[];
    perRule: PerRule[];
}
/** S-verifier: hybrid rules lose candidate localisation (whole-document statements); hard rules unchanged. */
export declare function withoutCandidateScoping(rules: Rule[]): Rule[];
export declare function requiresAdapter(ablation: Ablation): boolean;
export declare function runConfiguration(opts: RunOptions): Promise<EvalRun>;
export interface AblationOptions {
    dataset: Dataset;
    pack: RulePack;
    cfg: VerdictConfig;
    judge: Judge;
    repetitions?: number;
    ablations?: readonly Ablation[];
    onRun?: (run: EvalRun) => void | Promise<void>;
}
export interface Skipped {
    ablation: Ablation;
    reason: string;
}
export declare function runAblation(opts: AblationOptions): Promise<{
    runs: EvalRun[];
    skipped: Skipped[];
}>;
export interface SummaryOptions {
    baseline?: Ablation;
    reference?: Ablation;
    bootstrapSeed?: number;
}
export declare function summarize(runs: EvalRun[], skipped: Skipped[], opts?: SummaryOptions): string;
