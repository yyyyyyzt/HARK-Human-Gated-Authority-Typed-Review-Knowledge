# HARK revision source (final submission copy)

This package contains the author-approved manuscript for submission to *Computers* (MDPI), a Chinese revision record, a compiled PDF and editorial provenance.

## Build

Two `pdflatex` passes (TeX Live 2023; the command used for the shipped PDF):

```bash
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Tectonic 0.17.0 with the same sources also produces 23 pages and the same body text. The running header prints `\today`, so a recompile on a later date changes only that header line. Keep `Definitions/` beside `main.tex`. Bibliography entries are inline; no external `bib.tex` is required. The bundled MDPI class differs from the audited upstream copy only in two logo references (EPS replaced by the shipped PDF), so the build needs no shell-enabled EPS conversion.

## Final state

- **Authors**: Zhitong Yang (corresponding), Qingxian Wang, Kai Wang, Qi Li, Lin Song, Dahai Jin, Hong Wang — State Grid Customer Service Center, Tianjin 300300, China. Correspondence: yyyyyyzt@tju.edu.cn. ORCID for the corresponding author: 0009-0002-1803-1529.
- **Declarations**: all seven MDPI declarations are author-confirmed (CRediT contributions, no external funding, IRB/consent not applicable, data availability, AI disclosure, no conflicts of interest). No placeholders remain. CRediT follows the confirmed hierarchy: Z.Y. leads conceptualization, methodology, software, analysis, investigation, data curation, drafting, visualization and administration; K.W. and Q.W. contribute validation; H.W. contributes resources and supervision; all authors review and edit.
- **References**: 41 entries, numbered in first-citation order 1–41, no gaps and no uncited entries.
- **Compilation**: pdfTeX 1.40.25 (TeX Live 2023), 23 pages, 0 overfull boxes, 0 undefined citation/reference warnings; Tectonic 0.17.0 gives the same page count and body text. Remaining warnings are underfull boxes and the legacy `lineno.sty` encoding note.

`revision-validation.json` records the bounded checks performed. `修改记录.md` documents the revision scope, the retained descriptive metrics and the engineering contracts that remain unimplemented by design (Section 6). `revision.diff` is the diff against the uploaded baseline `original-main.tex`.

## Not claimed

No new model outcomes, no repaired-engine performance, no independent human review, and no journal acceptance. The strict approval, effective-authority and content-addressed recovery mechanisms described in Section 5 remain target contracts, as stated in the manuscript.

## Manual steps for the journal system

`\articlenumber`, `\pubvolume`, `\issuenum` and the received/revised/accepted/published dates are left at template defaults; the editorial office supplies them after acceptance.
