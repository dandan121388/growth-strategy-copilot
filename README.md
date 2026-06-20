# Growth Strategy Copilot

Growth Strategy Copilot is a rules-first business analysis workspace for subscription growth teams. It connects business context, operating data, metric diagnosis, user segmentation, strategy scoring, experiment planning and executive reporting in one guided workflow.

It is a decision-support prototype—not a chatbot, causal inference system or production forecasting tool.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js in the terminal.

```bash
npm run typecheck
npm run test:logic
npm run build
npm start
```

## Deploy to Vercel

### 1. Deployment goal

Deploy the current mock-analysis MVP as a public Next.js application that runs without a database, login or API credential. The deployment should preserve the complete sample workflow, route refresh behavior, Markdown export and English/Chinese presentation layers.

Vercel's default Next.js configuration is sufficient for this project. No `vercel.json` file is required.

### 2. GitHub deployment

1. Push the project to GitHub. Do not commit `.env.local`, `.vercel`, `.next` or `node_modules`.
2. Open Vercel and select **Add New → Project**.
3. Import the GitHub repository.
4. Confirm that the framework preset is **Next.js**.
5. Use `npm run build` as the build command. The default install command is sufficient.
6. Do not add environment variables for the current mock demo.
7. Select **Deploy**.
8. Open the generated production URL and complete the post-deployment checklist in [docs/deployment-checklist.md](docs/deployment-checklist.md).

Future pushes to the connected branch can create new Vercel deployments according to the project's Git integration settings.

### 3. Vercel CLI deployment

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

`vercel` creates a preview deployment. `vercel --prod` creates a production deployment. The CLI may create a local `.vercel` folder that links the directory to a Vercel project; this folder is ignored by Git and must not be committed.

### 4. Build command

Vercel should use:

```bash
npm run build
```

Recommended local pre-deployment checks:

```bash
npm install
npm run type-check
npm run test:logic
npm run build
npm run start
```

### 5. Environment variables

Current demo version uses a mock AI analysis endpoint and does not require any API key.

No environment variable is required for the current deployment. Future AI integration may add `OPENAI_API_KEY`. If that happens, configure the variable in **Vercel Project Settings → Environment Variables** and never write its value into source code, README files, screenshots or `vercel.json`.

### 6. Demo mode

New visitors can select **Start Demo with Fitness Sample** on Dashboard. This loads the recommended Business Setup context and deterministic synthetic dataset in the browser. The visitor can then run Diagnosis and continue through Segmentation, Strategy, Experiments and Report without uploading a file or supplying credentials.

Use **Reset Demo** to remove the saved workspace and return to the initial state.

### 7. LocalStorage behavior

Workspace data and language preference are stored in browser localStorage. Refreshing a route on the same browser restores the saved demo state. If storage is empty or unavailable, analysis pages show a safe empty state with links to Dashboard and Data Upload.

State is device- and browser-specific. It is not synchronized through Vercel, a user account or a cloud database.

### 8. Current deployment limitations

- The sample dataset is synthetic and should not be used for production causal inference or experiment sizing.
- No authentication, cloud persistence or cross-device synchronization is included.
- The current deployment uses deterministic mock analysis rather than a real AI provider.
- Uploaded CSV content remains in the visitor's browser state and is not persisted to a server database.
- Fitness subscription analysis is the only deeply optimized industry workflow in this MVP.

### 9. Troubleshooting

- **Build failure:** Run `npm install`, `npm run type-check` and `npm run build` locally using Node.js 20.9 or later.
- **Empty Diagnosis, Strategy or Report page:** Return to Dashboard, select **Start Demo with Fitness Sample**, then run Diagnosis.
- **Old demo state:** Select **Reset Demo**, or clear site storage for the deployment domain.
- **Language resets:** Confirm that the browser allows localStorage for the deployment domain.
- **Markdown download is blocked:** Allow downloads for the site and retry the export action.
- **A direct route appears empty:** This is expected when no workspace has been created; use the displayed Dashboard entry point. App Router routes do not require custom Vercel rewrites.
- **Future AI request fails:** Verify provider credentials in Vercel Project Settings. Do not add credential values to the repository.

## How to share the demo

1. Share the Vercel production URL.
2. Ask the viewer to select **Start Demo with Fitness Sample**.
3. The demo runs fully in the browser using mock data and mock AI analysis.
4. No login or API key is required.
5. For a clean presentation, select **Reset Demo** before starting.

Opening the same URL on another device creates a fresh device-specific workspace, so every reviewer can reproduce the guided sample independently.

## Demo Walkthrough — 3 to 5 minutes

1. **Dashboard — 30 seconds**
   - Select **Start Demo with Fitness Sample**.
   - Explain that this is a structured decision-support workspace, not a chat interface.
   - The action preloads the recommended fitness context and synthetic sample dataset.

2. **Business Setup — 30 seconds**
   - Show the prefilled business problem, target users, primary goal and previous strategies.
   - Explain that goal alignment, targeted segments and prior attempts affect strategy ranking.
   - Select **Save & Continue** without manually completing the form.

3. **Data Upload — 30 seconds**
   - Confirm that 160 synthetic rows and all 16 required fields are already loaded.
   - Point out the synthetic-data limitation notice.
   - Select **Run Diagnosis**.

4. **Diagnosis — 45 seconds**
   - Lead with the highlighted main bottleneck.
   - Show the 30-day Active User Rate definition and the narrower paid-user funnel stages.
   - Explain that root causes are hypotheses with direct/indirect evidence and validation steps.

5. **Segmentation — 30 seconds**
   - Show behavior-based segments and **Targeted by setup** tags.
   - Explain that setup targets affect ordering but do not alter observed user counts.

6. **Strategy — 45 seconds**
   - Start with the P0 decision-focus strip.
   - Show the priority matrix, transparent scoring method and one expanded strategy card.
   - Highlight the previous-strategy iteration penalty.

7. **Experiments — 30 seconds**
   - Open one experiment’s execution details.
   - Show randomization unit, minimum-sample warning, decision rule and feasibility note.

8. **Report — 45 seconds**
   - Use the Case Study Snapshot as the management-level story.
   - Switch between Executive Summary, Detailed Analysis and Presentation Outline.
   - Explain that quantified lifts are test targets, not forecasts.

Use **Reset Demo** on Dashboard to clear the local workspace and repeat the walkthrough.

> Sample data is synthetic and used to demonstrate the analysis workflow. It should not be used for production-level causal inference or experiment sizing.

## Case Study — Fitness Subscription Sample

The synthetic fitness dataset contains sample acquisition volume and shows weak early activation, low paid conversion, weak current-activity signals and elevated churn-risk signals. Acquisition trend is not evaluated.

1. **Business Context** — Monthly fitness subscription with activation, monetization and churn-risk decision questions.
2. **Dataset Scope** — 160 synthetic user records, 16 behavioral and commercial fields, point-in-time activity signals.
3. **Key Metrics** — 36.3% activation, 6.3% paid conversion, 33.8% 30-day active-user rate and 35.0% observed churn status.
4. **Main Bottleneck** — Activation, 30-day active-user retention signal and paid conversion.
5. **User Segments** — New, light, high-potential, high-value, churn-risk and price-sensitive users.
6. **P0 Strategies** — Churn-risk Win-back Campaign and High-Potential User Premium Trial under the default setup.
7. **Experiment Plan** — P0/P1 strategies become structured tests with eligibility, groups, metrics, guardrails and feasibility notes.
8. **Product Limitations** — Synthetic data, no acquisition trend, no cohort month-2 retention, no causal proof and no production experiment sizing.

## How to explain this project in an interview

### 1. Why I built this

Growth analysis often breaks across spreadsheets, ad-hoc SQL, slide decks and generic AI prompts. I built a workspace that makes the reasoning chain visible: context → metrics → diagnosis → segments → priorities → experiments → report.

### 2. Why it is not a generic AI report generator

The product does not ask a model to invent an answer from a CSV. Metrics, thresholds, segment assignment, strategy scores and experiment guardrails are deterministic and inspectable. Narrative output must preserve those facts.

### 3. How rules and AI are separated

- Rules own calculations, metric definitions, threshold checks, evidence labels, segmentation, priority scores and decision guardrails.
- The current provider is a deterministic mock.
- A future model may improve explanation, synthesis and management-level wording, but it must not overwrite computed facts.
- Structured output is validated with Zod before reaching the UI.

### 4. What the current MVP can do

- Capture business context and use it in prioritization.
- Validate a user-level CSV or load the synthetic fitness sample.
- Calculate core subscription metrics and channel-level activity quality.
- Produce evidence-backed findings and root-cause hypotheses.
- Assign mutually exclusive behavior segments.
- Score five strategy templates transparently.
- Generate executable P0/P1 experiment plans.
- Produce executive, detailed and presentation-ready report views.

### 5. Current limitations

- Optimized for the fitness subscription sample.
- Synthetic point-in-time data only.
- 30-day activity recency is not true cohort retention.
- Acquisition volume is present, but acquisition trend and spend efficiency are not measured.
- Root-cause hypotheses require validation.
- Experiment sizing requires production baselines, MDE, power and traffic estimates.
- No real model or database is connected.

### 6. Future roadmap

- Connect production event and billing data.
- Add cohort retention and acquisition trend definitions when source data supports them.
- Add experiment sizing from real baselines and traffic.
- Introduce a governed AI narrative layer with schema validation and evaluation tests.
- Persist projects and analysis versions in a database.

## Architecture

```text
app/
  api/analyze/route.ts       Mock structured analysis endpoint
  dashboard/                 Demo entry and workspace overview
  business-setup/            Business context form
  data-upload/               CSV validation and synthetic sample loader
  diagnosis/                 Metrics, funnel and root-cause hypotheses
  segmentation/              Rule-based behavior cohorts
  strategy/                  Dynamic strategy scoring and priority matrix
  experiments/               P0/P1 experiment plans
  report/                    Case study and management report views
components/
  WorkspaceProvider.tsx      Local state, Start Demo and Reset Demo
  FunnelChart.tsx            Explicit-denominator lifecycle funnel
  SegmentChart.tsx           Cohort distribution
  StrategyCard.tsx           Collapsible strategy decision card
  PriorityMatrix.tsx         Rule-scored impact/effort visualization
  ExperimentCard.tsx         Collapsible experiment plan
  CaseStudySnapshot.tsx      Interview-ready report overview
  ReportPreview.tsx          Markdown and table rendering
lib/
  sampleData.ts              Deterministic synthetic fitness dataset
  metrics.ts                 Metric and funnel calculations
  diagnosisRules.ts          Threshold rules and hypotheses
  segmentation.ts            Target-aware segment ordering
  strategyGenerator.ts       Dynamic scoring and experiment templates
  reportGenerator.ts         Executive and presentation output
  analysisEngine.ts          Analysis orchestration
  types.ts                   Domain types and Zod schema
```

## AI integration boundary

If a real AI provider is connected later, the following should remain rule-driven:

- Metric definitions and calculations
- Data-quality checks
- Diagnostic thresholds
- Segment assignment
- Strategy and priority scoring
- Previous-strategy penalty
- Experiment success criteria and guardrails
- Source provenance
- Output schema validation

AI should support explanation and synthesis, not replace the quantitative reasoning layer.

## Portfolio Case Study: Growth Strategy Copilot

### 1. Project Overview

Growth Strategy Copilot is an AI-ready business analysis workspace for subscription and platform businesses. The MVP turns a fragmented growth-analysis process into one traceable workflow: business context, operating data, metric diagnosis, user segmentation, strategy prioritization, experiment design and executive reporting.

The first release is optimized for a synthetic fitness subscription case. It is designed as a portfolio prototype rather than a production analytics platform, but its product boundaries, decision rules and output schema are deliberately explicit.

### 2. Product Background

The project grew out of experience from a commercial analysis competition focused on a fitness subscription platform. The original work required moving repeatedly between business assumptions, user-level data, segment definitions, strategy proposals and presentation slides. That process revealed an opportunity to productize the analyst's reasoning workflow instead of using AI only at the final writing stage.

### 3. User Problem

Growth analysts and product managers often work across spreadsheets, SQL outputs, documents and slide decks. Three problems follow:

- The link between a metric, a diagnosis and a recommendation is difficult to audit.
- Generic AI tools can produce polished recommendations without showing whether the evidence supports them.
- Strategies are frequently presented without a clear target segment, priority rationale or validation plan.

The user therefore needs decision support that is faster than a manual analysis workflow but more disciplined than an open-ended AI prompt.

### 4. Product Solution

Growth Strategy Copilot separates deterministic business logic from narrative generation. It calculates defined metrics, applies visible diagnosis rules, assigns behavior-based user segments and scores strategy templates before producing any management narrative. The result is a workspace in which each recommendation can be traced back to observed data, business setup context and an explicit scoring rule.

### 5. Core Workflow

```text
Business Setup
    → Data Upload
    → Metric Diagnosis
    → User Segmentation
    → Root Cause Hypotheses
    → Strategy Prioritization
    → Experiment Design
    → Executive Report
```

Each stage produces structured output consumed by the next stage. Business Setup influences target labels and priority alignment; uploaded data determines metrics and evidence; strategies become experiments; the report packages the same analysis without introducing new facts.

### 6. Why It Is Not a Generic AI Report Generator

The product does not send a CSV to a model and ask for recommendations. Metric definitions, threshold checks, segment assignment, strategy scores, priority levels and experiment guardrails are calculated before the narrative layer. AI is treated as a constrained communication component, not as the source of quantitative truth.

This distinction matters because a convincing report can still be analytically weak. The product makes the reasoning chain inspectable and labels uncertain explanations as hypotheses rather than confirmed causes.

### 7. Rule Engine and AI Responsibility Split

| Responsibility | Rule engine | AI or narrative layer |
|---|---:|---:|
| Metric calculation and denominator definitions | Owns | Must preserve |
| Data-quality checks and threshold diagnosis | Owns | May explain |
| User-segment assignment | Owns | May summarize |
| Strategy impact, effort and priority scoring | Owns | May articulate rationale |
| Root-cause status and evidence type | Owns labels | May improve cautious wording |
| Experiment structure and guardrails | Owns minimum requirements | May tailor presentation |
| Executive and presentation narrative | Provides facts | Owns synthesis and wording |
| Output validation | Structured schema | Must conform |

The current MVP uses deterministic report generation and mock structured output. A real AI provider can be introduced later without moving metric ownership away from the rule engine.

### 8. Key Features

- Business context that affects target-segment emphasis and strategy ranking.
- CSV validation plus a one-click, 160-row synthetic fitness dataset.
- Explicit subscription metrics, funnel denominators and methodology notes.
- Evidence-backed findings and root-cause hypotheses with validation steps.
- Six mutually exclusive behavior segments with setup-target labels.
- Five strategy templates scored by impact, confidence and implementation effort.
- P0/P1 experiment plans with randomization units, success criteria and feasibility notes.
- Executive Summary, Detailed Analysis and Presentation Outline views.
- English and Chinese UI and report output with browser-level language persistence.

### 9. Demo Walkthrough

Start from **Dashboard → Start Demo with Fitness Sample**. Confirm the preconfigured business context, open **Data Upload**, and run the synthetic dataset through **Diagnosis**. Use the highlighted bottleneck to introduce the evidence chain, then show how **Segmentation** turns behavior into action groups. On **Strategy**, explain the transparent priority matrix and open one P0 card. On **Experiments**, show how the recommendation becomes a falsifiable test. Finish on **Report** by switching between the executive summary and presentation outline, then change the UI to Chinese to demonstrate localization.

The recommended live walkthrough takes three to five minutes. See the dedicated script below and [docs/screenshot-guide.md](docs/screenshot-guide.md) for portfolio capture guidance.

### 10. Product Limitations

- The sample is synthetic, point-in-time data and cannot establish causality.
- The 30-day Active User Rate is a recency proxy, not cohort month-2 retention.
- Acquisition volume exists in the sample, but acquisition trend and media efficiency are not evaluated.
- Strategy templates are deliberately bounded and do not replace domain review.
- Experiment sample sizes require production baselines, MDE, statistical power and traffic estimates.
- The MVP has no production database, project collaboration or real AI provider.
- Non-fitness business types are report context only in the current release.

### 11. Future Roadmap

The next stage would connect a governed AI narrative layer using structured outputs while leaving metrics and decisions rule-driven. A later business expansion could add content subscription and SaaS templates, historical project tracking, cohort retention, campaign spend, benchmark data and closed-loop strategy reviews. The staged plan is documented in [docs/future-roadmap.md](docs/future-roadmap.md).

### 12. Interview Talking Points

- I started from a real analysis workflow and asked which reasoning steps could become reusable product components.
- The core product decision was to separate quantitative judgment from AI-generated language.
- Business Setup is not decorative: goals, target users and previous attempts influence prioritization.
- The product uses hypotheses and evidence types to avoid overstating causality.
- Recommendations are incomplete until they have a target cohort, measurable outcome and experiment decision rule.
- The MVP demonstrates product thinking, analytical credibility, AI boundary design and end-to-end prototyping.
- I can clearly explain what the prototype does not know and what data would be required for the next version.

## 3-Minute Demo Script

### 1. Dashboard — 20 seconds

- **What to show:** Product positioning, the analysis pipeline and **Start Demo with Fitness Sample**.
- **What to say:** “This is a business-analysis workspace rather than a chatbot. It connects business context, operating data, diagnosis, strategy and experiments in one traceable workflow.”
- **Why it matters:** It establishes the product category immediately and shows that the demo has a guided beginning and end.

### 2. Data Upload — 20 seconds

- **What to show:** The loaded 160-row synthetic sample, complete field detection, data-quality cards and the sample-data limitation.
- **What to say:** “The demo dataset is synthetic. It contains enough user-level behavior and commercial fields to demonstrate the workflow, but it is not evidence about a real company.”
- **Why it matters:** It makes data provenance and analytical limits visible before any conclusion is presented.

### 3. Diagnosis — 40 seconds

- **What to show:** The highlighted main bottleneck, metric cards, lifecycle funnel, one finding and one root-cause hypothesis.
- **What to say:** “Metrics and threshold breaches are calculated by rules. The system distinguishes the 30-day Active User Rate from narrower paid-user funnel stages, and it labels causal interpretations as hypotheses with direct or indirect evidence.”
- **Why it matters:** This is the core credibility moment: recommendations begin with defined metrics and auditable evidence.

### 4. Segmentation — 25 seconds

- **What to show:** Segment distribution, the largest opportunity group and **Targeted by setup** labels.
- **What to say:** “Users are assigned to mutually exclusive action groups using payment, activity, recency and price-sensitivity rules. Business Setup changes emphasis and ordering, not the observed counts.”
- **Why it matters:** It shows how one aggregate bottleneck becomes segment-specific action rather than a generic recommendation.

### 5. Strategy — 35 seconds

- **What to show:** P0 decision focus, Priority Matrix and one expanded strategy card with scores and triggers.
- **What to say:** “The five templates are not returned in a fixed order. Priority combines bottleneck severity, affected segment size, goal alignment, evidence strength and implementation effort. Previous attempts create an explicit iteration penalty.”
- **Why it matters:** It demonstrates transparent prioritization and a real connection between context, diagnosis and recommendation.

### 6. Experiments — 25 seconds

- **What to show:** One experiment’s hypothesis, control and treatment groups, metrics, randomization unit and statistical decision rule.
- **What to say:** “A strategy is not treated as an answer. Every P0 or P1 recommendation becomes a test with eligibility, guardrails and a decision rule. Production sizing would still require real baselines and traffic.”
- **Why it matters:** It closes the gap between strategic advice and accountable product execution.

### 7. Report — 15 seconds

- **What to show:** Executive Summary, Presentation Outline and the English/Chinese language switch.
- **What to say:** “The report repackages the same computed analysis for management communication. It does not introduce new conclusions, and quantified lifts are experiment targets rather than forecasts.”
- **Why it matters:** It ends with a shareable deliverable while preserving source provenance and analytical caution.

## 中文面试讲解稿

这个项目最早来自我参与商业分析比赛时的一段经历。当时的案例是一家健身订阅平台，我们需要从用户行为和付费数据中识别增长问题，再完成用户分层、策略设计和汇报。过程中我发现，真正耗时的并不只是做一份报告，而是要不断在业务背景、指标口径、用户行为、策略优先级和实验验证之间建立联系。因此我想把这条分析链路产品化，而不是只做一个能够读取 CSV 的聊天机器人。

Growth Strategy Copilot 的定位是 AI 驱动的商业分析工作台。用户先输入业务类型、当前问题、目标用户、首要目标和历史尝试，再上传运营数据。系统会先通过规则引擎计算激活率、付费转化率、30 天活跃用户率、流失率和 ARPU 等指标，然后根据明确阈值识别瓶颈。业务配置也会进入后续流程，例如首要目标会影响策略影响分，目标用户会被标记和优先展示，已经尝试过的相似策略则会被降级为迭代方案。

我在这个产品里刻意区分了规则引擎和 AI 的职责。规则引擎负责可信判断，包括指标口径、诊断阈值、用户分层、策略评分和实验的基本约束。这些部分需要可复核、可解释，不能由模型临时发挥。AI 更适合负责解释、信息整合和管理层表达，例如把结构化发现转化为专业摘要、详细报告或 PPT 大纲，但它不能修改已经计算出的事实。

另一个重要设计是把 Root Cause Analysis 改成 Root Cause Hypotheses。现有样例只能观察行为信号，并不能证明用户为什么没有付费或为什么停止活跃。因此每条假设都会标记直接信号、间接信号或缺失数据，并给出下一步需要补充的埋点或验证动作。这样可以避免把相关性包装成确定因果，也让报告更接近真实商业分析的表达方式。

策略层同样不是固定输出。系统会综合瓶颈严重度、受影响人群规模、业务目标一致性、证据强度和执行难度计算优先级，并在 Priority Matrix 中展示。更重要的是，策略不会停留在建议层：P0 和 P1 策略会继续转化为实验假设、目标用户、对照组、实验组、核心指标、护栏指标和统计决策规则。对我来说，增长策略只有进入可验证的实验，才形成完整的产品闭环。

当前版本也有明确边界。样例数据是合成的横截面数据，30 天活跃用户率不等同于 Cohort 留存，现有字段也无法判断获客趋势或完成正式实验样本量估算。第一版只针对健身订阅场景做了深度优化，其他业务类型目前主要作为报告背景。同时，项目暂时没有接真实 AI API，目的是先验证工作流、规则边界和展示体验，避免模型能力掩盖产品逻辑问题。

如果继续迭代，我会先接入结构化 AI 输出，让模型只负责解释和叙事，并为输出增加 schema 校验和质量评估。之后再接入真实事件、账单、Campaign 和 Cohort 数据，支持历史项目追踪与策略效果复盘。行业扩展会放在数据口径和规则模板成熟之后，优先考虑内容订阅和 SaaS 场景，而不是简单复制一套通用报告模板。

这个项目希望展示的不只是全栈原型能力，也包括我对 AI 产品可信度、商业分析方法和实验闭环的理解：哪些判断应该交给规则，哪些表达可以由 AI 增强，以及如何让每一条策略都能回到数据证据和后续验证。
