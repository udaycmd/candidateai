# candidateai — Project Roadmap

> AI-based search engine for students and scholars

---

## 📊 Current State Summary

### ✅ What's Built
- Next.js 16 app with App Router, TypeScript, Tailwind CSS v4
- Authentication system (Better Auth with Google/GitHub OAuth)
- UI shell: Sidebar, theme provider, prompt bar, chat management
- Route protection middleware
- PostgreSQL database with Prisma (auth models only)
- Zustand state management for chats
- Modern shadcn/ui component library

### ❌ Critical Gaps
- No AI integration (Vercel AI SDK installed but unused)
- No chat/message database models (only auth models exist)
- Empty/missing API routes (auth catch-all, chats endpoint)
- No conversation display (chat detail page missing)
- No search functionality (core feature)
- No settings page
- No tests, no documentation

---

## Phase 1: Core Infrastructure (Fix the Foundation)

### 1. Database Schema Expansion
- [ ] Add `Chat` model (id, userId, title, createdAt, updatedAt)
- [ ] Add `Message` model (id, chatId, role, content, createdAt, metadata for sources/citations)
- [ ] Add `Source` model (for academic paper citations, URLs, snippets)
- [ ] Run migrations

### 2. Fix API Routes
- [ ] Implement `/api/auth/[...all]/route.ts` for Better Auth
- [ ] Complete `/api/chats/route.ts` (GET, POST)
- [ ] Add `/api/chats/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] Add `/api/chats/[id]/messages/route.ts` (POST, GET)

### 3. Settings Page
- [ ] User profile management
- [ ] Theme preferences
- [ ] API key management (if needed)
- [ ] Account deletion

### 4. Chat Detail Page
- [ ] Create `/chat/[id]/page.tsx` route
- [ ] Display message history
- [ ] Real-time message rendering
- [ ] Scroll-to-bottom behavior

---

## Phase 2: AI Integration (Core Functionality)

### 5. Vercel AI SDK Setup
- [ ] Configure AI provider (OpenAI, Anthropic, or open-source models)
- [ ] Implement streaming chat responses
- [ ] Add message state management with `useChat` hook
- [ ] Connect `PromptBar.onSubmit` to actual AI calls

### 6. Academic Search Integration
- [ ] Integrate Semantic Scholar API (paper search, citations)
- [ ] Integrate CrossRef API (DOI lookup, metadata)
- [ ] Integrate arXiv API (preprint papers)
- [ ] Integrate Google Scholar (via SerpAPI or similar)
- [ ] Build tool-calling functions for the AI to search academic databases

### 7. AI-Powered Search Features
- [ ] Context-aware responses with citations
- [ ] Source linking and verification
- [ ] "Related papers" suggestions
- [ ] Summary generation for long papers
- [ ] Question answering from uploaded PDFs

### 8. Response UI
- [ ] Message bubbles (user/AI)
- [ ] Streaming text animation
- [ ] Source citation cards
- [ ] Copy response button
- [ ] Markdown/LaTeX rendering for academic content
- [ ] Code syntax highlighting

---

## Phase 3: Advanced Features (Scholar-Focused)

### 9. PDF Upload & Analysis
- [ ] Drag-and-drop PDF upload
- [ ] Parse academic papers
- [ ] AI-powered summarization
- [ ] Key finding extraction
- [ ] Reference list extraction

### 10. Citation Management
- [ ] Export citations (APA, MLA, Chicago, BibTeX)
- [ ] Citation graph visualization
- [ ] Paper bookmarking/folders
- [ ] Reading list creation

### 11. Research Assistant Features
- [ ] Literature review mode
- [ ] Comparison tables (papers vs papers)
- [ ] Gap identification in research
- [ ] Methodology extraction
- [ ] Key metrics extraction (sample size, results, limitations)

### 12. Collaboration
- [ ] Shared chats/research sessions
- [ ] Export conversations
- [ ] Share findings with links
- [ ] Team workspaces

---

## Phase 4: Polish & Production (Ready for Users)

### 13. Performance Optimization
- [ ] Implement caching (Redis for responses)
- [ ] Database query optimization
- [ ] Image/PDF compression
- [ ] Rate limiting on API

### 14. Error Handling & UX
- [ ] Loading states everywhere
- [ ] Error boundaries
- [ ] Retry mechanisms for failed requests
- [ ] Offline mode (cache recent chats)
- [ ] Keyboard shortcuts

### 15. Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows (auth, chat, search)
- [ ] Load testing for concurrent users

### 16. Documentation & Onboarding
- [ ] Write comprehensive README
- [ ] Add tutorial/onboarding flow
- [ ] Tooltips and help text
- [ ] FAQ section
- [ ] API documentation

### 17. Monitoring & Analytics
- [ ] Error tracking (Sentry)
- [ ] Usage analytics (PostHog, Plausible)
- [ ] Performance monitoring
- [ ] User feedback collection

---

## Phase 5: Scale & Differentiate (Long-term Vision)

### 18. AI Model Improvements
- [ ] Fine-tune models on academic data
- [ ] Multi-model support (switch between AI providers)
- [ ] Domain-specific models (science vs humanities)
- [ ] Local model support (Ollama integration)

### 19. Institutional Features
- [ ] University SSO integration
- [ ] Library database connectors
- [ ] Subscription management
- [ ] Admin dashboards

### 20. Mobile App
- [ ] React Native wrapper
- [ ] Push notifications for long queries
- [ ] Offline reading of saved papers

---

## 🎯 Recommended Starting Point

**Phase 1, Tasks 1–4:** Fix infrastructure first — database schema, API routes, settings page, chat detail page. Then move to Phase 2 for actual AI integration.

> **Status:** Awaiting implementation. Say "go" when ready to begin.
