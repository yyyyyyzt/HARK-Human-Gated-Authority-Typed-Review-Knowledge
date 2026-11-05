#!/usr/bin/env bash
# Verify the public Zenodo record after the metadata edit.
# Usage: ./verify.sh   (no token needed; read-only)
set -euo pipefail

RECORD_ID=23955205
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

curl -fsS "https://zenodo.org/api/records/${RECORD_ID}" -o "$TMP"

python3 - "$TMP" <<'PY'
import json
import sys

record = json.load(open(sys.argv[1]))
m = record["metadata"]
failures = []

def check(label, condition, detail=""):
    if condition:
        print(f"  OK   {label}")
    else:
        print(f"  FAIL {label}{(': ' + detail) if detail else ''}")
        failures.append(label)

print(f"Record {record.get('id')} | DOI {record.get('doi')} | state {record.get('state')}")

check("title", m.get("title") == "HARK: Authority-Typed Review Knowledge for Evidence-Bearing Document Review", repr(m.get("title")))

expected_names = ["Yang, Zhitong", "Wang, Kai", "Wang, Qingxian", "Li, Qi", "Song, Lin", "Jin, Dahai", "Wang, Hong"]
names = [c.get("name") for c in m.get("creators", [])]
check("7 creators in manuscript order", names == expected_names, repr(names))
check("corresponding ORCID on first creator", (m.get("creators") or [{}])[0].get("orcid", "").endswith("0009-0002-1803-1529"), repr((m.get("creators") or [{}])[0].get("orcid")))
check("all creators affiliated", all(c.get("affiliation") == "State Grid Customer Service Center, Tianjin 300300, China" for c in m.get("creators", [])), repr([c.get("affiliation") for c in m.get("creators", [])]))

desc = m.get("description", "")
check("description says prepared for submission", "prepared for submission" in desc)
check("description states target contracts", "target contracts" in desc and "not implemented" in desc)
check("description has no 'submitted to'", "submitted to" not in desc)
check("description has no 'plugin'", "plugin" not in desc.lower())

check("publication date", m.get("publication_date") == "2026-11-04", repr(m.get("publication_date")))
check("version", m.get("version") == "1.0.0", repr(m.get("version")))
check("license MIT", (m.get("license") or {}).get("id") == "mit-license", repr(m.get("license")))
check("resource type software", (m.get("resource_type") or {}).get("type") == "software", repr(m.get("resource_type")))

expected_keywords = ["large language models", "document review", "authority typing", "evidence grounding", "neuro-symbolic verification", "human-in-the-loop", "reproducibility"]
check("7 keywords", m.get("keywords") == expected_keywords, repr(m.get("keywords")))

related = m.get("related_identifiers", [])
commit_url = "https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge/tree/cbe1d330c7b15cce278ca62f6dfb604a76489502"
check("related identifier points to archived commit cbe1d33", any("cbe1d330c7b15cce278ca62f6dfb604a76489502" in r.get("identifier", "") for r in related), repr([r.get("identifier") for r in related]))
if any("/tree/v1.0.0" in r.get("identifier", "") for r in related):
    print("  WARN the old tree/v1.0.0 related identifier is still present; remove it if the form allows")

files = record.get("files", [])
check("archived file preserved", len(files) == 1, repr(len(files)))
if files:
    f = files[0]
    check("file checksum unchanged", f.get("checksum") == "md5:02c7e7209d78259ed3207dfb7a5ac415", repr(f.get("checksum")))
    check("file size unchanged", f.get("size") == 1814296, repr(f.get("size")))

print()
if failures:
    print(f"FAILED: {len(failures)} check(s). The record is not fully corrected yet.")
    sys.exit(1)
print("All checks passed.")
PY
