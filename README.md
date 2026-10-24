# Oga-Sunny-
OgaSunny is a road-savvy app idea built to help people find safer routes, stay aware of road conditions, and get local guidance when traveling.

## Public deployment
This repository now contains a lightweight static landing page ready to deploy on Vercel or any static host.

## Run locally
```bash
npm install
npm start
```

Then open http://localhost:3000

## Deploy to Vercel
1. Push this repository to GitHub.
2. Go to https://vercel.com and import the repository.
3. Select the default settings and deploy.
4. Your app will be published at a public Vercel URL.

5. @workspace Add monetization to oga-sunny-jx - Keep existing Next.js 14 app working, just add these features, don't delete pages.

1. FEATURED LISTING SYSTEM:
- In types, add to House: isFeatured boolean, featuredUntil date
- In app/find/page.tsx: Sort logic = featured houses first, then by distance. Featured card style: border-2 border-yellow-400, badge "⭐ OGA SUNNY FEATURED" with yellow bg black text, glow effect shadow-yellow-400/50.
- If featured, show at top with animation pulse.

2. LANDLORD PAGE PAYSTACK INTEGRATION:
- In app/landlord/page.tsx after house form success:
-- Show 2 buttons:
--- Button 1: "✅ House Listed FREE (Basic)"
--- Button 2: "⭐ Pay N1,500 to Feature for 7 Days - Make Tenant See You First" -> onClick window.open('https://paystack.com/pay/oga-sunny-featured', '_blank') - replace with Paystack payment link placeholder. After click, show "After payment, send proof to WhatsApp 080... to activate featured"
-- Save isFeatured = false by default, if user claims paid, admin can set true in localStorage via /admin page.
- Add counter: "Free listing: 1/1 used - Next listing N2,000"

3. TRENCHES CHOP MONETIZATION:
- In app/trenches-chop/page.tsx for each food spot card, if isFeatured show same yellow featured badge.
- Add button below: "Food Vendors: Feature Your Spot for N500/week - WhatsApp Us" linking to wa.me/234... with message "I want to feature my food spot on Oga Sunny"

4. MUSIC MONETIZATION:
- In app/music/page.tsx add section below player:
-- Title "Support OORGANIC Movement"
-- 3 donation buttons: N100, N500, N1,000 using Paystack links placeholders: https://paystack.com/pay/oga-sunny-support - style with neon green.
-- Text: "Mararaba at Night was never a curse, na factory. Support PK to drop more OORGANIC"
-- Add Audiomack iframe already there + link "Stream on Audiomack to support"

5. ADMIN PAGE /admin:
- Create app/admin/page.tsx with password input "pk2024" hardcoded.
- Shows all houses from localStorage, toggle featured on/off, delete house, shows stats: total houses, featured count, total plays.
- Save back to localStorage.

6. AdSense placeholder: In app/layout.tsx add comment for AdSense script, add div ad-placeholder for future ads.

Keep Tailwind, black #0A0A0A, neon green #00FF88, yellow #FFD500 style.

Commit: "Add Monetization - Featured Listings N1500, Food N500, Support OORGANIC + Admin Panel"
Push to main.

## Live URL
The project homepage is configured as:
https://oga-sunny.vercel.app
