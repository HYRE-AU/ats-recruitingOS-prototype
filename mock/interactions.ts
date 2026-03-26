import type { Interaction } from '@/types'

export const mockInteractions: Interaction[] = [
  // ── Elena Vasquez (cand_001) — Rich history ───────────────────────
  {
    id: 'int_001',
    candidateId: 'cand_001',
    type: 'ai_email',
    title: 'Initial Outreach — Applied AI Researcher @ Acme AI',
    summary: 'AI-generated outreach about Acme AI research role. Elena responded within 2 hours expressing strong interest.',
    body: `From: SmartLeads AI <outreach@perfectly.ai>
To: elena.vasquez@gmail.com
Subject: Research-focused ML role at Acme AI

Hi Elena,

I came across your work on recommendation systems at Meta — particularly your contributions to the personalization team. I wanted to reach out about a role that might align with what you're looking for.

Acme AI is building an applied research team focused on LLM-powered products. They're looking for someone to lead work on RAG, fine-tuning, and evaluation frameworks. Given your NLP background and applied ML experience, this could be a great fit.

Would you be open to a quick chat?

---

From: elena.vasquez@gmail.com
Re: Research-focused ML role at Acme AI

Hi, thanks for reaching out. This actually sounds really interesting — I've been thinking about moving to a smaller company where I can do more research-oriented work. The RAG and evaluation focus is right up my alley.

I'd love to learn more. What does the interview process look like?

---

From: SmartLeads AI
Re: Re: Research-focused ML role at Acme AI

Great to hear! The process is: recruiter screen → technical deep-dive → research presentation → team fit → offer. Here's a link to book a screen with our recruiter Shenny: [Calendly Link]

---

From: elena.vasquez@gmail.com
Re: Re: Re: Research-focused ML role at Acme AI

Booked for Thursday at 3pm. Looking forward to it.`,
    occurredAt: '2026-02-15T09:30:00Z',
  },
  {
    id: 'int_002',
    candidateId: 'cand_001',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong screen. Elena is highly qualified, clear about wanting applied research with product impact. Good culture fit. Interested in both Acme AI and LatticeFlow ML roles.',
    body: `## Key Takeaways
- Currently at Meta on recommendation systems team, 6 years
- PhD from Stanford in NLP (graduated 2020)
- Wants more research freedom and direct product impact
- Very interested in Acme AI role — RAG focus matches her interests perfectly
- Also open to LatticeFlow Staff ML Engineer role
- Comp expectations: $200k-$250k base + meaningful equity
- Timeline: ready to move within 4-6 weeks
- No fully remote — values in-person collaboration

## Strengths
- Deep technical expertise in NLP and recommendation systems
- Clear communicator, articulate about goals
- Published at NeurIPS (2023, 2024)
- Experience shipping ML products at scale

## Concerns
- Comp expectations at higher end for Acme AI range
- May be overqualified for some aspects of the Acme role

## Next Steps
- Submit to Acme AI Applied AI Researcher
- Discuss LatticeFlow Staff ML Engineer role
- Follow up on comp range alignment`,
    occurredAt: '2026-02-20T15:45:00Z',
  },
  {
    id: 'int_003',
    candidateId: 'cand_001',
    type: 'screen_transcript',
    title: 'Recruiter Screen — Full Transcript',
    summary: 'Full 35-minute recruiter screen transcript covering background, interests, and role discussion.',
    body: `[00:00] Shenny: Hi Elena, thanks for making time today. How's your day going?

[00:05] Elena: Great, thanks! I've been looking forward to this chat.

[00:15] Shenny: Awesome. So I'd love to hear a bit about your current situation at Meta and what you're looking for.

[00:25] Elena: Sure. I've been at Meta for about six years now, working on the recommendation systems team. The work is technically interesting but I feel like I'm optimizing within a narrow scope. I want to do more open-ended research that connects directly to a product.

[01:10] Shenny: Makes sense. What drew your attention about the Acme AI role specifically?

[01:20] Elena: A few things. The RAG focus is exactly where I think the most interesting applied ML work is happening right now. And the fact that it's a smaller team means I'd have more ownership over the research direction. I've also been interested in evaluation frameworks — it's an underserved area.

[02:15] Shenny: That's great alignment. Let me ask about your work at Meta — can you tell me about a project you're particularly proud of?

[02:30] Elena: I led the redesign of our content recommendation model. We moved from a collaborative filtering approach to a transformer-based architecture. It was a 6-month project, improved engagement metrics by 12%, and I got to present it at our internal ML summit. I also published a related paper at NeurIPS in 2023.

[04:00] Shenny: Impressive. What about compensation — what range are you targeting?

[04:10] Elena: I'm currently at around $350k total comp at Meta. I understand startups are different, so I'd be looking at $200k-$250k base with meaningful equity. The equity piece matters a lot — I want to feel like an owner.

[05:30] Shenny: That's helpful. Location preferences?

[05:35] Elena: I'm in SF and want to stay. I actually prefer hybrid — I find in-person collaboration really valuable for research work. Fully remote wouldn't work for me.

[06:15] Shenny: Good to know. Any deal-breakers I should know about?

[06:25] Elena: I need to have real research freedom. If it's a "research" title but really just engineering execution, that's not for me. I also want to be able to publish.

[07:00] Shenny: Understood. Let me also mention another role that might interest you — LatticeFlow is looking for a Staff ML Engineer to build ML infrastructure. More on the systems side but connected to ML. Would that interest you?

[07:30] Elena: Interesting — yes, I'd like to hear more about that one too. I enjoy the infrastructure side when it's ML-specific.

[08:00] Shenny: Great, I'll send you details on both. What's your timeline?

[08:10] Elena: I could realistically start a new role in 4-6 weeks. I don't have a long notice period.

[08:30] Shenny: Perfect. I'm going to submit you for the Acme AI role and we'll discuss the LatticeFlow one further. Thanks for a great conversation, Elena.

[08:45] Elena: Thank you, Shenny! Really excited about these opportunities.`,
    occurredAt: '2026-02-20T15:00:00Z',
  },
  {
    id: 'int_004',
    candidateId: 'cand_001',
    type: 'recruiter_note',
    title: 'Post-Screen Notes',
    summary: 'Personal impressions and action items after Elena\'s screen.',
    body: `Elena is one of the strongest candidates I've screened in months. Clear thinker, knows exactly what she wants, and has the credentials to back it up. The NeurIPS publications and Meta experience make her extremely competitive.

Main concern is comp alignment with Acme AI — her expectations are at the top of their range. Worth flagging to Sarah when submitting.

Action items:
- Submit to Acme AI ASAP
- Send LatticeFlow Staff ML role details
- Flag comp expectations to Acme AI contact`,
    occurredAt: '2026-02-20T16:30:00Z',
  },

  // ── Marcus Chen (cand_002) — Rich history ─────────────────────────
  {
    id: 'int_005',
    candidateId: 'cand_002',
    type: 'ai_email',
    title: 'Initial Outreach — Product Engineer roles',
    summary: 'Outreach about product engineering roles. Marcus responded interested in healthcare and fintech opportunities.',
    body: `From: SmartLeads AI <outreach@perfectly.ai>
To: marcus.chen@outlook.com
Subject: Product-focused engineering roles — healthcare & fintech

Hi Marcus,

Your work on Stripe's payment platform caught my eye. I'm reaching out about a couple of product engineering roles that might appeal to you — one at a healthcare startup (Northstar Health) and one at a fintech company (Novera) in Sydney.

Both are looking for engineers who think like product people and can own features end to end.

Interested in learning more?

---

From: marcus.chen@outlook.com
Re: Product-focused engineering roles

Hey, these both sound interesting! I've been wanting to move to a smaller company where I can have more product ownership. The healthcare one especially catches my eye. Happy to chat.`,
    occurredAt: '2026-02-18T11:00:00Z',
  },
  {
    id: 'int_006',
    candidateId: 'cand_002',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Great screen. Marcus is a strong product-minded engineer looking for more ownership. Interested in Northstar Health primarily, Novera secondarily.',
    body: `## Key Takeaways
- 5 years at Stripe, full-stack (React + Node)
- Very product-minded — thinks about user problems first
- Primary interest: Northstar Health Product Engineer role
- Secondary: Novera Product Engineer (intrigued by fintech angle)
- Comp: $170k-$210k base + equity
- Location: NYC, hybrid preferred
- Timeline: 3-4 weeks, no long notice

## Strengths
- Strong technical + product sense combination
- Stripe payments experience (relevant for fintech)
- Excellent communicator, asks great questions
- Startup-ready mentality despite big company background

## Next Steps
- Submit to Northstar Health Product Engineer
- Discuss Novera role further`,
    occurredAt: '2026-02-25T14:30:00Z',
  },
  {
    id: 'int_007',
    candidateId: 'cand_002',
    type: 'recruiter_note',
    title: 'Post-Screen Notes',
    summary: 'Impressions after Marcus\'s screen.',
    body: `Marcus would be a great fit for Northstar Health. Product-minded, technically strong, and genuinely interested in healthcare tech. Submit ASAP.

The Novera role in Sydney is trickier — he's NYC-based and not looking to relocate. But the product + fintech fit is strong. Worth exploring if they'd consider remote.`,
    occurredAt: '2026-02-25T15:00:00Z',
  },

  // ── Aisha Patel (cand_003) — Rich history ─────────────────────────
  {
    id: 'int_008',
    candidateId: 'cand_003',
    type: 'ai_email',
    title: 'Initial Outreach — Applied AI Researcher @ Acme AI',
    summary: 'Outreach about Acme AI research role. Aisha responded with detailed interest and questions.',
    body: `From: SmartLeads AI <outreach@perfectly.ai>
To: aisha.patel@proton.me
Subject: Applied research lead — LLM products @ Acme AI

Hi Aisha,

Your work at DeepMind on reinforcement learning and language models is really impressive. Acme AI is building an applied research team and looking for someone to lead RAG and evaluation work. Your background seems like a strong match.

Would love to chat if you're open to it.

---

From: aisha.patel@proton.me
Re: Applied research lead

This is intriguing. I've been thinking about the applied side — DeepMind is amazing for pure research but I want to see my work in a product. A few questions:
1. How big is the research team currently?
2. What's the publication policy?
3. Who would I report to?

---

From: SmartLeads AI
Re: Re: Applied research lead

Great questions! 1) You'd be joining as the 2nd researcher, reporting to the CTO who has a PhD from Berkeley. 2) They encourage publication — the CTO has published extensively. 3) Team is ~30 people total. Here's a link to book a screen with Shenny: [Calendly]

---

From: aisha.patel@proton.me
Re: Re: Re: Applied research lead

Booked for Wednesday at 4pm. Thanks!`,
    occurredAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'int_009',
    candidateId: 'cand_003',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Exceptional candidate. DeepMind pedigree, published at top venues, wants product impact. Perfect for Acme AI.',
    body: `## Key Takeaways
- 4 years at DeepMind, RL + NLP research
- Published at NeurIPS (2024), ICML (2023, 2025)
- Wants applied research with visible product impact
- Very interested in Acme AI — asked detailed questions
- Comp: $220k-$280k base + significant equity
- Location: Bay Area only (Mountain View currently)
- Timeline: 6-8 weeks (DeepMind notice period)

## Strengths
- World-class research credentials
- Articulate and thoughtful
- Clear about wanting applied work — not just chasing money
- Asked the right questions about research freedom and publication

## Concerns
- Very high comp expectations
- Long notice period (6-8 weeks)
- High bar — may be hard to close

## Next Steps
- Submit to Acme AI immediately — she's a top candidate
- Comp conversation with Sarah at Acme AI before formal submit`,
    occurredAt: '2026-03-05T16:30:00Z',
  },
  {
    id: 'int_010',
    candidateId: 'cand_003',
    type: 'screen_transcript',
    title: 'Recruiter Screen — Full Transcript',
    summary: 'Full 40-minute recruiter screen. Deep discussion of research interests and Acme AI fit.',
    body: `[00:00] Shenny: Hi Aisha, thanks for booking this in. I'm excited to chat.

[00:10] Aisha: Hi Shenny! Me too. I've been reading about Acme AI since your email.

[00:20] Shenny: Great! Tell me about what you're working on at DeepMind and what's driving you to explore.

[00:35] Aisha: I'm on the language team working on reasoning capabilities. It's fascinating research but the gap between what we publish and what ends up in a product is enormous. I want to close that gap — I want to see my research in a user's hands.

[01:30] Shenny: That makes sense. What does "applied research" look like to you ideally?

[01:45] Aisha: Honestly? I want to be close enough to the product that I can prototype and test ideas directly. But I still want the freedom to pursue research questions that aren't immediately useful. The best applied research comes from having slack for exploration.

[02:45] Shenny: The Acme AI role is focused on RAG, evaluation, and fine-tuning. How does that map to your interests?

[03:00] Aisha: Evaluation is something I'm deeply passionate about. I think it's the biggest unsolved problem in applied LLM work. RAG is interesting too — there's a lot of room for novel retrieval approaches. Fine-tuning is more commoditized but still important.

[04:00] Shenny: Comp expectations?

[04:10] Aisha: I'm at about $400k total at DeepMind. For the right role, I'd take $220k-$280k base with strong equity. The equity matters a lot — I need to believe in the upside.

[05:00] Shenny: Timeline for making a move?

[05:10] Aisha: DeepMind has a 6-week notice period. So realistically 6-8 weeks from accepting an offer.

[05:30] Shenny: Any deal-breakers?

[05:40] Aisha: It has to be real research. If it's a "researcher" title doing prompt engineering, that's a no. I also need publication freedom — even if it's delayed for product reasons.

[06:20] Shenny: Understood. I think Acme AI is a really strong fit. I'd like to submit you — thoughts?

[06:30] Aisha: Yes, please do. This is the most interesting opportunity I've seen.`,
    occurredAt: '2026-03-05T16:00:00Z',
  },
  {
    id: 'int_011',
    candidateId: 'cand_003',
    type: 'recruiter_note',
    title: 'Post-Screen Notes',
    summary: 'Aisha is a top-tier candidate. Submit immediately.',
    body: `Aisha is probably the best researcher I've screened this year. The DeepMind pedigree, publications, and clarity of thought are exceptional. She knows exactly what she wants and Acme AI checks every box.

The comp will be a challenge — $220k-$280k base is at the very top of Acme's range. Need to prep Sarah for this conversation.

Priority: submit ASAP. Candidates like Aisha don't stay on the market long.`,
    occurredAt: '2026-03-05T17:00:00Z',
  },

  // ── Jordan Williams (cand_004) ────────────────────────────────────
  {
    id: 'int_012',
    candidateId: 'cand_004',
    type: 'ai_email',
    title: 'Initial Outreach — Product Designer @ Acme AI',
    summary: 'Outreach about design role. Jordan responded interested in being a founding designer.',
    body: `From: SmartLeads AI
To: jordan.w@gmail.com
Subject: Founding Product Designer — AI developer tools

Hi Jordan, your work at Figma on developer-facing features is incredible. Acme AI is looking for their first product designer. Interested?

---

From: jordan.w@gmail.com
Re: Founding Product Designer

Yes! I've been looking for exactly this kind of opportunity. A founding role at an AI company is my dream move. Let's chat.`,
    occurredAt: '2026-03-03T08:00:00Z',
  },
  {
    id: 'int_013',
    candidateId: 'cand_004',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Great designer. Strong portfolio, Figma background, wants founding role. Submitted to Acme AI Product Designer.',
    body: `## Key Takeaways
- 7 years design, last 3 at Figma on developer tools
- Outstanding portfolio — complex workflows made simple
- Wants founding designer role at an AI company
- Comp: $160k-$200k + equity
- Location: LA but flexible, open to remote
- Note: No CV on file yet — need to follow up

## Next Steps
- Submit to Acme AI Product Designer
- Follow up for CV`,
    occurredAt: '2026-03-10T13:30:00Z',
  },

  // ── Tomás Rivera (cand_005) — Rich history ────────────────────────
  {
    id: 'int_014',
    candidateId: 'cand_005',
    type: 'ai_email',
    title: 'Initial Outreach — Infrastructure roles',
    summary: 'Outreach about founding engineer and backend roles. Tomás responded interested in all three.',
    body: `From: SmartLeads AI
To: tomas.rivera@hey.com
Subject: Founding/Staff infrastructure roles — multiple companies

Hi Tomás, your infrastructure work at Datadog is exactly what several of our clients are looking for. I have 3 roles: Backend Engineer at LatticeFlow, Founding Engineer at Cinder, and more. Interested?

---

From: tomas.rivera@hey.com
Yes, all three sound interesting. Let's talk.`,
    occurredAt: '2026-02-24T14:00:00Z',
  },
  {
    id: 'int_015',
    candidateId: 'cand_005',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Excellent infra engineer. 8 years experience, Go + distributed systems. Interested in LatticeFlow and Cinder.',
    body: `## Key Takeaways
- 8 years at Datadog, Staff SWE
- Go, Kubernetes, distributed systems expert
- Open-source contributor (notable Terraform provider)
- Wants founding/staff role at smaller company
- Interested in: LatticeFlow Backend, Cinder Founding Engineer
- Comp: $190k-$240k + significant equity
- Remote strongly preferred
- Timeline: 2-4 weeks

## Next Steps
- Submit to LatticeFlow Backend Engineer
- Submit to Cinder Founding Engineer`,
    occurredAt: '2026-03-02T11:30:00Z',
  },
  {
    id: 'int_016',
    candidateId: 'cand_005',
    type: 'screen_transcript',
    title: 'Recruiter Screen — Full Transcript',
    summary: 'Full 30-minute screen. Strong infrastructure background, clear about wanting smaller company.',
    body: `[00:00] Shenny: Hi Tomás, thanks for jumping on.

[00:05] Tomás: Hey Shenny, happy to be here.

[00:10] Shenny: Tell me about your current work at Datadog.

[00:20] Tomás: I'm on the infrastructure team — specifically working on our observability pipeline. I designed the event ingestion system that handles about 2 million events per second. It's Go, Kafka, and a custom storage layer.

[01:30] Shenny: That's impressive scale. What's driving you to look elsewhere?

[01:40] Tomás: Honestly, I want to build something from scratch again. At Datadog's size, everything is incremental. I miss the zero-to-one feeling. I want to be one of the first 5-10 engineers somewhere.

[02:30] Shenny: I have two roles I think would be great fits. LatticeFlow needs a Backend Engineer — Go, PostgreSQL, event-driven architecture. And Cinder is looking for a Founding Engineer — first hire, build everything.

[02:55] Tomás: Both sound great. Cinder is especially exciting — what's the product?

[03:10] Shenny: Developer tools, YC-backed, TypeScript-focused. The founder is technical.

[03:30] Tomás: I'm in for both. Let's do it.`,
    occurredAt: '2026-03-02T11:00:00Z',
  },

  // ── Kenji Nakamura (cand_006) — Rich history ──────────────────────
  {
    id: 'int_017',
    candidateId: 'cand_006',
    type: 'ai_email',
    title: 'Initial Outreach — Staff ML Engineer @ LatticeFlow',
    summary: 'Outreach about ML platform role. Kenji responded with detailed questions.',
    body: `From: SmartLeads AI
To: kenji.n@gmail.com
Subject: Staff ML Engineer — ML infrastructure from scratch

Hi Kenji, your ML platform work at Spotify (feature stores, model serving) is exactly what LatticeFlow needs. They're building ML infra from scratch. Interested?

---

From: kenji.n@gmail.com
Very interested. What's their current ML stack? And is this remote-friendly?`,
    occurredAt: '2026-02-20T08:00:00Z',
  },
  {
    id: 'int_018',
    candidateId: 'cand_006',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong ML platform engineer. Deep Spotify experience, wants to architect ML systems. Submitted to LatticeFlow.',
    body: `## Key Takeaways
- 6 years at Spotify on ML platform team
- Built their feature store serving layer
- Wants to architect ML systems from scratch
- Very interested in LatticeFlow Staff ML Engineer
- Also interested in Cinder Founding Engineer
- Comp: $200k-$260k + equity
- Remote, Seattle, or SF
- Timeline: 4-6 weeks

## Next Steps
- Submit to LatticeFlow Staff ML Engineer`,
    occurredAt: '2026-02-28T10:30:00Z',
  },
  {
    id: 'int_019',
    candidateId: 'cand_006',
    type: 'recruiter_note',
    title: 'Follow-up Notes',
    summary: 'Kenji is strong but specific about what he wants.',
    body: `Kenji is very capable but specific. He wants greenfield ML infrastructure — not maintaining legacy systems. LatticeFlow is perfect for this. Make sure Maria knows his expectations around autonomy.`,
    occurredAt: '2026-02-28T11:00:00Z',
  },

  // ── Sophie Laurent (cand_007) ─────────────────────────────────────
  {
    id: 'int_020',
    candidateId: 'cand_007',
    type: 'ai_email',
    title: 'Initial Outreach — Product Engineer @ Novera',
    summary: 'Outreach about Novera fintech role in Sydney. Sophie responded interested.',
    body: `From: SmartLeads AI
To: sophie.l@fastmail.com
Subject: Product Engineer — consumer fintech in Sydney

Hi Sophie, your product engineering work at Canva is impressive. Novera is building consumer fintech in Sydney and looking for React Native + TypeScript engineers. Interested?

---

From: sophie.l@fastmail.com
Definitely interested! I've been wanting to explore fintech.`,
    occurredAt: '2026-03-01T06:00:00Z',
  },
  {
    id: 'int_021',
    candidateId: 'cand_007',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Good product engineer, Sydney-based, perfect for Novera. Submitted.',
    body: `## Key Takeaways
- 4 years at Canva, product engineering
- Strong React Native + TypeScript
- Wants fintech exposure, staying in Sydney
- Comp: A$170k-$210k + equity
- Timeline: 3-4 weeks

## Next Steps
- Submit to Novera Product Engineer`,
    occurredAt: '2026-03-08T08:30:00Z',
  },

  // ── Rachel Kim (cand_008) — Active but No Roles ───────────────────
  {
    id: 'int_022',
    candidateId: 'cand_008',
    type: 'ai_email',
    title: 'Initial Outreach — Design roles',
    summary: 'Outreach about design opportunities. Rachel responded interested.',
    body: `From: SmartLeads AI
To: rachel.kim@gmail.com
Subject: UX/Product Design roles at AI startups

Hi Rachel, your Notion work on complex information architecture is exactly what several clients need. Interested in exploring?

---

From: rachel.kim@gmail.com
Hi! Yes, I'd love to chat about what's out there.`,
    occurredAt: '2026-03-05T10:00:00Z',
  },
  {
    id: 'int_023',
    candidateId: 'cand_008',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong designer but current roles don\'t match her IA/complexity specialty. Keeping warm.',
    body: `## Key Takeaways
- 5 years at Notion, UX design
- Specialty: complex information architectures
- Great portfolio but current open roles are more visual/marketing design
- Acme AI Product Designer is closest but she's more UX than visual
- Status: Active but No Roles — keep warm

## Next Steps
- Surface when IA/UX-heavy roles come in`,
    occurredAt: '2026-03-12T14:30:00Z',
  },
  {
    id: 'int_024',
    candidateId: 'cand_008',
    type: 'recruiter_note',
    title: 'Post-Screen Notes',
    summary: 'Rachel is talented, just no perfect role right now.',
    body: `Rachel is very talented — her information architecture thinking is exceptional. The Acme AI role is more visual/interaction design than pure IA. Keep her warm; she'll be first call when a UX-heavy role comes in.`,
    occurredAt: '2026-03-12T15:00:00Z',
  },

  // ── Chris O'Brien (cand_009) ──────────────────────────────────────
  {
    id: 'int_025',
    candidateId: 'cand_009',
    type: 'ai_email',
    title: 'Initial Outreach — GTM Ops roles',
    summary: 'Outreach about operations roles. Chris responded interested.',
    body: `From: SmartLeads AI
To: chris.obrien@outlook.com
Subject: GTM Operations roles at high-growth startups

Hi Chris, your RevOps work at Amplitude is exactly the profile several clients are looking for. Interested?

---

From: chris.obrien@outlook.com
Definitely. I've been thinking about my next move. Let's chat.`,
    occurredAt: '2026-03-08T09:00:00Z',
  },
  {
    id: 'int_026',
    candidateId: 'cand_009',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Good RevOps professional but current GTM roles don\'t perfectly match. Active but No Roles.',
    body: `## Key Takeaways
- RevOps Manager at Amplitude, 4 years
- Strong Salesforce + SQL + analytics
- Vanta Labs GTM Operator role is close but more marketing-ops heavy
- Chris is more revenue/sales-ops focused
- Status: Active but No Roles

## Next Steps
- Surface for pure RevOps roles when they come in
- Vanta Labs role might still work — discuss further`,
    occurredAt: '2026-03-14T11:30:00Z',
  },

  // ── Priya Mehta (cand_010) ────────────────────────────────────────
  {
    id: 'int_027',
    candidateId: 'cand_010',
    type: 'ai_email',
    title: 'Initial Outreach — Backend Engineering roles',
    summary: 'Outreach about backend roles. Priya responded interested.',
    body: `From: SmartLeads AI
To: priya.m@protonmail.com
Subject: Backend/Infrastructure engineering roles

Hi Priya, your backend work at Shopify caught our attention. We have several infrastructure-focused roles. Interested?

---

From: priya.m@protonmail.com
Sure, send me details. I'm particularly interested in infrastructure-focused work.`,
    occurredAt: '2026-03-08T14:00:00Z',
  },
  {
    id: 'int_028',
    candidateId: 'cand_010',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Solid backend engineer. No perfect role match right now but good pipeline candidate.',
    body: `## Key Takeaways
- Backend Engineer at Shopify, Go + Ruby
- Wants more infrastructure focus
- LatticeFlow Backend is closest but she wants more infra, less application
- Status: Active but No Roles`,
    occurredAt: '2026-03-15T09:30:00Z',
  },

  // ── Daniel Okafor (cand_011) ──────────────────────────────────────
  {
    id: 'int_029',
    candidateId: 'cand_011',
    type: 'ai_email',
    title: 'Initial Outreach — Data/ML Engineering roles',
    summary: 'Outreach about data engineering roles. Daniel responded interested.',
    body: `From: SmartLeads AI
To: daniel.okafor@gmail.com
Subject: Data + ML infrastructure roles

Hi Daniel, your data engineering work at Databricks — particularly Spark and Airflow — aligns with several roles we're filling. Interested in learning more?

---

From: daniel.okafor@gmail.com
Absolutely. I'm looking for something at the intersection of data eng and ML.`,
    occurredAt: '2026-03-12T11:00:00Z',
  },
  {
    id: 'int_030',
    candidateId: 'cand_011',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong data engineer looking for ML intersection. LatticeFlow Staff ML is close but not quite right.',
    body: `## Key Takeaways
- Senior Data Engineer at Databricks
- Spark, Airflow, dbt specialist
- Wants data+ML intersection role
- LatticeFlow Staff ML is more pure ML infra than data eng
- Status: Active but No Roles — great pipeline candidate`,
    occurredAt: '2026-03-18T15:30:00Z',
  },

  // ── Lisa Chang (cand_012) — Future Candidate ──────────────────────
  {
    id: 'int_031',
    candidateId: 'cand_012',
    type: 'ai_email',
    title: 'Initial Outreach — Applied ML Research',
    summary: 'Outreach about research roles. Lisa responded interested but not ready to move yet.',
    body: `From: SmartLeads AI
To: lisa.chang@hey.com
Subject: Applied ML research — LLM-focused roles

Hi Lisa, your work at OpenAI on LLM evaluation is exactly what Acme AI needs. Interested?

---

From: lisa.chang@hey.com
Very interested but I have a project I need to finish first. Can we talk in about 3 months?

---

From: SmartLeads AI
Of course. Let's at least do a quick intro screen so we're ready to move fast when you are.

---

From: lisa.chang@hey.com
That makes sense. Booked for next Thursday.`,
    occurredAt: '2026-02-10T09:00:00Z',
  },
  {
    id: 'int_032',
    candidateId: 'cand_012',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Impressive OpenAI researcher. Not ready to move for 3 months. Future candidate — follow up May.',
    body: `## Key Takeaways
- ML Research Engineer at OpenAI
- Working on LLM evaluation frameworks
- Not ready to move — finishing a major project
- Follow up in May (3 months from screen)
- Very interested in Acme AI Applied AI Researcher when ready
- Status: Future Candidate`,
    occurredAt: '2026-02-18T10:30:00Z',
  },
  {
    id: 'int_033',
    candidateId: 'cand_012',
    type: 'recruiter_note',
    title: 'Future Candidate Notes',
    summary: 'Lisa is top-tier. Set reminder for May.',
    body: `Lisa would be a phenomenal candidate for Acme AI when she's ready. Her evaluation framework expertise is exactly what they need. May follow-up is critical — do not let this one slip.`,
    occurredAt: '2026-02-18T11:00:00Z',
  },

  // ── Ryan Cooper (cand_013) ────────────────────────────────────────
  {
    id: 'int_034',
    candidateId: 'cand_013',
    type: 'ai_email',
    title: 'Initial Outreach — Frontend/Product roles in Sydney',
    summary: 'Outreach about Sydney roles. Ryan interested but waiting for RSU vest.',
    body: `From: SmartLeads AI
To: ryan.cooper@gmail.com
Subject: Product Engineering in Sydney — fintech

Hi Ryan, your frontend work at Atlassian is impressive. Novera is building consumer fintech in Sydney. Interested?

---

From: ryan.cooper@gmail.com
Interested but I've got RSUs vesting in 3 months. Can we keep in touch?`,
    occurredAt: '2026-02-22T05:00:00Z',
  },
  {
    id: 'int_035',
    candidateId: 'cand_013',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong frontend from Atlassian. Waiting for RSU vest. Future candidate — follow up June.',
    body: `## Key Takeaways
- Senior Frontend at Atlassian, Sydney
- Strong React, TypeScript, Next.js
- Waiting for RSU cliff (June)
- Interested in Novera Product Engineer when ready
- Status: Future Candidate`,
    occurredAt: '2026-03-01T07:30:00Z',
  },

  // ── Natasha Volkov (cand_014) ─────────────────────────────────────
  {
    id: 'int_036',
    candidateId: 'cand_014',
    type: 'ai_email',
    title: 'Initial Outreach — Platform/Infrastructure roles',
    summary: 'Outreach about infrastructure roles. Natasha responded exploring options.',
    body: `From: SmartLeads AI
To: natasha.v@fastmail.com
Subject: Platform engineering — founding/staff roles

Hi Natasha, your Terraform and platform engineering work at HashiCorp is exactly what several of our clients need. Interested?

---

From: natasha.v@fastmail.com
Exploring my options right now. Let's do a screen.`,
    occurredAt: '2026-02-28T16:00:00Z',
  },
  {
    id: 'int_037',
    candidateId: 'cand_014',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Infrastructure expert from HashiCorp. Exploring but not rushing. Follow up mid-April.',
    body: `## Key Takeaways
- Platform Engineer at HashiCorp
- Terraform, Go, Kubernetes expert
- Exploring but no rush — 6 weeks
- Good for: LatticeFlow Backend, Cinder Founding Engineer
- Status: Future Candidate — follow up April 15`,
    occurredAt: '2026-03-06T12:30:00Z',
  },

  // ── Alex Kim (cand_015) ───────────────────────────────────────────
  {
    id: 'int_038',
    candidateId: 'cand_015',
    type: 'ai_email',
    title: 'Initial Outreach — Design @ AI startups',
    summary: 'Outreach about design roles. Alex is passive but curious.',
    body: `From: SmartLeads AI
To: alex.kim.design@gmail.com
Subject: Founding designer roles — AI & developer tools

Hi Alex, your work at Linear is beautiful. A couple of our clients are looking for founding designers. Worth a chat?

---

From: alex.kim.design@gmail.com
I'm pretty happy at Linear but always open to hearing about interesting opportunities. Sure, let's chat.`,
    occurredAt: '2026-02-26T11:00:00Z',
  },
  {
    id: 'int_039',
    candidateId: 'cand_015',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Linear designer, not actively looking but open. Future candidate — follow up May.',
    body: `## Key Takeaways
- Product Designer at Linear
- Beautiful portfolio, developer tools focus
- Not actively looking — happy at Linear
- Would move for the right founding role
- Status: Future Candidate — follow up May with compelling roles`,
    occurredAt: '2026-03-04T14:30:00Z',
  },

  // ── Meeting Scheduled candidates — minimal interactions ───────────
  {
    id: 'int_040',
    candidateId: 'cand_016',
    type: 'ai_email',
    title: 'Initial Outreach — Customer Success @ Northstar Health',
    summary: 'Outreach about CS role. Olivia responded very interested in healthcare tech.',
    body: `From: SmartLeads AI
To: olivia.tran@outlook.com
Subject: CS Leadership — healthcare tech startup

Hi Olivia, your CS work at Lattice is impressive. Northstar Health is looking for a Customer Success Lead. Healthcare tech + your enterprise SaaS experience could be a great fit. Interested?

---

From: olivia.tran@outlook.com
Very interested! Healthcare tech is exactly where I want to be. Let's set up a call.`,
    occurredAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'int_041',
    candidateId: 'cand_017',
    type: 'ai_email',
    title: 'Initial Outreach — GTM Ops roles',
    summary: 'Outreach about GTM operations role. Sam responded enthusiastically.',
    body: `From: SmartLeads AI
To: sam.adeyemi@hey.com
Subject: GTM Operations — high-growth security startup

Hi Sam, your marketing ops background at Segment would be perfect for a GTM Operator role at Vanta Labs. Interested?

---

From: sam.adeyemi@hey.com
Sounds great! I've been wanting to move into a broader GTM ops role. Let's talk.`,
    occurredAt: '2026-03-19T14:00:00Z',
  },
  {
    id: 'int_042',
    candidateId: 'cand_018',
    type: 'ai_email',
    title: 'Initial Outreach — Founding Recruiter @ Vanta Labs',
    summary: 'Outreach about founding recruiter role. Jamie responded interested.',
    body: `From: SmartLeads AI
To: jamie.foster@gmail.com
Subject: Founding Recruiter — security/compliance startup

Hi Jamie, your technical recruiting experience at Coinbase is exactly what Vanta Labs needs for their first in-house recruiter. Interested?

---

From: jamie.foster@gmail.com
Building a recruiting function from scratch? That's the dream. Let's chat.`,
    occurredAt: '2026-03-20T09:00:00Z',
  },

  // ── Archived candidates — minimal interactions ────────────────────
  {
    id: 'int_043',
    candidateId: 'cand_019',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Decent screen but Derek decided to stay at Google. Archived.',
    body: `## Key Takeaways
- SWE at Google, distributed systems
- Had a good conversation but ultimately not interested in startups
- Comfortable at Google, risk-averse
- Status: Archived`,
    occurredAt: '2026-02-10T11:30:00Z',
  },

  {
    id: 'int_044',
    candidateId: 'cand_020',
    type: 'ai_email',
    title: 'Initial Outreach — Founding Recruiter roles',
    summary: 'Outreach about founding recruiter roles. Mika responded interested.',
    body: `From: SmartLeads AI
To: mika.tanaka@outlook.com
Subject: Founding Recruiter — build hiring from scratch

Hi Mika, your TA experience at Netflix is impressive. Vanta Labs is looking for a founding recruiter. Interested in hearing more?

---

From: mika.tanaka@outlook.com
I've been thinking about this exact type of move. Yes, let's set something up!`,
    occurredAt: '2026-03-21T10:00:00Z',
  },

  {
    id: 'int_045',
    candidateId: 'cand_021',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'Strong technically but comp expectations too high for available roles. Archived.',
    body: `## Key Takeaways
- Senior Backend at Cloudflare, Rust + Go
- Strong technically, edge computing expertise
- Comp expectations: $280k+ total — well above our role ranges
- Not flexible on comp
- Status: Archived — comp mismatch`,
    occurredAt: '2026-01-20T15:30:00Z',
  },

  // ── Grace Hopper-Lee (cand_022) ───────────────────────────────────
  {
    id: 'int_046',
    candidateId: 'cand_022',
    type: 'ai_email',
    title: 'Initial Outreach — Staff IC roles',
    summary: 'Outreach about staff-level IC roles. Grace responded interested in transitioning from EM.',
    body: `From: SmartLeads AI
To: grace.hl@gmail.com
Subject: Staff IC engineering roles — backend/platform

Hi Grace, your engineering leadership at HubSpot is impressive. If you're considering a move back to IC, we have staff-level roles that might interest you. Thoughts?

---

From: grace.hl@gmail.com
You read my mind — I've been thinking about going back to IC. I love building systems more than managing people. Let's talk.`,
    occurredAt: '2026-03-12T08:00:00Z',
  },
  {
    id: 'int_047',
    candidateId: 'cand_022',
    type: 'screen_summary',
    title: 'Recruiter Screen — Summary',
    summary: 'EM transitioning to IC. Strong systems thinking, Node/TypeScript. No matching role right now.',
    body: `## Key Takeaways
- EM at HubSpot, wants to go back to IC
- Strong Node.js, TypeScript, system design
- Wants staff IC, backend or platform
- No management roles — firm on this
- Nothing matching right now
- Status: Active but No Roles`,
    occurredAt: '2026-03-19T13:30:00Z',
  },
]
