<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://vnzrdhljbiwahoajzqyc.supabase.co/storage/v1/object/public/assets/mindcare-banner-dark.png">
  <img src="https://vnzrdhljbiwahoajzqyc.supabase.co/storage/v1/object/public/assets/mindcare-banner-light.png" alt="MindCare AI Banner" width="100%">
</picture>

# MindCare AI

**AI-Powered Mental Wellness Companion** — Bridging the gap between traditional therapy and everyday self-care through intelligent technology.

> Founded by [Cyril Ofide](https://github.com/cyrilofide)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)

---

## Vision

MindCare AI was created with a simple belief: **everyone deserves access to quality mental health tools**. By combining cutting-edge AI with proven therapeutic techniques, we're building a platform that meets you where you are — whether you need a quick breathing exercise, want to journal your thoughts, or need to talk through a difficult moment.

> "Mental wellness shouldn't be a luxury; it should be a fundamental human right powered by the best tools we can build." — Cyril Ofide

---

## Key Features

### 🧠 AI Mental Health Companion (`/chat`)
An intelligent chat assistant trained in cognitive behavioral therapy (CBT) techniques. Have real-time conversations that help reframe negative thought patterns and provide emotional support.

### 📊 Mood & Emotion Tracker (`/mood`)
Track your emotional patterns over time with intuitive visualizations. Log moods across five states (great, good, neutral, bad, awful) and add contextual notes to identify patterns and triggers.

### 📝 Interactive CBT Worksheets (`/cbt`)
Evidence-based cognitive behavioral therapy activities designed to help identify, challenge, and reframe negative thought patterns. Complete structured exercises that guide you through therapeutic techniques.

### 🌬️ Guided Breathing & Mindfulness (`/breathing`)
Calm your mind with visually-guided breathing exercises. Choose from multiple breathing patterns with an animated interface that makes mindfulness practice accessible and engaging.

### 📓 Personal Journal with Privacy (`/journal`)
Reflect on your journey with structured prompts and private entries. Each journal entry can be tagged with your current mood, creating a rich diary of your mental wellness journey over time.

### 🎯 Vision Board & Goal Visualizer (`/vision-board`)
Create and organize visual representations of your goals and aspirations. A creative space to manifest your mental wellness objectives and track your progress.

### 🔐 Secure Authentication (`/login`)
Private, encrypted user accounts powered by Supabase Auth. Your data is yours alone — every mood entry, journal note, and therapy session is protected by row-level security policies.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 with TypeScript |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS v4 + shadcn/ui components |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Backend / Database** | Supabase (PostgreSQL + Auth) |
| **Build Tool** | Vite 5 |
| **Package Manager** | Bun |
| **Forms** | React Hook Form + Zod validation |
| **Charts** | Recharts |
| **Drag & Drop** | dnd-kit |
| **Notifications** | Sonner (toast system) |

---

## Project Structure

```
mindcare-ai/
├── public/                          # Static assets
│   ├── favicon.ico
│   └── gebeya.webp
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # shadcn/ui primitives (54 components)
│   │   ├── Layout.tsx               # App shell with sidebar/nav
│   │   ├── Sidebar.tsx              # Side navigation
│   │   ├── BottomNav.tsx            # Mobile bottom navigation
│   │   ├── Footer.tsx               # Site footer
│   │   ├── ProtectedRoute.tsx       # Auth guard wrapper
│   │   └── ...
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-auth.tsx             # Authentication context & provider
│   │   ├── use-wellness.ts          # Mood & journal data hooks
│   │   └── use-mobile.ts            # Mobile detection
│   ├── integrations/
│   │   └── supabase/
│   │       └── client.ts           # Supabase client configuration
│   ├── lib/
│   │   └── utils.ts                 # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── Landing.tsx              # Public landing page
│   │   ├── Login.tsx                # Authentication page
│   │   ├── Dashboard.tsx            # User dashboard
│   │   ├── MoodTracker.tsx          # Mood logging & visualization
│   │   ├── Journal.tsx              # Personal journal
│   │   ├── AIChat.tsx               # AI therapy chat
│   │   ├── Breathing.tsx            # Guided breathing exercises
│   │   ├── CBTActivities.tsx        # CBT worksheets
│   │   ├── VisionBoard.tsx          # Vision board
│   │   └── About.tsx                # About & founder
│   ├── App.tsx                      # Root component with routes
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles & CSS variables
├── supabase/
│   └── migrations/
│       ├── 20250101000000_init_mindcare_tables.sql
│       └── 20250102000000_add_auth_to_mindcare.sql
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

---

## Database Architecture

MindCare AI uses **Supabase** (PostgreSQL) with Row-Level Security (RLS) for data isolation.

### Tables

#### `mood_entries`
| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` (PK) | Auto-generated unique identifier |
| `created_at` | `timestamptz` | Timestamp of entry |
| `user_id` | `uuid` (FK → `auth.users`) | Owner of the entry |
| `mood` | `text` | One of: `great`, `good`, `neutral`, `bad`, `awful` |
| `note` | `text?` | Optional contextual note |

#### `journal_entries`
| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` (PK) | Auto-generated unique identifier |
| `created_at` | `timestamptz` | Timestamp of entry |
| `user_id` | `uuid` (FK → `auth.users`) | Owner of the entry |
| `title` | `text` | Journal entry title |
| `content` | `text` | Journal entry body |
| `mood` | `text?` | Optional mood tag |

### Security

- **Row-Level Security (RLS)** is enabled on both tables
- Policies ensure users can only SELECT, INSERT, and DELETE their own entries (`auth.uid() = user_id`)
- Authentication is handled via Supabase Auth with email/password sign-in
- Session persistence and auto-refresh are configured in the client

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2+)
- A Supabase account (for database and auth)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/cyrilofide/mindcare-ai.git
cd mindcare-ai

# 2. Install dependencies
bun install

# 3. Set up environment variables
# Create a .env file with your Supabase credentials:
#   VITE_SUPABASE_URL=your_project_url
#   VITE_SUPABASE_ANON_KEY=your_anon_key

# 4. Run database migrations
# Apply the SQL files in supabase/migrations/ to your Supabase project
# via the Supabase Dashboard SQL Editor or the Supabase CLI

# 5. Start the development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server (port 3000) |
| `bun run build` | Type-check and build for production |
| `bun run preview` | Preview production build locally |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Run ESLint |

---

## Deployment

The app builds to a static `dist/` folder that can be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

```bash
bun run build
# Output: dist/
```

---

## Core Values

| Value | Description |
|-------|-------------|
| ❤️ **Empathy First** | Everyone deserves compassionate support on their mental health journey |
| 🛡️ **Privacy & Trust** | Your data is encrypted, private, and never shared |
| 🎯 **Evidence-Based** | Techniques grounded in CBT and positive psychology research |
| 👥 **Accessible to All** | Mental health support should be available to everyone, regardless of location or background |

---

## License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  Built with ❤️ by <strong>Cyril Ofide</strong><br>
  <sub>MindCare AI — Your Mental Wellness Companion</sub>
</p>