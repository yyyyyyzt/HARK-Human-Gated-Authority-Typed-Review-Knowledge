import type { RulePack, Severity, Verdict } from '../engine/types.js';
export declare const GENERATOR_VERSION = "arbiter/eval/synthetic@1.0.0";
export declare const PLANTED_KINDS: readonly ["missing", "negated", "placeholder", "hollow"];
export type PlantedKind = (typeof PLANTED_KINDS)[number];
export interface Defect {
    ruleId: string;
    severity: Severity;
    plantedKind: PlantedKind;
}
export interface SyntheticSolution {
    id: string;
    markdown: string;
    expectedVerdict: Verdict;
    defects: Defect[];
    features: Feature[];
}
export interface SyntheticManifest {
    id: string;
    seed: number;
    generatedBy: string;
    rulePackVersion: string;
    minorThreshold: number;
    counts: Record<Verdict, number>;
}
export interface SyntheticSet {
    manifest: SyntheticManifest;
    solutions: SyntheticSolution[];
}
export interface SyntheticOptions {
    seed: number;
    minorThreshold?: number;
}
export type Feature = 'riskctl' | 'realname' | 'sync' | 'tracking' | 'ui' | 'message' | 'modify';
export declare function generateSyntheticSet(pack: RulePack, opts: SyntheticOptions): SyntheticSet;
export interface SelfCheckViolation {
    solutionId: string;
    ruleId: string;
    status: string;
    note?: string;
}
export interface KindDetection {
    planted: number;
    detected: number;
    pending: number;
    missed: number;
}
export interface SelfCheckReport {
    ok: boolean;
    violations: SelfCheckViolation[];
    detection: Record<PlantedKind, KindDetection>;
    perRule: Record<string, KindDetection>;
}
export declare function selfCheck(set: SyntheticSet, pack: RulePack): SelfCheckReport;
export declare function checkHash(solutions: {
    id: string;
    markdown: string;
}[], pack: RulePack): string;
