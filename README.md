# L'Instant Barbier

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A premium, highly animated website built for **L'Instant Barbier**, a men's hair salon and barbershop in the heart of Paris (Le Marais). This project serves as a modern digital storefront focused on high-end aesthetics, smooth interactions, and performant user experience.

🔗 **Live Website**: [linstantbarbier.fr](https://www.linstantbarbier.fr)

## 📌 Features

- **Premium UI/UX**: Custom design with "glassmorphism", dark mode aesthetic, and intricate gold accents to reflect luxury and craftsmanship.
- **Advanced Animations**: Powered by a combination of **Framer Motion** (for entrance/exit and gesture animations) and **GSAP** with native scroll (for scroll-linked parallax, stagger, and reveal effects).
- **Custom Image Gallery**: A masonry-style gallery featuring a touch-optimized, full-screen lightbox, categorized filtering, and smooth swipe gestures.
- **SEO & Performance Optimized**: Fully Static Site Generation (SSG), rigorous `<head>` metadata, Schema.org LD-JSON implementation (LocalBusiness), and perfectly tuned image and font caching configurations for maximum Lighthouse scores.
- **Custom Booking Integration**: Connects with Planity for seamless reservation flows directly via CTAs throughout the site.
- **Responsive & Accessible**: Pixel-perfect from mobile to high-resolution desktop screens, with custom touch-handling logic for iOS devices (like native scroll locks).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📂 Project Structure

```text
├── src/
│   ├── app/             # Next.js 16 App Router pages (Home, Gallery, Booking, Legal, etc.)
│   ├── components/      # Reusable, highly animated UI elements (GalleryLightbox, SmoothScroll, Reveal, Header, Footer)
│   ├── lib/             # Shared utilities, constants, and structured image/asset data
│   └── globals.css      # Core Tailwind directives & raw native CSS variables/utilities
├── public/              # Static assets (fonts, video, favicons, raw images)
├── tailwind.config.ts   # Tailwind setup and custom theme extensions
├── next.config.ts       # Cache policies, header injections, and image optimization controls
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js 20+ installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/linstant-barbier.git
   cd linstant-barbier
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables by copying the example or creating a `.env.local` file:

   ```env
    # (Planity keys)
    NEXT_PUBLIC_PLANITY_KEY=your_planity_api_key
   ```

4. Start the development server (using Turbopack):
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧠 Technical Highlights

### Complex Scroll Handling & Lightbox Portals

The application tackles notoriously difficult UI challenges for luxury web design:

- A custom `SmoothScroll` implementation utilizing native scrolling while registering GSAP `ScrollTrigger` instances, preventing "jank" and ensuring high scroll frame rates.
- A fully custom `GalleryLightbox` component rendered exclusively via React `createPortal` to escape CSS hierarchy limitations (`overflow: hidden`), allowing true z-index: 99999 viewport dominance.
- Robust scroll-locking mechanisms utilizing both CSS and native browser passive event listeners to handle mobile/iOS touch-move edge cases when overlays are open.

### Caching Strategy & Vercel

The app takes full advantage of Vercel Edge caching and Next.js Image Optimization caching directives (`stale-while-revalidate`, `immutable`) customized specifically for frequently changed, identically named static assets without busting performance limits.

## 📝 License

This project is proprietary and intended for **L'Instant Barbier**. The source code is showcased here for portfolio purposes only.
