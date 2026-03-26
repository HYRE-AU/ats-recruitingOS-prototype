import type { SuggestedMatch } from '@/types'

export const mockSuggestedMatches: SuggestedMatch[] = [
  // ── Acme AI — Applied AI Researcher (role_001) ────────────────────
  {
    id: 'sug_001',
    candidateId: 'cand_001',
    roleId: 'role_001',
    rationale: 'PhD in NLP from Stanford, 6 years applied ML at Meta, published at NeurIPS. Strong RAG and evaluation interest aligns perfectly.',
    score: 92,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_002',
    candidateId: 'cand_003',
    roleId: 'role_001',
    rationale: 'DeepMind research scientist with NeurIPS/ICML publications. Exceptional research credentials, wants applied work with product impact.',
    score: 95,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_003',
    candidateId: 'cand_012',
    roleId: 'role_001',
    rationale: 'OpenAI ML Research Engineer working on LLM evaluation. Perfect skill match but not available for 3 months.',
    score: 88,
    confidence: 'strong',
    status: 'suggested', // future candidate
  },

  // ── Acme AI — Product Designer (role_002) ─────────────────────────
  {
    id: 'sug_004',
    candidateId: 'cand_004',
    roleId: 'role_002',
    rationale: '7 years design at Figma on developer tools. Wants founding designer role at AI company. Near-perfect match.',
    score: 90,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_005',
    candidateId: 'cand_008',
    roleId: 'role_002',
    rationale: 'UX Designer from Notion with strong IA skills. Role is more visual/interaction design — moderate fit.',
    score: 65,
    confidence: 'moderate',
    status: 'discussed',
  },
  {
    id: 'sug_006',
    candidateId: 'cand_015',
    roleId: 'role_002',
    rationale: 'Linear product designer with developer tools DNA. Beautiful portfolio. Not actively looking — future candidate.',
    score: 85,
    confidence: 'strong',
    status: 'suggested',
  },

  // ── Northstar Health — Product Engineer (role_003) ────────────────
  {
    id: 'sug_007',
    candidateId: 'cand_002',
    roleId: 'role_003',
    rationale: 'Full-stack from Stripe with strong product instincts. NYC-based, healthcare-interested. Excellent fit.',
    score: 88,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_008',
    candidateId: 'cand_005',
    roleId: 'role_003',
    rationale: 'Staff SWE at Datadog. Strong technically but more infrastructure-focused than product. Moderate fit.',
    score: 60,
    confidence: 'moderate',
    status: 'dismissed',
  },
  {
    id: 'sug_009',
    candidateId: 'cand_010',
    roleId: 'role_003',
    rationale: 'Backend engineer from Shopify. Good technical skills but wants infrastructure, not product engineering.',
    score: 55,
    confidence: 'speculative',
    status: 'suggested',
  },

  // ── Northstar Health — Customer Success Lead (role_004) ───────────
  {
    id: 'sug_010',
    candidateId: 'cand_016',
    roleId: 'role_004',
    rationale: 'CS Manager at Lattice. Enterprise SaaS experience, expressed strong healthcare tech interest. Meeting scheduled.',
    score: 78,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_011',
    candidateId: 'cand_009',
    roleId: 'role_004',
    rationale: 'RevOps at Amplitude. Different function but strong client management skills. Speculative match.',
    score: 45,
    confidence: 'speculative',
    status: 'dismissed',
  },

  // ── LatticeFlow — Staff ML Engineer (role_005) ────────────────────
  {
    id: 'sug_012',
    candidateId: 'cand_006',
    roleId: 'role_005',
    rationale: 'ML Platform Engineer at Spotify. Feature stores and model serving expertise. Greenfield ML infra is exactly what he wants.',
    score: 93,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_013',
    candidateId: 'cand_001',
    roleId: 'role_005',
    rationale: 'Strong ML background from Meta. More research-focused but has infrastructure knowledge. Interested in ML systems roles.',
    score: 72,
    confidence: 'moderate',
    status: 'converted', // submitted (to this role)
  },
  {
    id: 'sug_014',
    candidateId: 'cand_011',
    roleId: 'role_005',
    rationale: 'Data Engineer at Databricks. Spark/Airflow expert, wants ML intersection. Close but more data-eng than ML-infra.',
    score: 68,
    confidence: 'moderate',
    status: 'suggested',
  },

  // ── LatticeFlow — Backend Engineer (role_006) ─────────────────────
  {
    id: 'sug_015',
    candidateId: 'cand_005',
    roleId: 'role_006',
    rationale: 'Staff SWE at Datadog, Go expert, distributed systems. Perfect for event-driven backend work.',
    score: 91,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_016',
    candidateId: 'cand_010',
    roleId: 'role_006',
    rationale: 'Backend at Shopify, Go + Ruby. Wants infrastructure focus. Good technical match.',
    score: 75,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_017',
    candidateId: 'cand_014',
    roleId: 'role_006',
    rationale: 'Platform Engineer at HashiCorp, Go + infrastructure. Not available for 6 weeks but strong match.',
    score: 80,
    confidence: 'strong',
    status: 'suggested', // future candidate
  },

  // ── Vanta Labs — GTM Operator (role_007) ──────────────────────────
  {
    id: 'sug_018',
    candidateId: 'cand_009',
    roleId: 'role_007',
    rationale: 'RevOps at Amplitude. Strong Salesforce + analytics. More revenue-ops than marketing-ops but transferable.',
    score: 70,
    confidence: 'moderate',
    status: 'discussed',
  },
  {
    id: 'sug_019',
    candidateId: 'cand_017',
    roleId: 'role_007',
    rationale: 'Marketing Ops at Segment. HubSpot + SQL + analytics. Meeting scheduled — strong potential match.',
    score: 82,
    confidence: 'strong',
    status: 'suggested',
  },

  // ── Vanta Labs — Founding Recruiter (role_008) ────────────────────
  {
    id: 'sug_020',
    candidateId: 'cand_018',
    roleId: 'role_008',
    rationale: 'Senior Technical Recruiter at Coinbase. Full-cycle, startup-interested, wants founding role. Meeting scheduled.',
    score: 85,
    confidence: 'strong',
    status: 'suggested',
  },
  {
    id: 'sug_021',
    candidateId: 'cand_020',
    roleId: 'role_008',
    rationale: 'TA Partner at Netflix. Hiring strategy experience, wants to build recruiting function. Meeting scheduled.',
    score: 80,
    confidence: 'strong',
    status: 'suggested',
  },

  // ── Novera — Product Engineer (role_009) ──────────────────────────
  {
    id: 'sug_022',
    candidateId: 'cand_007',
    roleId: 'role_009',
    rationale: 'Product Engineer at Canva, Sydney-based. React Native + TypeScript, wants fintech exposure. Perfect location + skill match.',
    score: 89,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_023',
    candidateId: 'cand_002',
    roleId: 'role_009',
    rationale: 'Full-stack from Stripe with payments experience. Strong fit but based in NYC, role is Sydney.',
    score: 70,
    confidence: 'moderate',
    status: 'discussed',
  },
  {
    id: 'sug_024',
    candidateId: 'cand_013',
    roleId: 'role_009',
    rationale: 'Senior Frontend at Atlassian, Sydney. React + TypeScript expert. Not available for 3 months (RSU vest).',
    score: 83,
    confidence: 'strong',
    status: 'suggested', // future candidate
  },

  // ── Cinder — Founding Engineer (role_011) ─────────────────────────
  {
    id: 'sug_025',
    candidateId: 'cand_005',
    roleId: 'role_011',
    rationale: 'Staff SWE at Datadog, TypeScript + infrastructure. Wants founding role, open-source contributor. Excellent match.',
    score: 90,
    confidence: 'strong',
    status: 'converted', // submitted
  },
  {
    id: 'sug_026',
    candidateId: 'cand_006',
    roleId: 'role_011',
    rationale: 'ML Platform at Spotify. Strong infra skills but more ML-focused. Moderate fit for general founding engineer.',
    score: 65,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_027',
    candidateId: 'cand_014',
    roleId: 'role_011',
    rationale: 'Platform Engineer at HashiCorp. Go, Kubernetes, Terraform. Strong infrastructure fit. Not available for 6 weeks.',
    score: 86,
    confidence: 'strong',
    status: 'suggested', // future candidate
  },

  // ── Additional suggestions for meeting_scheduled candidates ───────

  // Olivia Tran (cand_016) — 4 total suggestions (CS Lead + 3 more)
  {
    id: 'sug_028',
    candidateId: 'cand_016',
    roleId: 'role_007',
    rationale: 'Strong client management skills from Lattice CS role. GTM Operator at Vanta Labs has significant client-facing component.',
    score: 55,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_029',
    candidateId: 'cand_016',
    roleId: 'role_003',
    rationale: 'Healthcare tech interest aligns with Northstar Health. Product Engineer is technical but CS experience brings product sense.',
    score: 40,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_030',
    candidateId: 'cand_016',
    roleId: 'role_009',
    rationale: 'Novera Product Engineer — speculative match. Consumer fintech with strong UX needs could benefit from CS perspective.',
    score: 35,
    confidence: 'speculative',
    status: 'suggested',
  },

  // Sam Adeyemi (cand_017) — 6 total suggestions (GTM Operator + 5 more)
  {
    id: 'sug_031',
    candidateId: 'cand_017',
    roleId: 'role_008',
    rationale: 'Marketing ops background at Segment relevant to Founding Recruiter — understands hiring funnels and tooling.',
    score: 48,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_032',
    candidateId: 'cand_017',
    roleId: 'role_004',
    rationale: 'Customer Success Lead at Northstar — marketing ops skills transfer to client management and adoption metrics.',
    score: 52,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_033',
    candidateId: 'cand_017',
    roleId: 'role_002',
    rationale: 'Product Designer at Acme AI — very speculative. Marketing ops to design is a stretch, but data-driven mindset overlaps.',
    score: 25,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_034',
    candidateId: 'cand_017',
    roleId: 'role_011',
    rationale: 'Founding Engineer at Cinder — speculative. Strong technical ops background but not an engineer.',
    score: 30,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_035',
    candidateId: 'cand_017',
    roleId: 'role_006',
    rationale: 'Backend Engineer at LatticeFlow — speculative cross-functional match. SQL skills relevant but primarily ops.',
    score: 28,
    confidence: 'speculative',
    status: 'suggested',
  },

  // Jamie Foster (cand_018) — 3 total suggestions (Founding Recruiter + 2 more)
  {
    id: 'sug_036',
    candidateId: 'cand_018',
    roleId: 'role_007',
    rationale: 'GTM Operator at Vanta Labs — recruiting ops and GTM ops overlap in tooling and pipeline management.',
    score: 58,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_037',
    candidateId: 'cand_018',
    roleId: 'role_004',
    rationale: 'Customer Success Lead at Northstar — relationship-building skills from recruiting transfer to client management.',
    score: 42,
    confidence: 'speculative',
    status: 'suggested',
  },

  // Mika Tanaka (cand_020) — 5 total suggestions (Founding Recruiter + 4 more)
  {
    id: 'sug_038',
    candidateId: 'cand_020',
    roleId: 'role_007',
    rationale: 'GTM Operator at Vanta Labs — Netflix TA experience includes employer branding and marketing which maps to GTM.',
    score: 55,
    confidence: 'moderate',
    status: 'suggested',
  },
  {
    id: 'sug_039',
    candidateId: 'cand_020',
    roleId: 'role_004',
    rationale: 'Customer Success Lead at Northstar Health — talent acquisition is fundamentally relationship management.',
    score: 45,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_040',
    candidateId: 'cand_020',
    roleId: 'role_002',
    rationale: 'Product Designer at Acme AI — very speculative. Employer brand design experience is tangentially relevant.',
    score: 20,
    confidence: 'speculative',
    status: 'suggested',
  },
  {
    id: 'sug_041',
    candidateId: 'cand_020',
    roleId: 'role_009',
    rationale: 'Product Engineer at Novera — speculative. No direct engineering fit but could inform product from TA perspective.',
    score: 18,
    confidence: 'speculative',
    status: 'suggested',
  },
]
