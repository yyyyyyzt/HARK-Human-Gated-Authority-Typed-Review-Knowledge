import type { Rule, RulePack, Severity, Verdict, VerdictConfig } from '../engine/types.js';
/** 3–5 substrings per verifiable rule: the first words of its lexicon families, or a structural override. */
export declare function b0Keywords(pack: RulePack): Record<string, string[]>;
export interface B0Result {
    issues: {
        ruleId: string;
        severity: Severity;
        tier: Rule['tier'];
    }[];
    verdict: Verdict;
    keywords: Record<string, string[]>;
}
/** A rule passes when any of its keywords occurs anywhere in the text (applicability is honoured, in the baseline's favour). */
export declare function runB0(markdown: string, pack: RulePack, cfg: VerdictConfig, keywords?: Record<string, string[]>): B0Result;
