# Vanta — AI Agent Red-Teaming Engine

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini-blue.svg)
![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq-orange.svg)
![Built with Lobster Trap](https://img.shields.io/badge/Built%20with-Lobster%20Trap-crimson.svg)

## What Is Vanta
Vanta is a specialized security engine designed to stress-test and audit AI agents for enterprise vulnerabilities. It bridges the gap between agent development and production security by identifying prompt injections, credential leaks, and instruction bypasses before they can be exploited.

## Live Demo
[https://ais-pre-vynmcmtxz7mv56yxh672gd-746797005918.europe-west2.run.app](https://ais-pre-vynmcmtxz7mv56yxh672gd-746797005918.europe-west2.run.app)

## Features
- **Proactive Red Team**: Paste your system prompt and Vanta fires 15 targeted adversarial attacks to identify PII leaks, instruction bypasses, and credential exposure.
- **Forensic Audit**: Upload conversation logs to detect vulnerabilities that have already occurred in production environments.
- **Lobster Trap Deep Prompt Inspection**: Advanced security layer for analyzing agent responses against high-risk patterns.
- **Gemini-Powered Attack Generation**: Leverages state-of-the-art LLMs to simulate sophisticated human-level attacks.
- **CISO-Ready PDF Reports**: Professional security audits with severity classifications and remediation recommendations.
- **Automatic Gemini → Groq Failover**: Robust high-availability architecture ensuring security testing is always online.

## Tech Stack
| Layer | Technology |
|---|---|
| AI (Primary) | Gemini 2.0 Flash |
| AI (Fallback) | Groq Llama 3.3 70B |
| Security Layer | Lobster Trap (Veea) |
| Frontend | Next.js + Tailwind |
| Hosting | Vercel |
| Database | Supabase |

## Hackathon
**Built for**: Transforming Enterprise Through AI  
**Host**: lablab.ai × AI & Big Data Expo North America  
**Tracks**: 
- Agent Security & AI Governance (Veea)
- AI Agents with Google AI Studio

## Quick Start
1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/vanta.git
   cd vanta
   ```
2. **Copy `.env.example` to `.env.local`**
   ```bash
   cp .env.example .env.local
   ```
3. **Add your API keys**
   Edit `.env.local` with your Gemini, Groq, and Supabase credentials.
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables
```env
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## How It Works
```text
  [ Input ]          [ Attack Engine ]          [ Security Report ]
      |                     |                           |
 System Prompt  --->  Gemini/Groq Simulator  --->  Vulnerability Score
      OR                    |                           +
 Conversation   --->  Lobster Trap Analysis  --->  CISO-Ready PDF
```

## Screenshots
<!-- 
[SCREENSHOT_1: 

<img width="1222" height="782" alt="image" src="https://github.com/user-attachments/assets/df941121-b29b-4295-a149-0a7a3b0543e2" />

[SCREENSHOT_2: 
<img width="845" height="648" alt="image" src="https://github.com/user-attachments/assets/3a40e2cd-f0fd-4000-bc8a-7f290b1a931d" />

[SCREENSHOT_3: 
<img width="812" height="763" alt="image" src="https://github.com/user-attachments/assets/29b7c891-baec-4342-a78c-64bec5209992" />

-->
*Screenshots coming soon.*

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
