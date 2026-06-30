// Baton Rouge Jazz calendar renderer
// Builds the visible calendar and MusicEvent schema from window.BATONROUGEJAZZ_GIGS.

(() => {
  const gigs = Array.isArray(window.BATONROUGEJAZZ_GIGS) ? window.BATONROUGEJAZZ_GIGS : [];
  const list = document.getElementById('jazzGigsList') || document.querySelector('.gig-list');
  const empty = document.querySelector('.gig-empty');
  if (!list) return;

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
