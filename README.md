# Legal Aid (Team Solvity)

> **Hackathon Domain:** API Integration  
> **Problem Statement:** Legal: Streamlining Court Document Review & Organization

**Legal Aid** is an API-first legal accessibility platform that transforms dense, disorganized court orders, notices, and judgments into plain English summaries, structured statutory breakdowns, and predictive precedent insights for citizens and advocates.

---

## Key Features

1. **Court Document Review & Structuring**  
   - Converts raw court orders & PDF notices into structured timelines, operative rulings, and key facts.  
   - Quantified via an **NLP Readability Benchmark** (reducing cognitive complexity from Grade 18+ legal jargon to Grade 6–8 citizen English, a **↓65% complexity drop**).

2. **Statutory Acts Intelligence (Imposed vs. Counter-Remedies)**  
   - **Acts Imposed Against You:** Identifies statutory sections, invoking authorities, penalties, and procedural flaws to challenge.  
   - **Acts You Can Impose:** Highlights counter-shields (Article 226 Writs, statutory compounding under Section 53(3), Order 39 CPC Injunctions).

3. **Semantic Precedent Search (Machine Learning)**  
   - Uses **Hugging Face Sentence-Transformers (`all-MiniLM-L6-v2`)** to generate 384-dimensional dense vector embeddings.  
   - Computes mathematical **Cosine Similarity** to match colloquial citizen queries with binding Supreme Court & High Court rulings with ~98% semantic relevance.

4. **Predictive Case Outcome & Stay Classifier**  
   - Regularized logistic classifier trained on procedural due process defects (notice compression, denial of *Audi Alteram Partem* personal hearings).  
   - Generates an instant **Ad-Interim Stay Probability score** with real-time feature attribution weights.

---

## API Architecture

| Endpoint | Method | Purpose | Input / Payload |
|---|---|---|---|
| `/api/process` | `POST` | Multi-modal OCR & document parsing into structured JSON schemas | `FormData (file)` |
| `/api/acts` | `POST` | Extracts statutory sections imposed vs. constitutional/counter remedies | `{ summary, documentText }` |
| `/api/precedents` | `POST`, `GET` | Semantic case law retrieval across High Courts & Supreme Court | `{ query, court, yearFrom }` |
| `/api/ml/predict` | `POST` | Predicts stay likelihood & calculates procedural feature weights | `{ noticePeriodGivenDays, wasHearingGranted, ... }` |
| `/api/ml/embeddings` | `POST` | Generates 384-d dense embeddings & computes vector cosine similarity | `{ query, targetTexts }` |

---

## Tech Stack

- **Frontend & App:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS
- **APIs & Backend:** Next.js Route Handlers, Google GenAI SDK (`@google/genai`), Hugging Face Inference REST API
- **Machine Learning & NLP:** Sentence-Transformers, Scikit-learn, Flesch-Kincaid NLP Readability
- **PDF Extraction:** `unpdf`

---

## Quick Start

### 1. Install & Run Web Application
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Standalone Python ML Script (Demo)
```bash
python3 ml_service/predictor.py
```

---

## Routes

- `/` — Product Landing Page
- `/analyze` — Document Upload & Processing
- `/analyze/result` — Interactive Legal Report Dashboard & Acts Breakdown
- `/precedents` — Precedent Search & Interactive ML Stay Predictor
