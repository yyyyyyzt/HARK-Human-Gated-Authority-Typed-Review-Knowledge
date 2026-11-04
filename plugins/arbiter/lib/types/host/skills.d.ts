import type { Context } from '@deepseek-ai/cordis';
import { type SkillRegistration } from '@deepseek-ai/dsh-skill';
export declare const name = "arbiter/skill";
export declare const inject: string[];
export declare const SKILL_NAME = "arbiter";
export declare function bundledSkill(): SkillRegistration;
export declare function apply(ctx: Context): void;
