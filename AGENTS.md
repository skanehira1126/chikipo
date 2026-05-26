# AGENTS.md

## Repository purpose

This repository contains **チキンポータル**, a static dummy joke site based on the premise:

> 「ちきぽ」= 「チキンポータル」  
> 入る勇気のない人のための入口

Treat this as a polished parody landing page, not a throwaway toy. The goal is to make a fake service feel strangely real through careful UI, warm copywriting, and unnecessary craftsmanship.

## Scope

These instructions apply to the entire repository.

Current structure:

```text
docs
├── index.html        # Single-page static site
├── styles.css       # All styling, design tokens, responsive layout
├── app.js           # Small vanilla JS interactions
├── README.md        # Human-facing overview
├── AGENTS.md        # Codex/project instructions
└── assets/          # Local images and icons
```

## Product concept

チキンポータル is a fictional portal for timid people who hesitate before entering, submitting, calling, asking, deciding, or generally existing in public.

Preserve these core ideas:

- The site is kind, low-pressure, and emotionally safe.
- The humor comes from treating tiny hesitations with enterprise-grade seriousness.
- The copy should be witty, but never cruel.
- The design should feel like a sincere startup landing page that accidentally became a chicken sanctuary.
- The primary mood is: **やさしい / かわいい / 少しバカバカしい / でもちゃんと作ってある**.

## Non-goals and hard constraints

- Do not add a backend, database, authentication system, analytics, tracking, or external API.
- Do not collect real personal information. Login forms and diagnostics must remain fake/static.
- Do not add build tooling, package managers, frameworks, or external dependencies unless the user explicitly asks.
- Do not hotlink external assets. Keep images, icons, fonts, and scripts local or use system fonts.
- Do not introduce jokes based on protected characteristics, bullying, harassment, mental-health stigma, illness, disability, race, gender, nationality, religion, sexuality, body type, or socioeconomic status.
- Do not make the mascot mean, smug, manipulative, or shaming. The chicken is anxious but fundamentally supportive.
- Do not replace the Japanese-first experience with English-first copy.

## Tone and copywriting rules

Use Japanese as the primary language unless the user explicitly requests another language.

Good copy patterns:

- 「撤退、極めて戦略的です。」
- 「今日は回復に全振りしましょう。」
- 「ここでは、チキっても怒られません。」
- 「明日の自分に判断をやさしく委譲する。」
- 「クリック前より0.3mmだけ前向き。」

Avoid:

- Mean-spirited “弱い人いじり”
- Clinical or diagnostic framing
- Dark humor that makes the page feel unsafe
- Long explanations where one sharp line would work
- Random chicken puns that do not support the UI context

When adding jokes, prefer this formula:

1. Start with a familiar web/service pattern.
2. Replace the expected confidence with hesitation.
3. Reward the hesitation instead of mocking it.

Example:

```text
普通: 今すぐ申し込む
チキンポータル: 申し込む前に一回深呼吸する
```

## Visual direction

Maintain the current polished/kawaii web design language:

- Soft pastel background, rounded cards, gentle shadows.
- Navy text with blue, yellow, coral, and cream accents.
- Friendly startup-like layout: header, hero, feature cards, stories, FAQ, footer/stats.
- Chicken/door/sofa/omamori motifs are core brand assets.
- It should look good enough that the joke lands harder because the craft is excessive.

Design changes should preserve:

- Clear hierarchy.
- Comfortable spacing.
- Strong mobile responsiveness.
- Readable Japanese text.
- Accessible focus states.
- Fast loading.

## Assets

Assets live under `assets/`.

Allowed asset types:

- SVG for icons, logos, small illustrations, decorative UI pieces.
- PNG/JPG/WebP for richer illustrations or generated images.
- Small texture images if they materially improve the feel.

Asset rules:

- Prefer local files.
- Use descriptive kebab-case filenames, ideally ASCII, such as `hero-mascot.png` or `soft-preview-bg.jpg`.
- Keep decorative images with `alt=""`.
- Give meaningful `alt` text only when the image communicates content not already expressed in nearby text.
- Do not remove existing assets unless you verify they are unused.
- Optimize large images when practical, but do not degrade visible quality.

## HTML conventions

- Keep `index.html` semantic and readable.
- Use landmarks and section labels: `header`, `main`, `section`, `article`, `aside`, `footer`, `aria-labelledby` where appropriate.
- Preserve the skip link.
- Use buttons for actions and anchors for navigation.
- Use `data-*` attributes as JS hooks instead of coupling behavior to visual class names.
- Keep Japanese punctuation and line breaks intentional.
- Avoid inline styles and inline scripts unless there is a strong reason.

## CSS conventions

- Keep design tokens in `:root`.
- Use existing variables before introducing new colors or shadows.
- Use kebab-case class names.
- Keep responsive rules near the bottom unless a local media query is clearer.
- Preserve keyboard focus visibility.
- Prefer CSS transitions that are subtle and non-essential.
- Respect `prefers-reduced-motion` if adding larger animations.
- Do not add CSS frameworks.

## JavaScript conventions

- Use plain vanilla JavaScript.
- Keep interactions small, optional, and progressive-enhancement friendly.
- Do not create real authentication, persistence, network calls, telemetry, or cookies.
- Existing interaction patterns include:
  - Toast messages via `data-toast`.
  - Diagnosis dialog via `data-open-diagnosis` and `data-diagnosis-dialog`.
  - Mobile navigation toggle.
  - Current-section nav highlighting.
- New interactions should be understandable without reading a manual.
- If JS fails, the main page should still be readable.

## Accessibility requirements

Before considering work done, check:

- Keyboard navigation reaches meaningful controls.
- Focus states are visible.
- Buttons and links have accessible names.
- Form fields have labels or screen-reader labels.
- Color contrast remains readable.
- Decorative images are hidden from screen readers with empty alt text.
- Dialogs can be closed and do not trap users awkwardly.
- Mobile menu state updates `aria-expanded` correctly.

## Responsive behavior

The site should work from 320px-wide mobile screens to large desktop screens.

When changing layout, manually inspect or reason through at least:

- 320px / 375px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Avoid horizontal scrolling unless it is an intentional, contained UI pattern.

## Development workflow for Codex

When asked to make changes:

1. Inspect the relevant files first.
2. Make the smallest coherent change that satisfies the request.
3. Preserve the joke-site concept and Japanese tone.
4. Run validation checks listed below when possible.
5. Summarize what changed, which files changed, and what was verified.

For larger redesigns or multi-step feature work, propose or maintain a short implementation plan in the response or a temporary note. Do not create extra planning files unless the user asks or the task is genuinely complex.

## Running the site locally

No install step is required.

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Opening `index.html` directly in a browser should also work.

## Validation checks

There is no formal test suite. Run these checks after modifying HTML/CSS/JS/assets.

### 1. Verify local references in `index.html`

```bash
python3 - <<'PY'
from pathlib import Path
import re
import sys

root = Path('.')
html_path = root / 'index.html'
html = html_path.read_text(encoding='utf-8')

refs = set(re.findall(r'''(?:src|href)=["']([^"']+)["']''', html))
ignore_prefixes = ('#', 'http://', 'https://', 'mailto:', 'tel:', 'javascript:')
missing = []

for ref in sorted(refs):
    if ref.startswith(ignore_prefixes):
        continue
    path = ref.split('#', 1)[0].split('?', 1)[0]
    if path and not (root / path).exists():
        missing.append(ref)

if missing:
    print('Missing local references:')
    for item in missing:
        print(f'- {item}')
    sys.exit(1)

print('OK: all local src/href references in index.html exist')
PY
```

### 2. Quick syntax smoke check for JavaScript

If Node.js is available:

```bash
node --check app.js
```

If Node.js is not available, at minimum inspect `app.js` carefully for obvious syntax errors.

### 3. Manual browser check

After serving locally, check:

- Hero section renders correctly.
- Header navigation works.
- Mobile menu opens/closes.
- Main CTA buttons show toast messages.
- Login submit shows a fake/static toast.
- Diagnosis dialog opens, runs, and closes.
- No console errors appear during basic interactions.

## Definition of done

A change is done when:

- The page still opens as a static site.
- The visual style still matches チキンポータル.
- The joke is understandable without extra explanation.
- No real user data is collected or transmitted.
- HTML references resolve to existing local files.
- JS has no obvious syntax errors.
- The change works on both desktop and mobile layouts.
- The final response lists changed files and validation performed.

## Suggested future enhancements

These are acceptable directions if the user asks for expansion:

- Additional joke pages such as `/stories.html`, `/diagnosis.html`, or `/gentle-map.html`.
- More “チキり体験” cards.
- A fake onboarding flow with increasingly gentle steps.
- A printable “チキンお守り”.
- A mock pricing page with plans like 「無料で様子を見る」 and 「そっと応援プラン」.
- A fake status page: 「チキンポータルは今日も平和です」.
- More refined mascot art or seasonal variants.

If adding pages, keep shared navigation and visual language consistent. For more than one page, consider introducing a small shared CSS section map in comments, but do not add a framework by default.

## Pull request / handoff summary format

When preparing a PR-style summary, use:

```text
## Summary
- ...

## Changed files
- ...

## Validation
- [x] Local reference check
- [x] JS syntax check, if available
- [x] Manual browser smoke check, if performed

## Notes
- ...
```

Be explicit about checks that were not run and why.
