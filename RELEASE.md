# Release status

Updated 2026-11-05.

## Live records

* **GitHub:** <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge>
* **Zenodo deposit:** built from commit `cbe1d33` (Zenodo archive folder suffix `6e70ecd`);
  DOI `10.5281/zenodo.23955205` (all-versions DOI `10.5281/zenodo.23955204`), badge
  `https://zenodo.org/badge/1445355414.svg`. The DOI is wired into the Data Availability statement
  of `paper/mdpi-article/main.tex`, the README badge and `CITATION.cff`.
* **Tag note:** `refs/tags/v1.0.0` was later advanced to `c20f7fb`, the commit that wires the DOI
  into the repository. `c20f7fb` changes documentation only; implementation and evaluation data are
  unchanged. The Zenodo related identifier should point to the archived commit `cbe1d33`, not to the
  moving tag.
* **Manuscript snapshot:** `b566b08` — the state the paper cites. It is three commits ahead of the
  archived commit `cbe1d33`: `c20f7fb` (DOI wiring), `d36dd14` (gate on authority-changing rule
  edits), `b566b08` (release-note correction). None changes the evaluation data.

## What changed after the archived commit

* `c20f7fb` — the Zenodo DOI is written into the README, `CITATION.cff` and the manuscript source.
* `d36dd14` — a rule's severity or status may only change together with a quoted expert
  instruction (`AUTHORITY_UNCONFIRMED`).
* `b566b08` — release notes corrected to state the snapshot/archived-release relation.
* 2026-11-05 (submission branch) — manuscript rewritten against the read-only audit: new title,
  23 pages, 41 inline references, seven declarations with real authors, three implementation
  boundaries stated as target contracts; plus `paper/audit/`, `paper/mdpi-submission/` and the
  Chinese digest. **No code change**, so the archived `v1.0.0` software and the evaluated engine
  are unchanged.

## Human-facing items

1. **Zenodo record metadata — done 2026-11-05.** The published record now has the paper title, the
   seven authors in manuscript order with affiliations, the 2026-11-04 publication date, the revised
   description, all seven keywords and the archived-commit related identifier. `paper/zenodo/verify.sh`
   passes; the deposited file and the DOI are unchanged. `paper/zenodo/README.md` keeps the procedure
   for future re-checks.
2. **CRediT roles** in `paper/mdpi-article/main.tex` — the roles now follow the confirmed hierarchy
   (Z.Y. lead; K.W./Q.W. validation; H.W. resources and supervision; remaining authors review and
   editing); each author should still confirm their own role before submission.
3. **Suggested reviewers** — not part of this repository; fill the MDPI form directly (no
   same-institution or recent co-authors).
4. **No new version is required.** The archived bytes are immutable and the manuscript now names the
   archived commit. Publishing `v1.1.0` would mint a new DOI and require replacing the DOI in the
   Data Availability statement, the badge and `CITATION.cff`; do this only if a new artifact release
   is independently wanted.

## If a new archival release is wanted

Tag the submission commit and publish it; Zenodo mints a version DOI. Then update in one pass:
`paper/mdpi-article/main.tex` (Data Availability), `README.md` badge, `CITATION.cff` (`doi`,
`version`, `date-released`), and this file. The current text is accurate without a new release, so
this is optional.
