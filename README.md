# Unilodge Realty and Property Developers Limited - Next-Generation Real Estate Platform

A premium, cinematic landing page reimagining the Unilodge Realty and Property Developers Limited brand. Built with the latest modern web technologies, this project emphasizes immersive user experience, smooth animations, and a high-end aesthetic suitable for a forward-thinking real estate company.

![Project Banner](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop)

## 🚀 Tech Stack

This project leverages a cutting-edge stack to deliver performance and visual fidelity:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) - The React Framework for the Web.
- **Library**: [React 19](https://react.dev/) - The library for web and native user interfaces.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) - Professional-grade JavaScript animation for the modern web.
  - **ScrollTrigger**: For scroll-based animations.
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) - A smooth scrolling library for modern web design.
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at any scale.
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager.

## ✨ Key Features

- **Cinematic Hero Section**: Full-screen immersive introduction with parallax background and staggered text reveals.
- **Smooth Scrolling**: Integrated Lenis for a luxurious, fluid scroll experience.
- **Scroll-Triggered Animations**: Elements fade, slide, and scale as the user scrolls, powered by GSAP.
  - _Bidirectional Animations_: Animations play on scroll down and reverse on scroll up for a responsive feel.
- **Responsive Navbar**:
  - Glassmorphism effect on scroll.
  - Mobile-first design with a full-screen animated menu overlay.
- **Interactive Components**:
  - **Feature Cards**: Hover effects with gradient overlays.
  - **Map Section**: Custom Google Maps embed with location card.
  - **Coming Soon Modal**: Elegant modal for "under construction" pages.
- **Premium Design Language**: High contrast (Charcoal Black / White), bold typography, and strategic use of "Primary Red" (#8B0000) for branding.

## 🛠️ Installation & Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/unilodge-realty.git
    cd unilodge-realty
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
src/
├── app/
│   ├── layout.tsx       # Root layout with SmoothScroll, Navbar, and Footer
│   ├── page.tsx         # Main landing page assembling all sections
│   └── globals.css      # Tailwind imports and global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx   # Responsive navigation bar
│   │   └── Footer.tsx   # Site footer with contact info
│   ├── sections/        # Modular page sections
│   │   ├── HeroSection.tsx
│   │   ├── BrandStorySection.tsx
│   │   ├── FeatureCardsSection.tsx
│   │   ├── ValuePropositionSection.tsx
│   │   ├── SoftCTASection.tsx
│   │   └── MapSection.tsx
│   ├── ui/
│   │   └── ComingSoon.tsx # Modal component
│   └── SmoothScroll.tsx # Lenis wrapper component
└── ...
```

## 🎨 Customization

### Colors

The project uses a defined color palette in Tailwind. Key colors include:

- `primary-red`: `#D92323` (Brand Accent)
- `charcoal-black`: `#1A1A1A` (Dark Backgrounds)
- `soft-off-white`: `#F9F9F9` (Light Backgrounds)

### Animations

Animations are primarily handled in `useEffect` hooks within each component using `gsap.context()` for cleanup.

- **Reversing Animations**: Most sections utilize `toggleActions: "play none none reverse"` in their ScrollTrigger configuration.

## 📦 Build for Production

To create an optimized production build:

```bash
pnpm build
pnpm start
```

## 📄 License

This project is proprietary and developed for Unilodge Realty and Property Developers Limited.
