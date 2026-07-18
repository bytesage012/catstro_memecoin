# Fidel Catstro — $CATSTRO

Official landing page for the Fidel Catstro memecoin.  
**Chief Cat on Robinhood since 2011.** Built with Next.js 14 App Router.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React](https://react.dev/) (Client Components)
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts](https://fonts.google.com/) (Inter + Fraunces) via `next/font`
- Pure CSS — no Tailwind or external UI libraries

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd catstro-landing

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

The site will be available at `http://localhost:3000`.

---

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/), the platform from the creators of Next.js.  
Simply connect your repository and Vercel will handle the rest (zero-config deployment).

Alternatively, you can deploy the `out/` directory to any static hosting after running `next build`.

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout (metadata, fonts)
│   ├── page.tsx         # Single-page client component (all UI + interactivity)
│   └── globals.css      # All styling (CSS variables, responsive design)
├── public/              # Static assets (optional)
├── next.config.js       # (optional, not needed for this project)
├── package.json
└── README.md
```

There is no `/components` directory — everything is inside `page.tsx` as per the conversion spec.

---

## Features

- **Live market marquee** — static data from the token snapshot (no live API calls)
- **Scroll-reveal animations** — using IntersectionObserver with staggered delays
- **Animated stat counters** — numbers animate on scroll into view
- **Copy-to-clipboard** — contract address pills with toast confirmation
- **Fully responsive** — mobile-first design with breakpoints at 480px, 768px, 1024px, 1440px
- **Sticky navigation** — blur effect on scroll
- **Mobile menu** — accessible, closes on Escape or link click

---

## Token Information

- **Contract Address:** `0x31C0445253C74236FE34eC73d78B122DeAEB9A7b`
- **Chain:** Robinhood
- **DEX:** Uniswap
- **Symbol:** `CATSTRO`
- **Market data shown on the page is a snapshot and may not reflect real-time numbers.**

---

## Social Links

- **X (Twitter):** [sonikcrypto](https://x.com/sonikcrypto/status/2078520640248615000)
- **DexScreener:** [View Pair](https://dexscreener.com/robinhood/0x3d596000ee1fa72c40a85b85978235e20b20bc1b)
- **Instagram:** [@msfidelcatstro](https://instagram.com/msfidelcatstro/)

---

## License

This project is created for entertainment and community purposes. No financial advice is implied. $CATSTRO is a memecoin with no intrinsic value.

---

**🐱 Long live the Chief Cat.**

