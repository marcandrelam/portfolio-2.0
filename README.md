# portfolio-2.0

Marc Andre Lam's design + marketing portfolio, built around a DVD menu: the landing page is a main menu, and each section opens like a chapter.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
```

## Controls

| Where | Input | Does |
| --- | --- | --- |
| Main menu | Hover, ↑ / ↓ | Moves the cyan highlight (wraps around) |
| Main menu | Enter, click | Opens the selected section |
| Any page | Esc, Backspace, "◀ Main Menu" | Back to the menu, with the highlight on the item you left from |

Screens fade to black between each other. With the OS "reduce motion" setting on, the highlight jumps instead of sliding.

## Where things live

- `src/content.ts` holds the site copy and the menu items.
- `src/components/MainMenu.tsx` is the menu and the sliding highlight.
- `src/components/PageShell.tsx` is the shared page frame with the back button.
- `src/pages/` has one file per section. They're placeholders for now.

## Roadmap

1. ~~Main menu: wordmark, menu, sliding highlight, keyboard and mouse~~
2. ~~Page shell: back button, Esc/Backspace, fade-to-black transitions~~
3. Featured Work as a scene selection screen (2×2 grid with chapter paging)
4. Experience, About and Fun layouts
5. Backgrounds: PS3-style wave shader, neon fish, jellyfish bokeh
6. Hidden "Setup" menu for switching variations, with choices saved in the URL
7. Polish: reduced motion, touch behavior, performance
