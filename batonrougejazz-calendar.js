// Baton Rouge Jazz calendar renderer
// Builds the visible calendar and MusicEvent schema from window.BATONROUGEJAZZ_GIGS.

(() => {
  const DEFAULT_BATONROUGEJAZZ_GIGS = [
  {
    date: "2026-06-21",
    startTime: "10:00",
    endTime: "13:00",
    venue: "City Cafe",
    city: "Baton Rouge",
    state: "LA",
    displayTime: "Brunch",
    detailsHtml: `Jazz Brunch · 4710 O'Neal Ln, Baton Rouge, LA · <a href="https://citycafebr.net" rel="noopener" target="_blank">citycafebr.net</a>`,
    status: "public"
  },
  {
    date: "2026-06-24",
    startTime: "18:00",
    endTime: "22:00",
    venue: "The Brakes Bar",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `5412 Government St, Baton Rouge, LA · <a href="https://spokeandhubbr.com/brakes-bar" rel="noopener" target="_blank">spokeandhubbr.com</a> · <a href="https://www.facebook.com/thebrakesbarbr/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-06-28",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Copa",
    city: "Baton Rouge",
    state: "LA",
    displayTime: "Brunch",
    detailsHtml: `Jazz Brunch · Baton Rouge, LA`,
    status: "public"
  },
  {
    date: "2026-07-01",
    startTime: "18:00",
    endTime: "22:00",
    venue: "The Brakes Bar",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `5412 Government St, Baton Rouge, LA · <a href="https://spokeandhubbr.com/brakes-bar" rel="noopener" target="_blank">spokeandhubbr.com</a> · <a href="https://www.facebook.com/thebrakesbarbr/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-07-15",
    startTime: "18:00",
    endTime: "22:00",
    venue: "The Brakes Bar",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `5412 Government St, Baton Rouge, LA · <a href="https://spokeandhubbr.com/brakes-bar" rel="noopener" target="_blank">spokeandhubbr.com</a> · <a href="https://www.facebook.com/thebrakesbarbr/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-07-22",
    startTime: "18:00",
    endTime: "22:00",
    venue: "The Brakes Bar",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `5412 Government St, Baton Rouge, LA · <a href="https://spokeandhubbr.com/brakes-bar" rel="noopener" target="_blank">spokeandhubbr.com</a> · <a href="https://www.facebook.com/thebrakesbarbr/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-07-26",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Copa",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `Baton Rouge, LA`,
    status: "public"
  },
  {
    date: "2026-07-29",
    startTime: "18:00",
    endTime: "22:00",
    venue: "The Brakes Bar",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `5412 Government St, Baton Rouge, LA · <a href="https://spokeandhubbr.com/brakes-bar" rel="noopener" target="_blank">spokeandhubbr.com</a> · <a href="https://www.facebook.com/thebrakesbarbr/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-08-08",
    startTime: "11:00",
    endTime: "14:00",
    venue: "Community Grocery",
    city: "Woodville",
    state: "MS",
    detailsHtml: `525 Commercial Row, Woodville, MS · <a href="https://communitygroceryms.com" rel="noopener" target="_blank">communitygroceryms.com</a> · <a href="https://www.facebook.com/communitygroceryms/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-08-09",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Copa",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `Baton Rouge, LA`,
    status: "public"
  },
  {
    date: "2026-08-22",
    startTime: "11:00",
    endTime: "14:00",
    venue: "Community Grocery",
    city: "Woodville",
    state: "MS",
    detailsHtml: `525 Commercial Row, Woodville, MS · <a href="https://communitygroceryms.com" rel="noopener" target="_blank">communitygroceryms.com</a> · <a href="https://www.facebook.com/communitygroceryms/" rel="noopener" target="_blank">Facebook</a>`,
    status: "public"
  },
  {
    date: "2026-09-15",
    startTime: "17:30",
    endTime: "20:30",
    venue: "Bin 77",
    city: "Baton Rouge",
    state: "LA",
    detailsHtml: `Baton Rouge, LA`,
    status: "public"
  },
  {
    date: "2026-12-12",
    venue: "Private Wedding",
    city: "New Orleans",
    state: "LA",
    displayTime: "Private Event",
    detailsHtml: `New Orleans, LA`,
    status: "private"
  }
];

  const gigs = Array.isArray(window.BATONROUGEJAZZ_GIGS) && window.BATONROUGEJAZZ_GIGS.length
    ? window.BATONROUGEJAZZ_GIGS
    : DEFAULT_BATONROUGEJAZZ_GIGS;
  const list = document.getElementById('jazzGigsList') || document.querySelector('.gig-list');
  const empty = document.querySelector('.gig-empty');
  if (!list) { console.warn('Baton Rouge Jazz calendar: no .gig-list or #jazzGigsList found.'); return; }

  const tzOffset = '-05:00';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseDate(date) {
    return new Date(`${date}T00:00:00`);
  }

  function addDays(dateString, days) {
    const d = parseDate(dateString);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function eventEndDate(gig) {
    if (!gig.endTime || !gig.startTime) return gig.date;
    return gig.endTime <= gig.startTime ? addDays(gig.date, 1) : gig.date;
  }

  function prettyTime(gig) {
    if (gig.displayTime) return gig.displayTime;
    if (!gig.startTime && !gig.endTime) return 'TBA';
    if (gig.startTime && !gig.endTime) return formatTime(gig.startTime);
    return `${formatTime(gig.startTime)} – ${formatTime(gig.endTime)}`;
  }

  function formatTime(value) {
    if (!value) return '';
    const [hRaw, mRaw] = value.split(':');
    let h = Number(hRaw);
    const m = Number(mRaw || '0');
    const suffix = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return m === 0 ? `${h}${suffix}` : `${h}:${String(m).padStart(2, '0')}${suffix}`;
  }

  function locationText(gig) {
    return gig.displayLocation || [gig.city, gig.state].filter(Boolean).join(', ');
  }

  function detailsHtml(gig) {
    return gig.detailsHtml || locationText(gig);
  }

  function makeRow(gig) {
    const d = parseDate(gig.date);
    const row = document.createElement('div');
    row.className = 'gig';
    row.dataset.date = gig.date;
    row.innerHTML = `
      <div class="gig-date">${monthNames[d.getMonth()]}<br><span class="d">${String(d.getDate()).padStart(2, '0')}</span><br>${d.getFullYear()}</div>
      <div class="gig-venue">
        <h3>${escapeHtml(gig.venue)}</h3>
        <p>${detailsHtml(gig)}</p>
      </div>
      <div class="gig-time">${escapeHtml(prettyTime(gig))}</div>
    `;
    return row;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  const upcoming = gigs
    .filter(gig => gig.date && parseDate(gig.date) >= today)
    .sort((a, b) => `${a.date}T${a.startTime || '23:59'}`.localeCompare(`${b.date}T${b.startTime || '23:59'}`));

  list.innerHTML = '';
  upcoming.forEach(gig => list.appendChild(makeRow(gig)));

  if (empty) empty.style.display = upcoming.length > 0 ? 'none' : 'block';

  const events = upcoming.map(gig => {
    const event = {
      '@type': 'MusicEvent',
      name: gig.status === 'private'
        ? `Standley, Tupper, & Petersen — ${gig.venue}`
        : `Standley, Tupper, & Petersen — Live Jazz at ${gig.venue}`,
      startDate: gig.startTime ? `${gig.date}T${gig.startTime}:00${tzOffset}` : gig.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      performer: { '@id': 'https://www.batonrougejazz.com/#group' },
      location: {
        '@type': 'Place',
        name: gig.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: gig.city || 'Baton Rouge',
          addressRegion: gig.state || 'LA',
          addressCountry: 'US'
        }
      }
    };
    if (gig.endTime) event.endDate = `${eventEndDate(gig)}T${gig.endTime}:00${tzOffset}`;
    if (gig.status !== 'private') {
      event.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.batonrougejazz.com/#gigs'
      };
    }
    return event;
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': events
  };

  const old = document.getElementById('generated-music-event-schema');
  if (old) old.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'generated-music-event-schema';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
})();
