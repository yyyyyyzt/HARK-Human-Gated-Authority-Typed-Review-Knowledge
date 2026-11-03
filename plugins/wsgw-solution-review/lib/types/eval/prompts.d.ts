import type { Rule } from '../engine/types.js';
export declare const JUDGE_SYSTEM: string;
export declare function judgeUser(rule: Pick<Rule, 'id' | 'title' | 'question' | 'rationale'>, snippet: string, sectionPath: string): string;
export declare const DIRECT_SYSTEM: string;
export declare function directUser(markdown: string, rules: Pick<Rule, 'id' | 'title' | 'severity' | 'question'>[]): string;
export declare const POLICY_SYSTEM = "\u4F60\u662F\u6280\u672F\u65B9\u6848\u5BA1\u67E5\u4E13\u5BB6\u3002\u5DF2\u786E\u8BA4\u7684\u95EE\u9898\u6E05\u5355\u5982\u4E0B\uFF0C\u8BF7\u76F4\u63A5\u7ED9\u51FA\u65B9\u6848\u7ED3\u8BBA\u3002\u53EA\u8F93\u51FA JSON\uFF1A{\"verdict\": \"\u901A\u8FC7\"|\"\u5EFA\u8BAE\u6574\u6539\"|\"\u4E0D\u901A\u8FC7\"}\u3002";
export declare function policyUser(issues: {
    ruleId: string;
    severity: string;
    finding: string;
}[]): string;
/** First 12 hex chars of sha256 over every prompt text; recorded as `eval_runs.config.promptHash`. */
export declare function promptHash(): string;
