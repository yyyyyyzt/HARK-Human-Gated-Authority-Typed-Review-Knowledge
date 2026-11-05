# Release status

Updated 2026-11-05.

## Live records

* **GitHub:** <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge>
* **Archived release `v1.0.0`:** commit `c20f7fb`; Zenodo DOI `10.5281/zenodo.23955205`
  (all-versions DOI `10.5281/zenodo.23955204`), badge `https://zenodo.org/badge/1445355414.svg`.
  The DOI is wired into `\dataavailability` of `paper/mdpi-article/main.tex`, the README badge and
  `CITATION.cff`.
* **Manuscript snapshot:** `b566b08` — the state the paper cites. It is two commits ahead of
  `v1.0.0` (`d36dd14` gate on authority-changing rule edits, `b566b08` release-note correction);
  both touch source only, the evaluation data are byte-identical.

## What changed on `main` after `v1.0.0`

* `d36dd14` — a rule's severity or status may only change together with a quoted expert
  instruction (`AUTHORITY_UNCONFIRMED`).
* `b566b08` — release notes corrected to state the snapshot/archived-release relation.
* 2026-11-05 (submission branch) — manuscript rewritten against the read-only audit: new title,
  23 pages, 41 inline references, seven declarations with real authors, three implementation
  boundaries stated as target contracts; plus `paper/audit/`, `paper/mdpi-submission/` and the
  Chinese digest. **No code change**, so the archived `v1.0.0` software and the evaluated engine
  are unchanged.

## Still needs a human

1. **Zenodo record metadata.** The published `v1.0.0` deposit was created from `.zenodo.json` while
   its creators were still placeholders (`Author A`–`Author F`). Editing `.zenodo.json` in this
   repository does **not** retroactively change the published record. Either correct the metadata of
   the existing record in the Zenodo web UI (editing metadata of a published record is allowed and
   keeps the DOI), or publish `v1.1.0` and use the new version DOI. Recommended: correct the existing
   record — the DOI in the manuscript then stays valid.
2. **CRediT roles** in `paper/mdpi-article/main.tex` — confirm each of the 14 roles, especially
   `Software` (Z.Y. only) and `Supervision` (D.J., H.W.).
3. **Suggested reviewers** — not part of this repository; fill the MDPI form directly (no
   same-institution or recent co-authors).
4. **Zenodo version correspondence** — the manuscript states the two-commit gap; if a `v1.1.0` is
   published instead, replace the DOI in `\dataavailability` and the README badge.

## If a new archival release is wanted

Tag the submission commit and publish it; Zenodo mints a version DOI. Then update in one pass:
`paper/mdpi-article/main.tex` (`\dataavailability`), `README.md` badge, `CITATION.cff` (`doi`,
`version`, `date-released`), and this file. The current text is accurate without a new release, so
this is optional.
