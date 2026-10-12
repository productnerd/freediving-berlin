# Freediving Berlin

Website draft for Freediving Berlin, an AIDA freediving school run by Anas Chair.

The page is one long dive: bright at the surface, dark navy at the bottom, with a rope
down the left edge. Each course hangs off the rope at its depth, and a small tag on the
rope shows the visitor's current depth as they scroll. The yellow buoy at the top opens
the newsletter sign-up.

## Run it

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Files

| File | What it holds |
|---|---|
| `index.html` | All content: hero, courses, about, footer, and the newsletter and booking dialogs |
| `styles.css` | Colours, type and layout. Design tokens are at the top in `:root` |
| `script.js` | Live depth reading on the rope, nav colour change, newsletter dialog |
| `booking.js` | Booking flow (course, date, details). Course dates are placeholder data at the top |
| `tasks/todo.md` | What is done, what is next, and every placeholder still to replace |

## Design

- Dark navy is the dominant colour, `#FAEC15` (buoy yellow) the accent.
- Headings are Spectral, everything else is Sofia Sans (both from Google Fonts).
- The rope sets the left edge (`--rope-x`); all content hangs to its right.
- A course's depth comes from `data-depth` on its `.stop` element. The depth reading
  interpolates between those marks, so a new course only needs a new `.stop` block.

## State of things

Front end only. Nothing is saved or sent yet.

- **Booking:** the flow works end to end in the browser, but the final step only shows a
  draft notice. It still needs a backend that stores bookings, emails a confirmation and
  sends a reminder two days before. It replaces Calendly, so no paid subscription.
- **Newsletter:** the form is not connected to a mailing list.
- **Placeholders:** prices, course dates, the 30 m depth for summer training, bio text,
  portfolio credits, contact details and all photos (Unsplash stand-ins). The full list
  is in `tasks/todo.md`.
- **Planned:** a pool / sea toggle (what it changes is still to be decided).

## Hosting

Any static host works (GitHub Pages, Cloudflare Pages, Netlify). Do not use Vercel.
