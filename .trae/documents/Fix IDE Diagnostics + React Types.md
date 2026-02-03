## What’s happening (root cause)
- The “Problems” list is coming from the editor TypeScript/CSS/Tailwind language services, not from `pnpm lint`.
- Those `page.tsx` errors reference content that is not present in the current on-disk file (the current [page.tsx](file:///C:/Users/User/Desktop/Workshop/Unilodge/src/app/page.tsx) is only ~18 lines and contains no `<Image>` usage, no `border-black/...` classes). That mismatch strongly indicates stale/unsaved buffer diagnostics.
- The `SmoothScroll.tsx` ReactNode error shows the same symptom: the diagnostics mention `React.ReactNode`, but the current file uses `ReactNode` from `react`. It also hints at multiple React type versions in the dependency tree (it references `@types/react@18.3.27`).
- The `@theme` warning is from the CSS validator not understanding Tailwind v4’s `@theme` directive.

## Fix plan (code + tooling)
1. **Hard-sync the files that diagnostics complain about**
   - Re-save/overwrite [page.tsx](file:///C:/Users/User/Desktop/Workshop/Unilodge/src/app/page.tsx) and [SmoothScroll.tsx](file:///C:/Users/User/Desktop/Workshop/Unilodge/src/components/SmoothScroll.tsx) with known-good content to eliminate any invisible corruption/partial JSX.
2. **Deduplicate React types (fix the ReactNode mismatch properly)**
   - Add `pnpm.overrides` in `package.json` to force a single `@types/react` and `@types/react-dom` version (19.x) across dependencies.
   - Reinstall dependencies so `@types/react@18.x` is not used by any package.
3. **Fix real Tailwind v4 class warnings that exist in code**
   - Update `bg-gradient-to-t` → `bg-linear-to-t` in [FeatureCardsSection.tsx](file:///C:/Users/User/Desktop/Workshop/Unilodge/src/components/sections/FeatureCardsSection.tsx).
   - Re-scan for any other `bg-gradient-to-*` occurrences and update them similarly.
4. **Prevent a future TS/JSX error around `next/image` refs**
   - Remove `ref={bgRef}` from the `next/image` component in [HeroSection.tsx](file:///C:/Users/User/Desktop/Workshop/Unilodge/src/components/sections/HeroSection.tsx) and place the ref on a wrapper element that GSAP animates instead.
5. **Silence the CSS `@theme` warning in the Problems panel (optional but clean)**
   - Add workspace settings (e.g., `.vscode/settings.json`) to ignore unknown at-rules for CSS so Tailwind v4 directives don’t show as problems.

## Verification
- Run `pnpm lint` and `pnpm build` to confirm: 
  - no ESLint errors
  - no TypeScript build/type errors
- Confirm the editor “Problems” list refreshes and clears (if needed, restart the TS server / reload the window after the reinstall).

If you confirm this plan, I’ll apply the changes immediately.