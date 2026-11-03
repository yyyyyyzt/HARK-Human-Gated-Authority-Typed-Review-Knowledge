import type { Doc, Evidence, GateReason, HybridCandidate, Rule, RulePack, Severity, Snippet, Verdict } from '../engine/types.js';
export interface JudgeInput {
    solutionId: string;
    rule: Rule;
    snippet: Snippet;
}
export interface JudgeOutput {
    issue: boolean;
    quote?: string;
    finding?: string;
}
export interface DirectInput {
    solutionId: string;
    markdown: string;
    rules: Rule[];
}
export interface DirectOutput {
    issues: {
        ruleId: string;
        quote?: string;
        finding?: string;
    }[];
    verdict?: Verdict;
}
export interface PolicyInput {
    solutionId: string;
    issues: {
        ruleId: string;
        severity: Severity;
        finding: string;
    }[];
}
export type MaybePromise<T> = T | Promise<T>;
export interface Judge {
    id: string;
    model: string;
    judge(input: JudgeInput): MaybePromise<JudgeOutput>;
    /** Whole-document review (B1). Absent on deterministic judges. */
    direct?(input: DirectInput): Promise<DirectOutput>;
    /** Verdict from a one-line model call over a fixed issue list (S-policy). */
    policy?(input: PolicyInput): Promise<Verdict | undefined>;
}
export interface ChatMessage {
    role: 'system' | 'user';
    content: string;
}
/** Supplied by the runner (e.g. a DSH `ctx.llm` wrapper); the plugin ships no model client. */
export interface Adapter {
    model: string;
    complete(messages: ChatMessage[], opts: {
        temperature: number;
    }): Promise<string>;
}
export declare function isTrailingPlaceholder(quote: string): boolean;
export declare const flagJudge: Judge;
export declare function snippetKey(solutionId: string, ruleId: string, quote: string): string;
export declare function replayJudge(records: Record<string, JudgeOutput>, model?: string): Judge;
export declare function recordingJudge(inner: Judge, sink: Record<string, JudgeOutput>): Judge;
export declare function extractJson(text: string): unknown;
export declare function llmJudge(adapter: Adapter): Judge;
export interface JudgedIssue {
    ruleId: string;
    severity: Severity;
    tier: 'hybrid';
    quote: string;
    finding: string;
    evidence: Evidence[];
    gatePassed: boolean;
}
export interface JudgeRun {
    issues: JudgedIssue[];
    /** LLM submissions rejected by the gate (one per rule at most). */
    rejected: {
        ruleId: string;
        reasons: GateReason[];
    }[];
    submitted: number;
    evaluated: number;
}
export interface JudgeOptions {
    solutionId?: string;
    gate?: boolean;
}
/** Synchronous variant for deterministic judges (self-check, tests). */
export declare function judgeCandidates(doc: Doc, candidates: HybridCandidate[], pack: RulePack, judge: Judge, opts?: JudgeOptions): JudgeRun;
export declare function judgeCandidatesAsync(doc: Doc, candidates: HybridCandidate[], pack: RulePack, judge: Judge, opts?: JudgeOptions): Promise<JudgeRun>;
