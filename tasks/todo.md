# Freediving Berlin site

Handoff notes for whoever picks this up next (Anas, or an agent working with him).
Start with "Questions for Anas": most of the remaining work is blocked on those answers.

## Done

- [x] Single-page descent: light surface at the top, navy at the bottom, rope with live depth reading
- [x] Yellow buoy on the waterline opens the newsletter sign-up (front end only)
- [x] Three offerings pinned to depths: Try Freediving (9 m), Summer advanced training (30 m), Deepspot winter seminars (45 m)
- [x] Built-in booking dialog replacing Calendly: course, date, details, confirmation (front end only)
- [x] Playful restyle: Bagel Fat One headings in all caps, Nunito body, squishy yellow buttons, tilted rounded photos
- [x] Pool / Sea scenery toggle (bottom right, remembered per visitor). It changes visuals only.
  - Sea: fish change with depth (small school, striped fish, jellyfish and ray, anglerfish), shipwreck reef at the bottom
  - Pool: tiled walls, rubber duck and beach ball on the surface, sinking goggles, tiled pool floor with lane lines
- [x] Nav label "About instructor"; nav and headings in all caps
- [x] Checked at 1440 and 375 px in both sceneries: no horizontal overflow, no console errors

## Questions for Anas

Ask these first. Each one unblocks an item under "Next".

1. **Booking model:** do you run fixed group dates that you publish (what the draft assumes),
   or open availability where a student picks any free slot?
2. **Sender address:** which email address should booking confirmations and reminders come
   from? Sending from your own domain needs a domain you control.
3. **AIDA courses:** should AIDA 1 to 4 certification courses be listed as their own
   courses, or do the three current offerings cover everything?
4. **Summer training:** what depth should it show on the rope (the draft says 30 m), and
   which lake or location?
5. **Try Freediving:** which dive tower, and is "Berlin" the right location to print?
6. **Real content:** prices, upcoming dates and group sizes, bio, film and stage credits,
   contact email, Instagram, imprint and privacy text, and your own photos.

## Next

- [ ] **Booking backend** (replaces Calendly, must stay free of subscriptions):
  store bookings, send a confirmation email on booking, send a reminder two days before.
  - Needs: a small database, an email service, and a daily scheduled job for reminders.
  - Suggested: Supabase (database, edge function, pg_cron) plus Resend for email, both on free plans.
    Cloudflare Workers with D1 and a cron trigger is an equivalent free alternative.
  - Not decided: which account hosts it. Maria's Supabase account already has two active
    projects, which is the usual free-plan limit, so Anas may want his own account.
  - Also needed: a way for Anas to add dates and see who booked (a table editor is enough to start).
  - Front end hook: `booking.js` holds placeholder `COURSES` data and a submit handler that
    only shows a draft notice. Replace both with calls to the backend.
- [ ] **Newsletter:** connect the buoy form to a mailing list (provider not chosen).
- [ ] **Pool scenery mid-depths:** only the surface and the floor have pool toys so far.
- [ ] **Hosting:** GitHub Pages, Cloudflare Pages or Netlify. Never Vercel.

## Placeholders to replace

- [ ] Course dates and places left (top of `booking.js`)
- [ ] Prices, the 30 m depth for summer training, "Dive tower, Berlin" and "Open water" locations
- [ ] Bio text and the six credits
- [ ] All photos (Unsplash stand-ins)
- [ ] Contact email, Instagram, Imprint and Privacy links
- [ ] "Berlin's friendliest freediving instructor" is the brand line Maria asked for; confirm Anas is happy with it
