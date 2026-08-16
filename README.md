---
title: CareerCompass — Career Guidance
emoji: 🧭
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# CareerCompass 🧭
*formerly CareerBandhu*

[![Website](https://img.shields.io/badge/Live%20App-careercompass.vigyatri.com-indigo?style=flat-square&logo=google-chrome)](https://careercompass.vigyatri.com)
[![Hugging Face](https://img.shields.io/badge/Mirror-Hugging%20Face-gray?style=flat-square&logo=huggingface)](https://knnarin-careerbandhu.hf.space)
[![Google Cloud Run](https://img.shields.io/badge/Powered%20by-GCP%20Cloud%20Run-gray?style=flat-square&logo=google-cloud)](https://careerbandhu-h5axc6napq-uc.a.run.app/)

**Your AI-powered career guide** — explore 580+ career paths, match your skills, and plan your future.

Discover the right career based on your current skills. Get a personalized skill gap analysis, curated learning resources, and AI coaching tips to bridge the gap. Rate and explore career paths recommended by the community.

## Features

- **Skill Matching** — enter your skills and get ranked career recommendations with match %
- **Gap Analysis** — see exactly which skills you need and at what priority
- **Learning Resources** — curated free and paid courses, certifications, and books per skill
- **AI Coaching** — Claude AI generates personalized tips for your specific skill set
- **Community Ratings** — rate careers, leave feedback, mark if you're pursuing

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Full skills taxonomy |
| GET | `/api/careers` | All career summaries |
| POST | `/api/recommend` | Career recommendations from skills |
| GET | `/api/career/{id}` | Career detail + ratings |
| POST | `/api/career/{id}/gap` | Gap analysis for a career |
| POST | `/api/rate` | Submit a rating |

## Deployment

Built with **FastAPI** (Python) + **Expo** (React Native for iOS, Android, Web).

Set `ANTHROPIC_API_KEY` as a Space secret to enable AI coaching tips.
