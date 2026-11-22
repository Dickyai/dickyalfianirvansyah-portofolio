# Dicky Alfian Irvansyah — Portfolio

Personal portfolio built with Next.js, showcasing Industrial Engineering projects, competencies, certifications, and contact information.

## Features

- Single-page portfolio with a full-screen parallax cover.
- English and Indonesian content, with English as the initial language.
- Dark and light themes.
- Project archive with searchable projects and detail galleries.
- Certification gallery and responsive layouts.
- Contact form powered by Resend, with optional Upstash Redis rate limiting.
- Reduced-motion support for animated elements.

## Tech Stack

- Next.js 15 App Router and React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion, Motion, GSAP, and Lenis
- Lucide React

## Requirements

- Node.js 20 LTS recommended (Node.js 18.18 or newer).
- npm.

The Next.js app and its `package.json` are in `src/`, so run project commands from that directory.

## Project Structure

```text
README.md
src/
├── app/             # App Router pages, API routes, and global styles
├── components/      # Shared UI, navigation, project, and utility components
├── data/            # Portfolio content and project data
├── hooks/           # Reusable React hooks
├── i18n/            # Indonesian and English translations
├── public/          # Public images, project media, music, and icons
├── sections/        # Homepage sections
└── types/           # Shared TypeScript types
```

## Deployment

Deploy to Vercel or another Node.js-compatible host. When importing this repository into Vercel, set the project **Root Directory** to `src` and configure the contact-form environment variables in the deployment settings. GitHub Pages static hosting is not configured for this project; the contact API route requires a server runtime.