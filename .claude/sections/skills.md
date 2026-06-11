# Skills Section

**Question answered for visitor:** "What can this person actually build?"

## Skill categories
1. AI / ML — LLMs, fine-tuning, model evaluation, MLflow, Azure ML
2. GenAI — RAG pipelines, LLM ops, prompt engineering, LangChain, LlamaIndex
3. Data — Snowflake, dbt, Spark, Airflow, data modelling
4. Cloud — Azure, GCP, Docker, Kubernetes, CI/CD
5. Pharma-domain — clinical data, regulatory analytics, pharmacovigilance

## Visualisation
- Animated radial / force-graph viz showing skill clusters
- Tag chips above for category filtering
- Each skill node: hover reveals proficiency + tools used
- Static fallback for reduced-motion: clean grid layout

## Files
```
components/sections/Skills/
  index.tsx
  SkillsGraph.tsx    # Interactive viz — "use client"
  SkillsGrid.tsx     # Reduced-motion / mobile fallback
  Skills.motion.ts
```

## Motion
- Graph nodes animate in with `staggerChildren` on scroll enter
- Force-directed layout uses `framer-motion` layout animations
- Category filter: `AnimatePresence` for exit/enter of filtered nodes

## Data
- Skill data defined in `content/site.config.ts` as typed array
- Schema: `{ name, category, level, tools[] }`

## Rules
- Custom SVG icons for skill marks (no icon library for these)
- Lucide for any UI chrome icons
- Graph is `aria-hidden`; accessible list version always rendered for screen readers
