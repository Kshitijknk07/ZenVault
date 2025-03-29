# ZenVault Landing Page

A modern, responsive landing page for ZenVault built with Next.js, Tailwind CSS, Aceternity UI, and ShadCN UI.

## Features

- Fully responsive design
- Modern UI with animations
- Component-based architecture
- Dark mode support
- Optimized for performance

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework
- **Aceternity UI**: Modern UI components with animations
- **ShadCN UI**: Accessible and customizable UI components
- **TypeScript**: Type-safe JavaScript
- **CSS Animations**: Custom animations for interactive elements

## Project Structure

```
frontend/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   ├── ui/
│   │   ├── HeroSection.tsx
│   │   ├── Features.tsx
│   │   ├── Button.tsx
│   │   ├── BackgroundBeams.tsx
│   │   ├── TracingBeam.tsx
│   │   ├── SparklesCore.tsx
│   ├── icons/
│   │   ├── Logo.tsx
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
├── lib/
│   ├── utils.ts
├── public/
│   ├── assets/
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

- **Colors**: Edit the color variables in `globals.css`
- **Components**: Modify or extend components in the `components` directory
- **Content**: Update the content in each component file

## Deployment

The project can be easily deployed to Vercel or any other hosting platform that supports Next.js.

```bash
npm run build
npm run start
```

## License

MITThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
