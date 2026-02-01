# Car Logo Quiz - Frontend Worker

Frontend for [Car Logo Quiz](https://www.carlogoquiz.com), built with **Astro** + **Svelte** on **Cloudflare Workers**.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build/) (SSR + Static)
- **UI Library:** [Svelte 5](https://svelte.dev/) (Interactive Islands)
- **Runtime:** [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- **Styling:** CSS Custom Properties + Scoped Styles
- **Backend:** RPC via Service Bindings to `carlogoquiz-api`

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     carlogoquiz-web                             │
│                     (Astro + Svelte)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Astro Pages (SSR)              API Endpoints                   │
│  ├── / (homepage)               ├── /api/session/start          │
│  └── /quiz                      ├── /api/session/restore        │
│      └── <Quiz client:load />   ├── /api/session/end            │
│          (Svelte Island)        └── /api/quiz/answer            │
│                                         │                       │
│                                         │ RPC                   │
│                                         ▼                       │
│                               env.QUIZ_API                      │
│                               (Service Binding)                 │
└─────────────────────────────────────────┬───────────────────────┘
                                          │
                                          ▼
                               ┌─────────────────────┐
                               │  carlogoquiz-api    │
                               │  (BE Worker)        │
                               └─────────────────────┘
```

## 📁 Project Structure

```
src/
├── pages/                    # Astro pages & API routes
│   ├── index.astro          # Homepage
│   ├── quiz.astro           # Quiz page
│   └── api/                 # API endpoints (RPC calls)
│       ├── session/
│       │   ├── start.ts
│       │   ├── restore.ts
│       │   └── end.ts
│       └── quiz/
│           └── answer.ts
│
├── components/
│   ├── astro/               # Astro components (static)
│   │   ├── Layout.astro
│   │   └── Header.astro
│   └── svelte/              # Svelte components (interactive)
│       ├── Quiz.svelte      # Main quiz orchestrator
│       ├── Question.svelte
│       ├── AnswerGrid.svelte
│       ├── ScoreDisplay.svelte
│       ├── Feedback.svelte
│       ├── GameOver.svelte
│       └── ...
│
├── lib/                     # Shared utilities
│   ├── types.ts            # TypeScript types
│   └── api.ts              # Client-side API helper
│
└── styles/
    └── global.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (recommended) or npm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- The `carlogoquiz-api` BE worker running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/carlogoquiz-web.git
cd carlogoquiz-web

# Install dependencies
pnpm install

# Generate Cloudflare types
pnpm run types
```

### Local Development

**Terminal 1: Start the BE worker**
```bash
cd ../carlogoquiz-api
pnpm run dev
```

**Terminal 2: Start the FE worker**
```bash
cd carlogoquiz-web
pnpm run dev
```

The site will be available at `http://localhost:4321`

### Preview with Wrangler

To test with the full Cloudflare Workers runtime:

```bash
pnpm run build
pnpm run preview
```

## 📦 Deployment

### Production

```bash
pnpm run deploy
```

### Staging

```bash
pnpm run deploy:staging
```

### Development

```bash
pnpm run deploy:dev
```

## ⚙️ Configuration

### Environment Variables

Configure in `wrangler.jsonc`:

| Variable | Description |
|----------|-------------|
| `MEDIA_BASE_URL` | Base URL for R2 logo images |

### Service Bindings

| Binding | Service |
|---------|---------|
| `QUIZ_API` | `carlogoquiz-api` (or env-specific variant) |

## 🧪 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Astro dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview with Wrangler |
| `pnpm deploy` | Deploy to production |
| `pnpm deploy:staging` | Deploy to staging |
| `pnpm types` | Generate Cloudflare types |
| `pnpm check` | Type-check Astro & Svelte |

## 🎨 Design

- **Theme:** Dark automotive with electric cyan accents
- **Typography:** Outfit (display) + Space Mono (monospace)
- **Colors:** 
  - Primary: `#00d4ff` (electric cyan)
  - Secondary: `#ff3366` (racing red)
  - Success: `#00ff88` (checkered green)

## 📄 License

MIT
