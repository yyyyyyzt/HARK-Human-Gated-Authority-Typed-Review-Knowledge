# Cover letter — MDPI *Computers*

> Paste into the submission system's cover-letter field. Every factual claim below is traceable to
> `main.tex` (Section 4 and Section 6); nothing is asserted beyond what the manuscript measures.
> Suggested reviewers are optional and deliberately left out.

---

5 November 2026

Dear Editors,

We submit the manuscript **“HARK: Authority-Typed Review Knowledge for Evidence-Bearing Document
Review”** for consideration as an *Article* in *Computers*, Section *AI-Driven Innovations*.

**Problem.** Organisations increasingly pre-screen technical documents with language models before an
accountable expert signs off, yet the expert's review knowledge enters such systems as keyword rules,
prompt checklists, or retrieval over past reviews. Each route loses a property that high-stakes review
needs: a finding must trace to a stated criterion and to a location in the document; the permission to
conclude a requirement must match how deterministically that requirement can actually be checked; the
knowledge must accumulate from use; and that accumulation must remain inspectable and revocable.

**What the paper does.** HARK is an architecture and an executed system that represent review criteria
as rules carrying an *operational authority type*. Deterministic verifiers own `hard` checks and may
produce absence records that a model is never allowed to assert; `hybrid` rules let verifiers locate
candidate spans while the model judges only inside them; `soft` items are referral-only and never
counted. A positional evidence gate checks submitted quotations against verifier-provided spans, a
deterministic policy derives the suggested verdict from the confirmed set, and decision records persist
the expert's dispositions. The manuscript reports the architecture, the implementation, the rule
package and a retrospective evaluation, and it separates implemented behaviour from three target
contracts that the evaluated snapshot does **not** enforce (authenticated human approval, a complete
effective-authority ceiling, and content-addressed configuration recovery).

**Evidence.** On a fixed developmental regression corpus of 100 synthetic proposals with 253 planted
defects, the combined configuration reaches micro-F1 0.798 (TP/FP/FN = 168/0/85) against 0.222 for a
keyword baseline of the same policy (47/124/206), with 85% policy-verdict agreement (κ = 0.763). The
result is deliberately bounded: 68 of the 85 misses are referred to pending review rather than silently
passed, and the stored results do not show that a reviewer resolved them; 15 of 70 policy-non-Pass
documents are under-called, including four of 23 expected Fail documents that receive a suggested Pass;
gate acceptance is 42/53 and measures quotation length and overlap, not semantic support. Only 10 of
the 28 shipped rules proved deterministically checkable and all four blocker rules are `hybrid` — a
finding about the legacy checklist, reported as such. Five development-team runs on three internal
proposals are reported as workflow evidence only, not as independent expert validation.

**Fit.** *Computers* publishes complete computational systems with reproducible evaluation, and this
manuscript contributes exactly that: an executable review architecture, its data model and
interfaces, a mechanism-level comparison, and an explicit account of what the evidence does and does
not support. The Section *AI-Driven Innovations* matches the contribution — the representation and
governance of review knowledge for AI-assisted expert work — and the Topic *AI Agents: Progress,
Architecture, and Applications* (alternative: *AI-Driven Software Engineering and Next-Generation Web
Services*).

**Reproducibility and declarations.** The plugin, the 28-rule package, the corpus generator, the
100-proposal corpus with planted-defect truth, the ablation runner and the published runs are released
under MIT at <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge> and
archived at Zenodo (DOI 10.5281/zenodo.23955205); the manuscript states that the archived source
release precedes the cited snapshot by two commits that add quotation checks and release notes, with
the data byte-identical. The manuscript is original, is not under consideration elsewhere, and all
authors have approved this submission. The authors declare no conflict of interest and no external
funding; all authors are affiliated with the organisation whose review workflow supplies the internal
pilot, as disclosed in the manuscript. The use of a generative AI assistant for language editing and
manuscript preparation, without generating any experimental result, is disclosed in the manuscript.

Yours sincerely,

**Zhitong Yang** (corresponding author), on behalf of all authors
State Grid Customer Service Center, Tianjin 300300, China
yyyyyyzt@tju.edu.cn · ORCID 0009-0002-1803-1529
