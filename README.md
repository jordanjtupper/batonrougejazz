Baton Rouge Jazz calendar system - safer fallback version

Upload these three files to the ROOT of the batonrougejazz.com GitHub repo, not inside a folder:

- index.html
- gigs-feed.js
- batonrougejazz-calendar.js

Important: if the site still shows no gigs after upload, hard refresh the browser (Ctrl+F5) or open in incognito. GitHub Pages/browser caching can keep the old broken JS file for a bit.

This version includes a built-in fallback gig list inside batonrougejazz-calendar.js, so the calendar should still render even if gigs-feed.js fails to load. Keep editing gigs-feed.js for future date changes.
