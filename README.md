# Portfolio Website

A modern, minimal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Features dark/light theme, GSAP animations, vCard QR integration, and GitHub stats.

## Features

### Core

- **Dark/Light Theme**: Smooth theme switching via a toggle in the header (persisted with next-themes)
- **vCard QR Code**: Toggle profile photo ↔ QR code to instantly save contact on mobile
- **GitHub Stats Integration**: Real-time top languages and contribution streak
- **GSAP Animations**: Staggered card reveals, hero entrance animations
- **Pinned Highlights**: Feature key items (jobs, projects, education) with a pin badge
- **Responsive Design**: Mobile-first, adapts across sm/md/lg/xl breakpoints
- **Social Links**: GitHub, LinkedIn, Twitter, Telegram, Substack, Instagram, Email

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + tailwindcss-animate
- **UI**: shadcn/ui (Radix primitives + CVA + tailwind-merge)
- **Animation**: GSAP
- **Theme**: next-themes
- **Icons**: Lucide React + React Icons
- **QR Code**: qrcode.react
- **Carousel**: Embla Carousel

## Getting Started

```bash
git clone https://github.com/bharatbhusal/portfolio.git
cd portfolio
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```
