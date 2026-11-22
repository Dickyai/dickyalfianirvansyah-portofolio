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

## First Push to GitHub

The Git repository should be the folder containing this README and `src/`. The Next.js app itself is in `src/`.

1. Create a **new empty repository** on GitHub. Do not initialize it with another README, `.gitignore`, or license.
2. Open PowerShell in this project folder and initialize Git:

   ```powershell
   git init -b main
   git status --short --ignored
   ```

3. Before staging, confirm that local environment files are ignored and review the files that will be public:

   ```powershell
   git check-ignore -v .env.local
   git check-ignore -v src/.env.local
   git status --short --ignored
   ```

   `src/private-project-media/` is not ignored and will be included by `git add .`. Review its contents before pushing, especially if the GitHub repository will be public.

   Also review project-specific note files such as `CLAUDE.md`, `.AntiGravity.mdc`, `src/.AntiGravity.mdc`, and `REA_PORTFOLIO_BLUEPRINT.md`. They are not excluded by `.gitignore`.

4. Stage and inspect the changes before committing:

   ```powershell
   git add .
   git status --short
   git diff --cached --stat
   git diff --cached
   ```

   Do not commit if any credentials, private files, or unwanted media appear in the staged changes.

5. If Git has no author identity configured, set it before committing:

   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your-verified-email@example.com"
   ```

   Use an email verified with GitHub or its provided no-reply address.

6. Commit, connect the empty GitHub repository, and push:

   ```powershell
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git remote -v
   git push -u origin main
   ```

   Replace the remote URL with the repository URL from GitHub. GitHub may open a browser for authentication; account passwords are not accepted as Git HTTPS passwords.

## Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**, then import the GitHub repository.
2. Set **Root Directory** to `src` because that is where `package.json` and the Next.js app are located.
3. Keep the framework preset as **Next.js**. Use `npm ci` as the install command and `npm run build` as the build command; leave the output directory at its Next.js default.
4. Add these environment variables in the Vercel project settings:
   - Required: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
   - Optional, but set both to enable production rate limiting: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

   Add them directly in Vercel; do not put real values in GitHub or this README. Configure Preview variables too if you want the contact form to work on preview deployments.
5. Select **Deploy**. Future pushes to `main` will trigger production deployments automatically. Test the deployed page and contact form after deployment.

The current Open Graph URL is `https://dickyai.github.io`; update the metadata in `src/app/layout.tsx` if the deployed site will use a different domain.
