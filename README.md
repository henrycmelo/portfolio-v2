# Henry C. Melo - Portfolio Website 🎨

> **ANALOGY**: Think of this as a Digital Showroom with a Live AI Tour Guide
>
> Just like a car showroom has interactive displays and a knowledgeable salesperson to answer questions, this portfolio showcases Henry's work with an AI assistant that can answer questions, demonstrate features live, and provide detailed information.

---

## 🎯 What This Project Is

This is Henry C. Melo's **interactive portfolio website** - a modern, accessible showcase of UX/UI design work with an AI-powered chatbot assistant.

**Key Features:**
- ✨ **Modern Design**: Built with Next.js 15 and Chakra UI v3
- 🤖 **AI Chatbot**: Conversational assistant powered by OpenAI GPT
- 🎨 **Live Demos**: Chatbot can change colors, fonts, and layout in real-time
- ♿ **Accessible**: WCAG compliant, keyboard navigation, screen reader support
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast**: Optimized for Core Web Vitals

---

## 🏗️ Architecture Overview

### The Theme Park Analogy 🎢

Think of this portfolio like a well-designed theme park:

```
🎪 Main Entrance (Landing Page)
    ↓
🏛️ Exhibition Halls (Project Showcases)
    ↓
🤖 Interactive Tour Guide (AI Chatbot)
    │
    ├─→ Answers questions about exhibits
    ├─→ Demonstrates interactive features
    └─→ Provides personalized tours
```

### Technical Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│                                                             │
│  Next.js 15 (App Router)                                    │
│  - Server Components                                        │
│  - Client Components                                        │
│  - API Routes                                               │
└────────────────────────┬────────────────────────────────────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ↓             ↓             ↓
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Design   │  │ Chatbot  │  │ Admin    │
    │ System   │  │ Component│  │ Dashboard│
    │          │  │          │  │          │
    │ Chakra   │  │ Live DOM │  │ Content  │
    │ UI v3    │  │ Manip.   │  │ Mgmt     │
    └──────────┘  └─────┬────┘  └──────────┘
                        │
                        ↓ HTTP POST /api/chat
              ┌──────────────────────┐
              │  Backend API         │
              │  (FastAPI Python)    │
              │                      │
              │  ai-chatbot/         │
              └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js 18+** (JavaScript runtime)
- **npm or yarn** (package manager)
- **Backend running** (See ai-chatbot README for setup)

### Installation

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolio-v2
```

#### 2. Install Dependencies
```bash
# ANALOGY: Like stocking your kitchen with ingredients before cooking

npm install
# or
yarn install
```

#### 3. Set Up Environment Variables
```bash
# Copy the template
cp .env.local.example .env.local

# Edit .env.local
```

Required variables in `.env.local`:
```bash
# Backend API (the AI chatbot server)
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000

# Optional: Analytics, monitoring, etc.
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open **http://localhost:3000** in your browser.

The page will auto-reload when you edit files!

---

## 📁 Project Structure

```
portfolio-v2/
├── src/
│   ├── app/                           # Next.js 15 App Router
│   │   ├── page.tsx                   # Landing page
│   │   ├── admin/
│   │   │   └── page.tsx               # Admin dashboard (with chatbot)
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── components/
│   │   ├── PortfolioChatbot.tsx       # 🤖 AI Chatbot Component
│   │   ├── contexts/                  # React contexts (Auth, etc.)
│   │   └── ui/                        # UI components
│   │
│   ├── design-system/                 # Atomic Design System
│   │   ├── atoms/                     # Basic building blocks
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── ...
│   │   ├── molecules/                 # Combined atoms
│   │   ├── organisms/                 # Complex components
│   │   ├── templates/                 # Page templates
│   │   ├── pages/                     # Full pages
│   │   └── foundations/               # Design tokens (colors, spacing)
│   │
│   ├── lib/
│   │   ├── chatbot-api.ts             # API client for backend
│   │   └── utils.ts                   # Utility functions
│   │
│   └── theme/
│       └── theme.ts                   # Chakra UI theme config
│
├── public/                            # Static assets
├── .env.local.example                 # Environment template
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies
└── README.md                          # This file!
```

---

## 🎨 Design System

### The LEGO Analogy 🧱

Think of the design system like LEGO blocks:

- **Atoms** (Small pieces): Button, Input, Text
- **Molecules** (Small assemblies): Search bar = Input + Button
- **Organisms** (Large assemblies): Navigation bar = Logo + Menu + Search
- **Templates** (Instruction manual): How to arrange organisms
- **Pages** (Final model): The complete structure

### Brand Colors

```
Primary:   #212529  (Dark charcoal)
Secondary: #495057  (Medium gray)
Accent:    #107c7c  (Teal)
Success:   #228B67  (Green)
Warning:   #E0A800  (Yellow)
Error:     #B23A48  (Red)
```

### Typography

- **Body**: Geist Sans (clean, modern)
- **Code**: Geist Mono (monospace for code blocks)

---

## 🤖 AI Chatbot Feature

### The Universal Remote Analogy 🎮

The chatbot is like a universal remote for the portfolio:

**Channel 1: Information**
- "What are Henry's skills?"
- "Tell me about his projects"
- "What's his design philosophy?"

**Channel 2: Live Demonstrations**
- "Change background to blue"
- "Make text bigger"
- "Increase spacing"

**Channel 3: Smart Suggestions**
- Contextual follow-up questions
- Related topics
- Demo suggestions

### How It Works

```
User Types Message
        ↓
    Is it an action command?
    │
    ├─→ YES: Execute immediately (frontend)
    │   - Change colors
    │   - Adjust spacing
    │   - Modify fonts
    │
    └─→ NO: Send to backend API
        - RAG search knowledge base
        - GPT generates response
        - Return conversational answer
```

### Available Commands

**Color Commands:**
- `"change background to [color]"`
- `"change text color to [color]"`
- `"change accent to [color]"`

**Typography Commands:**
- `"make text bigger"` / `"increase font size"`
- `"make text smaller"` / `"decrease font size"`
- `"reset font size"`

**Layout Commands:**
- `"increase spacing"`
- `"decrease spacing"`
- `"reset spacing"`

**Reset Command:**
- `"reset styles"` / `"reset everything"`

**Available Colors:**
- Brand: teal, accent, primary, secondary, light, white, dark, gray
- Common: red, blue, green, yellow, purple, pink, orange, black

---

## 🔧 Development

### Running with Backend

For full chatbot functionality, you need both servers running:

**Terminal 1 - Backend (Python FastAPI):**
```bash
cd ../ai-chatbot
source venv/bin/activate
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd portfolio-v2
npm run dev
```

Then visit:
- **Portfolio**: http://localhost:3000
- **Admin Page** (with chatbot): http://localhost:3000/admin
- **Backend API Docs**: http://localhost:8000/docs

### Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

---

## 🎯 Key Pages

### 1. Landing Page (`/`)
- Hero section
- Skills showcase
- Project highlights
- Contact information

### 2. Admin Dashboard (`/admin`)
- **Protected route** (requires authentication)
- Content management
- Project management
- **AI Chatbot** with live demo capabilities
- Design system storybook

---

## 🤝 AI Chatbot Integration

The portfolio chatbot connects to a Python FastAPI backend. Here's the flow:

### 1. User Interaction
```typescript
// src/components/PortfolioChatbot.tsx
const handleSend = async () => {
  // Check if it's a local action (color change, etc.)
  const actions = parseActions(input);
  if (actions.length > 0) {
    actions.forEach(executeAction); // Execute immediately
  }

  // Send to backend for AI response
  const response = await sendChatMessage(input, sessionId);
  setMessages([...messages, response]);
};
```

### 2. API Communication
```typescript
// src/lib/chatbot-api.ts
export async function sendChatMessage(message: string, sessionId?: string) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  return response.json();
}
```

### 3. Backend Processing
```python
# ai-chatbot/src/services/chat_orchestration/orchestrator.py
# - Classifies intent
# - Searches knowledge base (RAG)
# - Generates conversational response
# - Returns JSON with answer + sources
```

---

## 🎨 Creating New Components

Follow the atomic design methodology:

### Example: Creating a Card Component

1. **Create the atom** (if needed):
```typescript
// src/design-system/atoms/Text/Text.tsx
export const Text = ({ children, ...props }) => (
  <ChakraText {...props}>{children}</ChakraText>
);
```

2. **Create the molecule**:
```typescript
// src/design-system/molecules/Card/Card.tsx
import { Box } from '@chakra-ui/react';
import { Text } from '../../atoms/Text/Text';

export const Card = ({ title, description }) => (
  <Box p={4} borderRadius="md" bg="white" shadow="sm">
    <Text fontSize="xl" fontWeight="bold">{title}</Text>
    <Text fontSize="sm" color="gray.600">{description}</Text>
  </Box>
);
```

3. **Use in your page**:
```typescript
import { Card } from '@/design-system/molecules/Card/Card';

<Card
  title="Project Name"
  description="Project description"
/>
```

---

## 🐛 Troubleshooting

### Chatbot not responding

**Problem**: Backend not running or wrong URL

**Solution**:
```bash
# Check if backend is running:
curl http://localhost:8000/health

# Check .env.local:
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000

# Restart backend:
cd ../ai-chatbot
uvicorn src.api.main:app --reload
```

### Build errors

**Problem**: Type errors or dependency issues

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Styles not updating

**Problem**: Browser cache

**Solution**:
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache
- Restart dev server

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables:
  - `NEXT_PUBLIC_CHATBOT_API_URL=https://your-backend-url.com`
- Deploy!

3. **Deploy Backend Separately**
- Use Railway, Render, or Fly.io for FastAPI backend
- Update `NEXT_PUBLIC_CHATBOT_API_URL` in Vercel

### Other Options

- **Netlify**: Works well with Next.js
- **AWS Amplify**: Full AWS integration
- **Docker**: Containerized deployment

---

## 📚 Learning Resources

### Next.js 15
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### Chakra UI v3
- [Chakra UI Docs](https://chakra-ui.com/docs)
- [Component Library](https://chakra-ui.com/docs/components)

### Atomic Design
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- Think of it as: Building with LEGO blocks

---

## 🎓 Understanding the Chatbot

### For Developers

The chatbot demonstrates several advanced concepts:

1. **Hybrid Execution**
   - Some commands execute in frontend (DOM manipulation)
   - Others execute in backend (AI responses)

2. **Session Management**
   - Maintains conversation context
   - Remembers user across messages

3. **Contextual Suggestions**
   - Smart follow-up suggestions based on conversation
   - Encourages exploration

4. **DOM Manipulation**
   - Live style changes without page reload
   - Demonstrates interactive capabilities

See [PortfolioChatbot.tsx](src/components/PortfolioChatbot.tsx) for implementation details.

---

## 🔐 Security Notes

### Authentication
- Admin routes are protected
- Uses Firebase Auth (or your auth provider)

### API Keys
- Never commit `.env.local` to Git
- Use environment variables for all secrets

### CORS
- Backend only allows requests from your frontend domain

---

## 📝 Customization Guide

### Updating Content

1. **Personal Info**: Edit `src/app/page.tsx`
2. **Projects**: Add to project data files
3. **Chatbot Knowledge**: Update `../ai-chatbot/data/knowledge_base/henry_portfolio.md`

### Changing Colors

Edit `src/theme/theme.ts`:
```typescript
brand: {
  primary: { value: "#YOUR_COLOR" },
  accent: { value: "#YOUR_COLOR" },
}
```

### Adding New Pages

```bash
# Create new page
touch src/app/your-page/page.tsx

# It's automatically available at /your-page
```

---

## 📧 Questions?

- **Frontend Issues**: Check Next.js docs or component code
- **Chatbot Issues**: See ../ai-chatbot/README.md
- **Design System**: Review src/design-system/

---

**Built with ❤️ using Next.js 15, Chakra UI v3, and TypeScript**
