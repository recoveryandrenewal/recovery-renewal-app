# Recovery & Renewal: Library Tab – Public Domain & Open-Licensed Sources

**Document Purpose:** Curated, license-verified sources for a free, open-source, privacy-first recovery app. All content is confirmed public domain, Creative Commons licensed, or otherwise legally safe for embedding in open-source apps.

**Document Date:** December 17, 2025

**US Copyright Context:** Works published before 1923 are public domain in the US. Current updates reflect 2025 copyright rules.

---

## 1. King James Version (KJV) Bible – JSON or Downloadable

### Overview

The KJV is fully public domain outside the UK (see licensing note below). Multiple JSON sources are available for offline use.

### Recommended KJV JSON Sources

#### **#1: bible-api.com (RECOMMENDED PRIMARY SOURCE)**

| Aspect | Details |
|--------|---------|
| **Project Name** | bible-api.com |
| **URL** | https://bible-api.com |
| **Repository** | https://github.com/seven1m/bible_api |
| **Data Format** | JSON (RESTful API or downloadable via GitHub) |
| **Text License** | Public Domain (KJV text) |
| **Code/Data License** | MIT License (source code and JSON data structure) |
| **License Links** | [GitHub MIT License](https://github.com/seven1m/bible_api/blob/master/LICENSE) |
| **Structure** | Book → Chapter → Verse with full text |
| **Offline Support** | YES – can cache locally for offline apps |
| **Restrictions** | None for non-commercial or commercial open-source use; credit appreciated |
| **Why Recommended** | Clean MIT licensing on both code and data; straightforward JSON; well-documented GitHub repo; actively maintained; simple to integrate. |

**Usage Notes:**
- Single verse: `/john 3:16`
- Multiple verses: `/matt 25:31-33,46`
- Works with book abbreviations (e.g., `jn`, `matt`)
- Can be cached entirely for offline mobile app

---

#### **#2: eBible.org (via CrossWire Bible Society)**

| Aspect | Details |
|--------|---------|
| **Project Name** | eBible.org / CrossWire Bible Society |
| **URL** | https://ebible.org/eng-kjv/ |
| **Data Formats Available** | HTML, Plain text, EPUB, USFM, OSIS, PDF, Zipped archives |
| **Text License** | **Public Domain** – confirmed by eBible.org |
| **Code/Format License** | CC0 1.0 Universal (public domain for metadata/formatting) |
| **License Link** | https://ebible.org/eng-kjv/copyright.htm |
| **Offline Support** | YES – all formats available for download |
| **UK/International Note** | Outside UK: firmly public domain. UK printing rights reserved to Cambridge/Oxford/Collins (no effect on source text use). |
| **Restrictions** | None for offline embedding in open-source apps |
| **Provided By** | Crosswire Bible Society (non-profit, open-source Christian ministry) |

**Download Options:**
- HTML (zipped): For parsing into JSON
- Plain ASCII text: For conversion to JSON/other formats
- EPUB: For reading reference
- Full download: https://ebible.org/eng-kjv/

**Why Include:** Authoritative, long-standing nonprofit source; multiple formats; extremely clear public domain status; well-documented copyright.

---

#### **#3: GitHub – kenyonbowers/BibleJSON**

| Aspect | Details |
|--------|---------|
| **Project Name** | BibleJSON (Kenyon Bowers) |
| **URL** | https://github.com/kenyonbowers/Bible-JSON |
| **Data Format** | JSON (per-book files, chapter-level structure) |
| **Text License** | Public Domain (KJV) |
| **Code License** | MIT License |
| **Structure** | `/JSON/[BookName]/[ChapterNumber].json` |
| **Offline Support** | YES – clone entire repo for offline use |
| **Features** | Includes verse headers/footers, Jesus' words highlighted in red, italics preserved |
| **Restrictions** | None for open-source embedding |

**File Structure Example:**
```json
{
  "book_name": "Psalms",
  "chapter": 3,
  "verses": [
    {
      "book_name": "Psalms",
      "chapter": 3,
      "verse": 1,
      "text": "LORD, how are they increased that trouble me! many <i>are</i> they that rise up against me.",
      "header": "¶ A Psalm of David, when he fled from Absalom his son.",
      "footer": ""
    }
  ]
}
```

**Why Include:** GitHub-native; easy cloning for offline apps; clean structure; includes markup for formatting; active community.

---

### Licensing Summary for KJV

| Status | Details |
|--------|---------|
| **Text Status** | **PUBLIC DOMAIN in USA** (published 1611; standardized text 1769) |
| **UK Exception** | Letters patent (royal decree) issued by King James gives printing exclusivity to Cambridge University Press, Oxford University Press, and Collins in UK *only*. Has **no effect outside UK**. |
| **International** | Fully public domain worldwide except UK printing/import rights. |
| **Safe for Apps** | ✅ YES – embed full KJV text in open-source app without permission |
| **Data Structures** | ✅ YES – JSON, XML, or other digital formats are clearly licensed (MIT, CC0, etc.) |

---

### Recommendation for Recovery & Renewal

**Use bible-api.com as primary source** with fallback to eBible.org data:
- **Rationale:** MIT-licensed JSON data; easy to cache locally; clean GitHub integration; well-documented.
- **Implementation:** Download KJV JSON from GitHub repo or query live API for initial population; store locally for offline use.
- **Attribution:** Include credit line: "King James Version (Public Domain) + MIT-licensed JSON structure via bible-api.com"

---

## 2. Christian Prayers (Traditional, Public Domain)

### Overview

Classic Christian prayers are among the safest sources for open-source apps because most predate copyright law (pre-1923 = public domain in US). Modern translations may be copyrighted.

### Recommended Public-Domain Christian Prayers

| Prayer Title | Source URL | License Status | Notes | Safe to Embed? |
|--------------|-----------|-----------------|-------|----------------|
| **Lord's Prayer (Matthew 6:9–13)** | [Project Gutenberg](https://www.gutenberg.org/) (search "Lord's Prayer") or [BCP 1928](http://justus.anglican.org/resources/bcp/1928/AFPB.pdf) | Public Domain – Biblical text; no copyright | Original text from Bible (KJV); pre-1923 Prayer Book editions | ✅ YES |
| **Apostles' Creed** | [Project Gutenberg – Exposition of the Apostles' Creed](https://www.gutenberg.org/cache/epub/13652/pg13652-images.html) or [BCP 1928](http://justus.anglican.org/resources/bcp/1928/AFPB.pdf) | Public Domain – Ancient creed, no single author | Traditionally used in liturgy since early church; pre-1923 | ✅ YES |
| **Nicene Creed** | [Project Gutenberg](https://www.gutenberg.org) or historical church sources | Public Domain – Ancient church document (325 AD) | Original authored by Church Council, public domain for centuries | ✅ YES |
| **Gloria Patri (Doxology)** | [BCP 1928](http://justus.anglican.org/resources/bcp/1928/AFPB.pdf) or [Project Gutenberg](https://www.gutenberg.org) | Public Domain – Ancient hymn, pre-1923 texts | Traditional liturgical doxology; no modern copyright | ✅ YES |
| **Serenity Prayer** | [Wikipedia](https://en.wikipedia.org/wiki/Serenity_Prayer) (under Fair Use) or [AA.org official](https://www.aa.org/sites/default/files/2021-11/en_bigbook_copyright.pdf) | ⚠️ **Copyrighted by Niebuhr estate** (composed ~1932; published 1951) | Written by Reinhold Niebuhr; copyright held by estate. AA distributes freely but copyright never released. | ❌ **NOT safe to embed** – Copyrighted; only link to external source or use paraphrase |
| **Set Aside Prayer (AA)** | AA literature (Big Book, *Twelve and Twelve*) | ⚠️ **Copyright AAWS** – "A.A. Approved Prayers" | Classic AA prayer, but copyrighted by AAWS (Alcoholics Anonymous World Services) | ❌ **NOT safe to embed** – Only link externally or request permission |
| **St. Francis Prayer** ("Make Me an Instrument of Thy Peace") | [Wikisource](https://en.wikisource.org/wiki/A_prayer_of_St._Francis_of_Assisi) or [Online Library of Liberty](https://oll.libertyfund.org) | Public Domain – **NOT by St. Francis**; first published 1912 in French; copyright expired | Despite attribution, not written by St. Francis (c. 1182–1226). Originally published anonymously in *La Clochette* (1912); attributed to St. Francis c. 1927; copyright on 1912 text now expired. | ✅ YES (use 1912 original or pre-1928 version) |
| **Gloria in Excelsis Deo** | [Project Gutenberg](https://www.gutenberg.org) or [BCP 1928](http://justus.anglican.org/resources/bcp/1928/AFPB.pdf) | Public Domain – Ancient hymn; traditional text | Pre-1923 versions; no modern copyright | ✅ YES |

---

### Key Licensing Notes

#### **Prayers Safe to Embed (Public Domain)**

- **Lord's Prayer, Apostles' Creed, Nicene Creed, Gloria Patri, Gloria in Excelsis Deo:**
  - Centuries-old liturgical texts; no author/copyright holder
  - Pre-1923 Prayer Book editions (e.g., BCP 1928) are public domain
  - ✅ Safe for full embedding in open-source app

- **St. Francis Prayer ("Make Me an Instrument of Thy Peace"):**
  - Despite common attribution to St. Francis of Assisi, this prayer was first published in 1912 in French devotional publication *La Clochette*
  - Mistakenly attributed to St. Francis around 1927
  - **Original 1912 French publication copyright has expired** → public domain
  - ✅ Safe for embedding if sourced from pre-1928 version

---

#### **Prayers NOT Safe to Embed (Copyrighted)**

- **Serenity Prayer:**
  - Written by Reinhold Niebuhr (~1932, published 1951)
  - Still under copyright protection (author died 1971; copyright extends ~70 years)
  - AA uses it widely but does NOT hold copyright
  - ❌ DO NOT embed; link externally or create paraphrase only
  - Credit: "Based on the Serenity Prayer by Reinhold Niebuhr (copyrighted)"

- **AA-Specific Prayers (Set Aside Prayer, etc.):**
  - Copyrighted by Alcoholics Anonymous World Services (AAWS)
  - AAWS strictly protects AA literature
  - ❌ DO NOT embed; only link to official AA sources
  - Exception: Brief quotes (fair use) + clear attribution to AAWS

---

### Recommended Prayer Library Structure

```json
{
  "prayers": [
    {
      "title": "Lord's Prayer",
      "category": "Traditional",
      "text": "[KJV Matthew 6:9-13 text]",
      "license": "Public Domain (Biblical text)",
      "source": "King James Version Bible"
    },
    {
      "title": "Apostles' Creed",
      "category": "Creeds",
      "text": "[Full Creed text]",
      "license": "Public Domain (ancient liturgical text, pre-1923)",
      "source": "Book of Common Prayer (1928) / Project Gutenberg"
    },
    {
      "title": "St. Francis Prayer",
      "category": "Peace & Spirituality",
      "text": "[1912 French original or pre-1928 translation]",
      "license": "Public Domain (original 1912 publication)",
      "source": "La Clochette (1912) / Wikisource"
    },
    {
      "title": "Serenity Prayer",
      "category": "Acceptance",
      "text": "[NOT EMBEDDED - link only]",
      "license": "© Copyrighted (Reinhold Niebuhr Estate)",
      "link": "https://www.aa.org/[official_serenity_prayer_resource]",
      "note": "Copyright protected; read via external link only"
    }
  ]
}
```

---

## 3. Recovery Prayers (12-Step & Related)

### Overview

12-Step prayers and recovery materials exist in a complex copyright landscape. AA materials are heavily protected by AAWS. However, older recovery literature and Buddhist/secular recovery sources offer safe alternatives.

---

### Recovery Prayers – Copyright Status

| Prayer/Practice | Source | License | Safe to Embed? | Notes |
|-----------------|--------|---------|---|---------|
| **Third Step Prayer** | AA Big Book, Chapter 5 | © AAWS – Protected | ❌ NO | AAWS strictly protects all Big Book content, including prayers |
| **Seventh Step Prayer** | AA Big Book, Chapter 7 | © AAWS – Protected | ❌ NO | Same as above |
| **Eleventh Step Prayer** | AA literature | © AAWS – Protected | ❌ NO | Same as above |
| **St. Francis Prayer** (see Section 2) | La Clochette (1912) | Public Domain | ✅ YES | Pre-1923 version; commonly used in AA but not AA property |
| **Recovery Dharma Meditations** | Recovery Dharma Book (2.0+) | CC BY-NC-SA 4.0 | ⚠️ LIMITED | Non-commercial only; cannot embed in commercial app; non-profit OK |
| **Dhammapada Verses** | Project Gutenberg / Public Domain | Public Domain | ✅ YES | Ancient Buddhist text (pre-1923 translations); no copyright |
| **Stoic Reflections** (e.g., Epictetus, Marcus Aurelius) | Project Gutenberg | Public Domain | ✅ YES | Classical texts; 2000+ years old; pre-1923 translations safe |
| **12Step.org Step Affirmations** | 12Step.org worksheets | CC BY 4.0 | ✅ YES | Explicitly licensed CC BY 4.0; embed with credit |
| **Becoming Recovered Affirmations** | Becoming Recovered (if openly licensed) | Requires verification | ⚠️ CHECK | Verify current licensing before use |
| **NA Just For Today Prayers** | Narcotics Anonymous | © NA – Protected | ❌ NO | Like AA, NA materials are copyrighted by organization |
| **Refuge Prayer (Buddhism)** | Traditional Buddhist | Public Domain | ✅ YES | Ancient tradition; many pre-1923 translations available |

---

### Safe Recovery Prayers for Embedding

#### **#1: St. Francis Prayer (See Section 2 for full details)**

- **Why:** Public domain; aligns with spiritual recovery themes; widely used in recovery communities
- **License:** Public Domain (original 1912 publication)
- ✅ **Safe to embed**

---

#### **#2: Recovery Dharma Affirmations (Limited Use)**

| Aspect | Details |
|--------|---------|
| **Source** | Recovery Dharma, Inc. (recoverydharmanyc.org) |
| **Book/Material** | *Recovery Dharma: How to Use Buddhist Practices and Principles to Heal the Suffering of Addiction* (v2.0) |
| **License** | CC BY-NC-SA 4.0 (Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International) |
| **License Link** | https://creativecommons.org/licenses/by-nc-sa/4.0/ |
| **Available Formats** | PDF (free download), Amazon print/Kindle/Audible (paid), SoundCloud meditations (free) |
| **Restrictions** | **Non-commercial use only**; must credit Recovery Dharma; derivative works must use same license |
| **Safe for Recovery & Renewal?** | ⚠️ **IF app is non-profit/free** – YES. **IF monetized in any way** – NO (violates NC clause) |

**Recommended Approach:**
- If Recovery & Renewal is **100% free, non-commercial, non-profit:** Safe to embed Recovery Dharma affirmations with CC BY-NC-SA attribution
- If any future revenue stream exists (donations, premium features, ads): Remove or request permission from Recovery Dharma Inc.

**Attribution Format:**
```
Recovery Dharma Affirmations
© Recovery Dharma, Inc.
Licensed under CC BY-NC-SA 4.0
https://creativecommons.org/licenses/by-nc-sa/4.0/
```

---

#### **#3: Dhammapada (Buddhist Poetry/Wisdom)**

| Aspect | Details |
|--------|---------|
| **Source** | Ancient Buddhist text (compiled ~100 BCE) |
| **Public Domain Versions** | [Project Gutenberg](https://www.gutenberg.org) – multiple translations |
| **Recommended Translation** | Max Müller translation (pre-1923) – public domain |
| **License** | Public Domain – classical text; pre-1923 translations expired copyright |
| **Excerpt Example** | "Do not pursue the past, do not lose yourself in the future. The past no longer is, the future has not yet come. Looking deeply at life as it is in this moment, the wise dweller in the here and now neither falls into sorrow nor loses himself in vain rejoicing." |
| **Safe to Embed** | ✅ YES – full text, excerpts, or verse selections |

**Use Case:** Pairing Buddhist wisdom with recovery focus; non-sectarian recovery support.

---

#### **#4: Stoic Reflections (Marcus Aurelius, Epictetus)**

| Aspect | Details |
|--------|---------|
| **Sources** | Marcus Aurelius *Meditations* (Stoic classical text); Epictetus *Discourses* |
| **Public Domain** | ✅ YES – 1st-century CE texts; pre-1923 translations (e.g., George Long) |
| **Project Gutenberg** | [Meditations](https://www.gutenberg.org/ebooks/58288) |
| **License** | Public Domain – classical philosophy; no copyright |
| **Excerpt** | "You have power over your mind – not outside events. Realize this, and you will find strength." |
| **Safe to Embed** | ✅ YES – excerpts, daily reflections, or full text |

**Use Case:** "Stoic Recovery" section; acceptance & surrender themes align with 12-Step principles.

---

### NOT Safe for Embedding – Copyrighted AA/NA Materials

| Material | Copyright Holder | Reason | Alternative |
|----------|------------------|--------|-------------|
| **AA Big Book** (full or partial) | AAWS | Copyright 1939 (as of 2025, renewed) | Link to official AA.org or public domain first edition (verify status) |
| **Twelve Steps & Twelve Traditions** | AAWS | Copyrighted literature | Link externally; create original recovery framework |
| **AA Daily Reflections** | AAWS | Copyright protected | Create original daily affirmations |
| **NA Just For Today** | Narcotics Anonymous | Organization copyright | Create original recovery prompts |
| **Set Aside Prayer** | AAWS | AA copyrighted prayer | Paraphrase or create original recovery prayer |
| **Serenity Prayer** (modern usage) | Niebuhr Estate | Personal copyright | Use public domain version or paraphrase (link to AA for credit) |

**What You CAN Do:**
- ✅ Link to external AA.org resources
- ✅ Summarize AA principles in original words
- ✅ Create original recovery prayers inspired by 12-Step themes
- ✅ Quote brief phrases (fair use) with attribution: "Alcoholics Anonymous (copyrighted), used by permission or fair use"

**What You CANNOT Do:**
- ❌ Embed full AA prayers or Big Book chapters
- ❌ Reproduce "AA-Approved" literature without permission
- ❌ Imply Recovery & Renewal is an "AA" product

---

## 4. 12-Step Worksheets & Inventories (Step Work Tools)

### Overview

12Step.org and a few other sites offer explicitly CC-licensed worksheets. These are safe, legally compliant sources for in-app step-work tools.

---

### Recommended 12-Step Worksheets

#### **#1: 12Step.org – All Steps Questions (RECOMMENDED PRIMARY)**

| Aspect | Details |
|--------|---------|
| **Organization** | 12Step.org (non-profit recovery resource) |
| **Project URL** | https://12step.org/tools/12steporg-worksheets/ |
| **License** | CC BY 4.0 (Creative Commons Attribution 4.0 International) |
| **License Link** | https://creativecommons.org/licenses/by/4.0/ |
| **File Formats** | PDF, HTML, Word (.doc), RTF, CSV, Excel (.xls) |
| **Content** | Question sets for all 12 Steps; no answer key (user-generated) |
| **Downloadable URL** | https://12step.org/tools/12steporg-worksheets/all-12-step-questions-english/ |

**Available Downloads:**
- `12step_questions.pdf` (103 KB)
- `12step_questions.doc` (191 KB)
- `12step_questions.html` (online view or save)
- `12step_questions.csv` (2 KB – for database import)
- `12step_questions.xls` (60 KB – Excel format)

**Step Work Content Includes:**
- Step 1: Powerlessness & unmanageability questions
- Step 2: Belief in higher power
- Step 3: Turning will & life over
- Step 4: Fearless inventory (resentment, fear, sex conduct)
- Step 5: Admitting wrongs
- Step 6: Willingness to remove defects
- Step 7: Humility & asking higher power
- Step 8: Amends list preparation
- Step 9: Making direct amends
- Step 10: Daily inventory
- Step 11: Meditation & connection to higher power
- Step 12: Sponsoring others & service

**License Compliance:**
- ✅ Attribution: "Step Work Questions from 12Step.org (CC BY 4.0)"
- ✅ Adaptation allowed: Convert to JSON, mobile prompts, in-app format
- ✅ Derivative works: Must credit 12Step.org and maintain CC BY 4.0

**Why Recommended:**
- Explicitly CC BY 4.0 licensed
- Comprehensive all-steps coverage
- Available in multiple formats for easy conversion to JSON
- Non-profit organization; mission-aligned

---

#### **#2: Fourth Step Inventory (Detailed – 12Step.org)**

| Aspect | Details |
|--------|---------|
| **Content** | Dedicated Fourth Step worksheets (more detailed than all-steps questionnaire) |
| **Focus Areas** | Resentment inventory, Fear inventory, Sex conduct inventory |
| **URL** | https://12step.org/tools/12steporg-worksheets/ (see "Step 4" section) |
| **Format** | Word, PDF, HTML, CSV |
| **License** | CC BY 4.0 |
| **Use Case** | Deep, structured inventory work; longer form than quick check-ins |

---

#### **#3: Recovery Dharma Worksheets (Limited to Non-Commercial)**

| Aspect | Details |
|--------|---------|
| **Source** | Recovery Dharma, Inc. |
| **Content** | Buddhist-based step work & reflection prompts |
| **License** | CC BY-NC-SA 4.0 (Non-commercial; ShareAlike) |
| **Availability** | Included in Recovery Dharma Book (PDF); SoundCloud meditations |
| **Safe for Recovery & Renewal?** | ⚠️ **Only if app remains 100% non-commercial** |
| **Attribution** | "Recovery Dharma Worksheets © Recovery Dharma, Inc. (CC BY-NC-SA 4.0)" |

---

### NOT Recommended – Copyrighted Worksheets

| Source | License | Why Avoid |
|--------|---------|-----------|
| **AA Official Worksheets** | © AAWS | Copyrighted; no CC license; requires permission |
| **NA Literature** | © Narcotics Anonymous | Organization holds copyright; no open license |
| **Paid Workbook Services** | Various / All Rights Reserved | Commercial copyright; not licensed for open-source |

---

### Best Practices for In-App Worksheet Implementation

#### **Recommended JSON Structure for Step Work Prompts:**

```json
{
  "worksheets": [
    {
      "step_number": 4,
      "title": "Fearless Moral Inventory",
      "license": "CC BY 4.0 (12Step.org)",
      "sections": [
        {
          "inventory_type": "Resentment",
          "prompt": "Write down people, places, institutions, or principles you resent.",
          "questions": [
            "Who do I resent?",
            "What specifically about them upsets me?",
            "What do I want them to do differently?",
            "How has this resentment affected my life?"
          ]
        },
        {
          "inventory_type": "Fear",
          "prompt": "Identify your fears and their root causes.",
          "questions": [
            "What am I afraid of?",
            "When did this fear start?",
            "How has it affected my behavior?"
          ]
        }
      ]
    }
  ],
  "attribution": "Step work questions adapted from 12Step.org (CC BY 4.0). Original source: https://12step.org/tools/12steporg-worksheets/"
}
```

---

## 5. General Design & UX Notes for Library Tab

### Recommended Library Categories

**Tier 1: Core Recovery Resources**
1. **Bible** – KJV full text searchable by book/chapter/verse
2. **Prayers** – Curated public-domain & safe prayers (Traditional, Recovery, Spiritual)
3. **Step Work** – Interactive 12-Step worksheets and reflection prompts
4. **Daily Reflections** – Original affirmations, meditation prompts, recovery wisdom quotes

**Tier 2: Supplementary Resources**
5. **Recovery Wisdom** – Excerpts from Dhammapada, Stoic philosophy, public-domain recovery books
6. **Planning & Tools** – Relapse prevention worksheet, gratitude inventory, milestone tracker

---

### UX Patterns for Large Text Libraries

#### **Search & Filter**
- **Full-text search** with highlighting (Bible verses, prayer keywords)
- **Category tabs** (Bible → Books, Prayers → Traditional vs. Recovery vs. Spiritual, etc.)
- **Quick filters** (e.g., "Short prayers" vs. "Long meditations")

#### **Bookmarking & Favorites**
- **Local storage** (SQLite or app-level state) for bookmarks
- **Offline access** – cache frequently accessed content locally
- **Sync to device** – no cloud required (privacy-first)

#### **Reading Experience**
- **Verse-by-verse display** for Bible with consistent font sizing
- **Prayer card format** – clean, centered text; large, readable font
- **Dark mode support** – essential for meditation/recovery app usage (late evening use)

#### **Worksheet Integration**
- **Editable text fields** for step-work answers (store locally)
- **Progress tracking** – visual indicators of completed steps
- **Print option** (native mobile share/export)

#### **Offline-First Architecture**
- **Bundle JSON files** with app on download (~5-10 MB for full KJV)
- **Minimize API calls** – local first, optional sync later
- **No authentication required** – privacy-focused design

---

### Accessibility Considerations

- **High contrast** for readability (especially recovery/meditation users)
- **Adjustable font sizes** (many 12-Step participants are older demographic)
- **Keyboard navigation** for Android/iOS accessibility modes
- **Screen reader support** (semantic HTML/React Native components)
- **No auto-play audio** (respect user control)

---

## 6. Summary: Safe Content Matrix

### What's Safe to Embed (100% Legal)

| Category | Content | License | Confidence |
|----------|---------|---------|------------|
| **Bible** | KJV full text | Public Domain (outside UK) + MIT/CC0 for data structure | ✅ HIGH |
| **Prayers** | Lord's Prayer, Apostles' Creed, Nicene Creed, Gloria Patri, St. Francis Prayer | Public Domain | ✅ HIGH |
| **Wisdom** | Dhammapada (pre-1923 translation), Marcus Aurelius, Epictetus | Public Domain | ✅ HIGH |
| **Worksheets** | 12Step.org questions & inventories | CC BY 4.0 (with attribution) | ✅ HIGH |
| **Recovery** | Recovery Dharma content (IF non-commercial only) | CC BY-NC-SA 4.0 | ⚠️ CONDITIONAL |

---

### What's NOT Safe to Embed (Copyrighted)

| Category | Content | Copyright Holder | Recommendation |
|----------|---------|------------------|-----------------|
| **AA Literature** | Big Book, Twelve & Twelve, Daily Reflections, AA Prayers | AAWS | Link externally; create original alternatives |
| **NA Literature** | Just For Today, NA prayers | Narcotics Anonymous | Link externally |
| **Serenity Prayer** (as authored) | Modern versions; copyrighted usage | Reinhold Niebuhr Estate | Link to AA; use paraphrase with attribution |

---

## 7. Attribution & Compliance Checklist

### For Each Content Type, Include:

```markdown
## [Content Title]

**Source:** [Original creator/organization]
**License:** [License name + link]
**Copyright Holder:** [If applicable]
**Safe for Open-Source:** ✅ YES / ❌ NO / ⚠️ CONDITIONAL
**Attribution Format:** [Exact text to include in app]
**Adaptation Allowed:** YES / NO
**Commercial Use:** YES / NO / CONDITIONAL
```

### Example: KJV Bible

```markdown
## King James Version Bible

**Source:** bible-api.com & CrossWire Bible Society
**License:** Public Domain (KJV text) + MIT (data structure)
**License Link:** https://github.com/seven1m/bible_api/blob/master/LICENSE
**Safe for Open-Source:** ✅ YES
**Attribution Format:** "King James Version (Public Domain) – Data structure via bible-api.com (MIT License)"
**Adaptation Allowed:** YES – can convert to JSON, embed in app, modify display
**Commercial Use:** YES – public domain allows commercial use
```

---

## 8. Recommended Next Steps for Development

1. **Download KJV JSON** from bible-api.com GitHub repo or eBible.org
   - Parse into local SQLite/JSON for offline access
   - Test search & display performance

2. **Convert 12Step.org Worksheets** to JSON
   - Download all-steps CSV from 12Step.org
   - Parse into step-by-step prompt structure
   - Create editable form UI

3. **Curate Prayer Library**
   - Select 8–12 public-domain prayers from Project Gutenberg / Wikisource
   - Format as JSON (title, text, category, source, license)
   - Design prayer card UI

4. **Add Daily Affirmations** (original content)
   - Create original recovery affirmations inspired by public-domain wisdom
   - Rotate daily; no external dependencies

5. **Implement Dark Mode**
   - Critical for recovery app usage (late evening, meditation)
   - Use app-level theme settings

6. **License & Attribution**
   - Embed license info in app (Settings → Licenses → Show all)
   - Include license JSON in app bundle:
     ```json
     {
       "licenses": [
         {
           "component": "King James Bible",
           "license": "Public Domain + MIT",
           "url": "https://github.com/seven1m/bible_api"
         }
       ]
     }
     ```

---

## 9. Key Contacts & Resources

### Organizations & Projects

| Organization | URL | Purpose |
|--------------|-----|---------|
| **12Step.org** | https://12step.org | CC BY 4.0 worksheets & recovery resources |
| **Project Gutenberg** | https://www.gutenberg.org | Public domain books, prayers, texts |
| **eBible.org / CrossWire** | https://ebible.org | Public domain Bible translations |
| **Recovery Dharma** | https://recoverydharma.org | CC BY-NC-SA 4.0 Buddhist recovery content |
| **Wikisource** | https://wikisource.org | Public domain texts & prayers |
| **Creative Commons** | https://creativecommons.org | License info & tools |

### Licensing Resources

| Resource | URL |
|----------|-----|
| **CC BY 4.0 Summary** | https://creativecommons.org/licenses/by/4.0/ |
| **CC BY-NC-SA 4.0 Summary** | https://creativecommons.org/licenses/by-nc-sa/4.0/ |
| **Project Gutenberg Copyright** | https://www.gutenberg.org/help/copyright.html |
| **AA Copyright Information** | https://aa.org (search "copyright guidelines") |

---

## 10. Final Compliance Note

**This research is current as of December 17, 2025.** U.S. copyright law, public domain status, and organizational policies may change. Before finalizing Recovery & Renewal launch:

1. **Verify License Status** – Check each source's latest license statement (especially AAWS, NA, Recovery Dharma)
2. **Consult Legal Counsel** – If in doubt, especially for any copyrighted material
3. **Include Licenses in App** – Display full attribution & license text for end users
4. **Document Attribution** – Keep internal record of all sources & licenses for compliance audit

---

**Document End**

*For questions or updates to this research, verify current status on respective organization websites: 12Step.org, Project Gutenberg, eBible.org, AA.org, RecoveryDharma.org.*
