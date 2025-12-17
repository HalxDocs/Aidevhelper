🧠 AI Dev Helper — Hybrid Chrome Extension
Built with ❤️ by HalxDocs
Because debugging at 2 AM shouldn’t feel like spiritual warfare.
🚀 A fully hybrid AI coding assistant that lives in your browser.

AI Dev Helper gives you online AI, offline LLM, inline code tools,
PR reviews, autocomplete, voice mode, error fixing,
and a full AI sidebar—all inside ANY webpage.

Seamless. Fast. Context-aware.
A true AI companion for real developers.

📌 Why This Exists

Because HalxDocs got tired of:

Googling “what is this error???” like a ritual

Copy-pasting code into ChatGPT like a caveman

JavaScript gaslighting him with undefined is not a function

PR reviewers saying “LGTM” after reviewing nothing

Fighting CSS at 3:14 PM

Using 5 AI tools for 1 problem

So he built ONE AI tool…

👉 A dev assistant that never sleeps, never complains, and always explains.

🌟 Features
✅ 1. AI Sidebar Assistant

A floating sidebar with:

Chat interface

Code tools

Snippets

Terminal helper

GitHub tools

Voice mode

Autocomplete (ALT + SPACE)

Unlimited output mode

✅ 2. Right-Click AI Tools

Select any code → Right click → Choose:

Explain Code

Fix Code

Rewrite Cleaner

Optimize Performance

Open AI Chat

✅ 3. Inline Hover Toolbar

When a code block is detected on any webpage, a mini toolbar appears:

🧠 Explain • 🔧 Fix • ✨ Rewrite • ⚡ Optimize

One click → Sidebar opens → Result delivered instantly.

✅ 4. Hybrid AI Engine (3-Layer Architecture)

1️⃣ Online AI (FASTEST)
Supports:

OpenAI GPT-4o / GPT-4o Mini

DeepSeek

Gemini

Claude

Groq

2️⃣ Local LLM (Offline)
Runs WebLLM fully in-browser. No internet required.

3️⃣ Offline Rule-Based AI
Always responds—even without internet or API keys.

✅ 5. Multi-Agent System

ExplainAgent → Converts complex code into simple English

DebugAgent → Finds errors + explains fixes

OptimizeAgent → Refactors & improves performance

✅ 6. GitHub Enhancer

When viewing a pull request:

Summaries

Full AI reviews

Commit message generator

Auto-comments

Diff analysis

✅ 7. Error Auto-Fixer

AI Dev Helper overrides console.error:

When a JS error happens:

→ Sidebar opens
→ AI receives the error
→ Auto-generated fix appears

✅ 8. AI Autocomplete (ALT + SPACE)

Generates next-line completions for:

JavaScript

Python

HTML

CSS

Go

TypeScript

✅ 9. Voice Mode

Speak → AI converts speech to dev-intent actions.

✅ 10. Secure API Key Manager

Inside Settings → API Keys

AES encryption

Provider auto-detection

Test Key button

Stores: openai, deepseek, gemini, claude, groq

✅ 11. History Viewer

All AI results saved locally:

Searchable

Clearable

Organized

✅ 12. Local LLM Loader

Load WebLLM models directly inside the browser for:

Offline chat

Offline code explanation

Offline debugging

🏗️ Folder Structure
chrome-extension/
│
├── manifest.json
├── background.js
│
├── content/
│   ├── content.js
│   ├── detector.js
│   ├── injector.js
│   ├── diff.js
│   └── history.js
│
├── sidebar/
│   ├── sidebar.html
│   ├── sidebar.js
│   └── sidebar.css
│
├── settings/
│   ├── settings.html
│   ├── settings.js
│   └── settings.css
│
├── ai/
│   ├── hybrid.js
│   ├── online-ai.js
│   ├── offline-ai.js
│   ├── local-llm.js
│   ├── unlimited.js
│   └── crypto.js
│
├── agents/
│   ├── explain-agent.js
│   ├── debug-agent.js
│   └── optimize-agent.js
│
├── analyzer/
│   ├── language-detector.js
│   ├── context.js
│   ├── error-detector.js
│
├── bubble/
│   └── bubble.js
│
├── github/
│   └── github-enhancer.js
│
├── autocomplete/
│   └── autocomplete.js
│
└── voice/
    └── voice.js

🔐 Security Notes

API keys encrypted with AES

Never transmitted except to provider endpoint

Local LLM mode keeps everything offline

No trackers, analytics, or external scripts

No logging of user content

🧪 How to Install (Dev Mode)

Download the folder

Go to:
chrome://extensions

Enable Developer Mode

Click Load Unpacked

Select the extension folder

Done 🎉

Right-click anything → AI tools appear.

❤️ Built With Love by HalxDocs

If someone asks why this extension is so cracked, tell them:

“It runs on pure HalxDocs energy —
and that cannot be downloaded, cloned, or pip installed.”

😂 Funny Reason This Was Built

Because:

StackOverflow answers are 10 years old

GitHub PR reviewers are half asleep

VSCode Copilot ignores you sometimes

And ChatGPT keeps forgetting context after 5 messages

HalxDocs said:

“Let me build my own AI that lives inside the browser
knows what I’m seeing
and fixes my code before I cry.”