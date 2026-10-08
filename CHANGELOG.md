# Changelog

## Unreleased

- Redesigned every page in a premium dark style based on the approved design sample: self-hosted Geist type, browser and laptop project frames, outcome-led case-study headlines, and a lime accent used sparingly.
- Added mouse-driven effects (background glow, cursor ring with a "View" state, hero depth, card tilt, lit process borders) and counting stats, all off for touch screens and reduced motion.
- Replaced the dock navigation with a simple header and mobile menu, removing the `motion` library from every page load.
- Rebuilt the case studies with a scrollable full-page browser preview, galleries, a click-to-play video, and a two-column project breakdown.

- Prerendered every route to static HTML at build time with page-specific titles, descriptions, canonical URLs, and social tags, then hydrated it on the client.
- Replaced the catch-all SPA rewrite with explicit page rewrites, legacy 301 redirects, and a real 404 status for unknown URLs.
- Added self-drawing Lottie icons to the process steps, lazy-loaded with the CSP-safe light player, played once, replayed on hover, and shown as a still frame for reduced motion.
- Moved button, tag, kicker, and card base styles into the components layer so utility overrides apply, fixing invisible tags and buttons on light and lime sections.
- Rewrote case-study outcomes around what was delivered, removed the broken Beauty Rocío development link, and removed internal notes from the work history.
- Refocused featured work on five website, landing-page, and web-app projects, and split the portfolio archive into More web work and a filterable Design & motion section led by MillsCo.
- Trimmed the homepage by removing the Connected toolkit orbit section (backed up in tmp/), moving the tool strip into Services, and starting it when the section is revealed.
- Added a homepage testimonial section that appears once real client quotes are added to siteContent.js.

## v2.7.0 - 2026-08-14

- Added four AI-generated presentation design case studies with honest project labels and local optimized slide galleries.
- Added the Presentation Design archive filter and reusable case-study gallery headings.
- Added a Video & Motion archive category with three optimized local reels and poster frames.
- Kept editable Canva source links private while preserving the existing Amazon A+ gallery and portfolio navigation.

## v2.6.1 - 2026-08-14

- Strengthened the MillsCo archive card with a Client Work label and verified listing count.
- Added a compact proof strip and separated primary Amazon samples from additional verified titles.
- Removed the repeated catalog composite from the case-study gallery while preserving it as the archive thumbnail.

## v2.6.0 - 2026-08-14

- Added a MillsCo Amazon A+ Content case study using optimized artwork from the live Sir Rhymesalot product modules.
- Added a responsive A+ gallery and links to nine verified Amazon listings with live From the Publisher content.
- Kept sales and conversion results explicitly unavailable rather than inferring performance from the public listings.

## v2.5.1 - 2026-08-07

- Renamed the shared navigation item from Work to Portfolio while preserving the `/portfolio` route.
- Removed the Clinic Growth Landing Page and Real Estate Lead Funnel concept projects.
- Eager-loaded images inside the transformed desktop portfolio reel to prevent blank slides, while preserving lazy loading in normal mobile, tablet, and archive layouts.
- Guarded the active reel index when the project collection changes so hot reloads cannot briefly render an invalid project.

## v2.5.0 - 2026-08-06

- Added the live UMLC Church Monitoring Dashboard as a new vibe-coded web application case study.
- Documented the React, Vite, Supabase, and Vercel implementation without inventing usage or outcome metrics.
- Added an optimized wide dashboard capture and a dedicated live-dashboard link.

## v2.4.2 - 2026-08-06

- Replaced the James Christian project image with the supplied full-page Vampire Facelift capture.
- Renamed the project to match the treatment shown and enabled an internally scrollable case-study preview.
- Optimized the 2.6 MB source into a 131 KB WebP while preserving the full page.

## v2.4.1 - 2026-08-06

- Replaced the Beauty Rocio development-site capture with the supplied clean full-page portfolio image.
- Optimized the 3.4 MB source into a 210 KB WebP and enabled the internally scrollable case-study preview.
- Preserved the honest warning about the currently broken public development environment.

## v2.4.0 - 2026-08-06

- Added the completed SEO for Real Estate homepage and Tax Company Figma mockups as optimized, scrollable case studies.
- Separated finished Figma work from live development previews and concept or practice projects in the Work experience.
- Kept placeholder tax-template counters and copy explicitly labeled as presentation content rather than verified results.
- Excluded the remaining unfinished Figma drafts from the portfolio.

## v2.3.0 - 2026-08-03

- Added the Vital Factory supplement landing page as an honestly labeled development-preview case study with an optimized local screenshot.
- Added the safe external development-preview link and preserved the existing real-project-first Work ordering.
- Refined the header into a minimal floating glass pill that compresses on scroll, with an animated accessible mobile menu.
- Preserved the restored page animation system, native scrolling, reduced-motion support, and existing routes.

## v2.2.0 - 2026-08-03

- Added three real website portfolio projects using optimized local screenshots and honest development-preview status labels.
- Updated the homepage featured work to prioritize A+ Junk N Tow, James Christian Cosmetic, and Beauty Rocío.
- Added safe live development preview links to homepage cards and case studies.
- Added screenshot evidence and case-study details without unsupported performance claims.
- Replaced the visible JF header and footer mark with Janrenzo's camera portrait while preserving the browser favicon.
- Added reel grouping, scroll guidance, and progress while preserving the existing animation and responsive systems.

## v2.1.0 - 2026-08-03

- Rebuilt the Work index as a native-scroll editorial showcase with a synchronized desktop project reel and a responsive stacked fallback.
- Added dedicated case-study routes for all website, funnel, graphic, and campaign projects.
- Replaced modal and hash-based project navigation while preserving compatible legacy links.
- Added a filtered design archive and retained honest concept labels, existing media, and the scrollable Junk N Tow preview.
- Preserved the restored site-wide animation system, keyboard access, reduced-motion behavior, and native document scrolling.

## v2.0.1 - 2026-08-03

- Replaced page-level `overflow-x-hidden` with `overflow-x-clip` to remove the nested vertical scrollbar while preserving horizontal clipping and all restored animations.
- Expanded the capabilities marquee to full width with a seamless loop and softly masked edges.
- Kept orbit labels upright and readable throughout their rotation.

## v2.0.0 - 2026-08-03

- Repositioned the site around high-converting websites and lead systems.
- Rebuilt Home, Work, Services, About, and Contact around clearer client journeys.
- Removed placeholder testimonials, fake ratings, awards, and unsupported performance claims.
- Added honest project labels for concept, exploration, and practice work.
- Expanded project inquiry fields while preserving Netlify Forms support.
- Restored the original animation system from commit `31fafd1` within the v2 layout.
- Added responsive, accessibility, SEO, and performance improvements.

Version rules:

- `v2.0.1`: bug fixes
- `v2.1.0`: content or feature updates
- `v3.0.0`: another major redesign
