/**
 * EventPulse 3D - Main Application Logic
 * Implements filtering, search, modals, form validation,
 * countdown timers, 3D card tilt, confetti, and local storage management.
 */

// Application State
const AppState = {
  events: [...INITIAL_EVENTS],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'date',
  activeModal: null,
  currentEventForDetails: null,
  currentEventForRegistration: null,
  countdownInterval: null
};

// DOM Content Loaded - Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSearchAndFilters();
  initFeaturedEvents();
  renderEventsGrid();
  initCountdownTimers();
  initRegistrationForm();
  initMyTicketsDrawer();
  updateTicketsBadge();
});

/* ========================================================
   1. Theme Management (Dark / Light Mode)
   ======================================================== */
function initTheme() {
  const savedTheme = StorageManager.getTheme();
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      StorageManager.setTheme(newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'light') {
      icon.className = 'fas fa-moon';
      icon.setAttribute('title', 'Switch to Dark Mode');
    } else {
      icon.className = 'fas fa-sun';
      icon.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

/* ========================================================
   2. Responsive Navigation & Mobile Menu
   ======================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ========================================================
   3. Search & Filter Suite
   ======================================================== */
function initSearchAndFilters() {
  const searchInput = document.getElementById('event-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const categoryPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('event-sort-select');

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = AppState.searchQuery.length > 0 ? 'block' : 'none';
      }
      renderEventsGrid();
    });
  }

  // Clear Search
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderEventsGrid();
    });
  }

  // Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.selectedCategory = pill.dataset.category || 'all';
      renderEventsGrid();
    });
  });

  // Sort Selection
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderEventsGrid();
    });
  }
}

/* ========================================================
   4. Featured Events & Dynamic Countdown Timers
   ======================================================== */
function initFeaturedEvents() {
  const featuredContainer = document.getElementById('featured-events-grid');
  if (!featuredContainer) return;

  const featured = AppState.events.filter(e => e.isFeatured);
  featuredContainer.innerHTML = featured.map(evt => createFeaturedCardHTML(evt)).join('');

  // Attach 3D tilt and click handlers to featured cards
  featuredContainer.querySelectorAll('.featured-event-card').forEach(card => {
    apply3DTiltEffect(card);
  });
}

function createFeaturedCardHTML(evt) {
  return `
    <article class="featured-event-card glass-panel" data-id="${evt.id}">
      <div class="featured-badge"><i class="fas fa-bolt"></i> Spotlight Event</div>
      <div class="featured-image-wrapper">
        <img src="${evt.image}" alt="${evt.title}" loading="lazy" />
        <span class="category-tag"><i class="fas fa-tag"></i> ${evt.categoryLabel}</span>
      </div>
      <div class="featured-content">
        <div class="event-meta-row">
          <span class="meta-date"><i class="far fa-calendar-alt"></i> ${evt.displayDate}</span>
          <span class="price-pill ${evt.price === 'Free' ? 'free' : 'paid'}">${evt.price}</span>
        </div>
        <h3 class="featured-title">${evt.title}</h3>
        <p class="featured-desc">${evt.description}</p>
        <p class="featured-venue"><i class="fas fa-map-marker-alt"></i> ${evt.venue}</p>

        <!-- Live Dynamic Countdown -->
        <div class="countdown-container" data-target-date="${evt.date}">
          <div class="countdown-unit">
            <span class="cd-number days">00</span>
            <span class="cd-label">Days</span>
          </div>
          <div class="countdown-unit">
            <span class="cd-number hours">00</span>
            <span class="cd-label">Hours</span>
          </div>
          <div class="countdown-unit">
            <span class="cd-number minutes">00</span>
            <span class="cd-label">Mins</span>
          </div>
          <div class="countdown-unit">
            <span class="cd-number seconds">00</span>
            <span class="cd-label">Secs</span>
          </div>
        </div>

        <div class="featured-actions">
          <button class="btn btn-secondary" onclick="openEventDetails('${evt.id}')">
            <i class="fas fa-info-circle"></i> Details
          </button>
          <button class="btn btn-primary" onclick="openRegistrationModal('${evt.id}')">
            <i class="fas fa-ticket-alt"></i> Register Now
          </button>
        </div>
      </div>
    </article>
  `;
}

function initCountdownTimers() {
  function updateTimers() {
    const timerElements = document.querySelectorAll('.countdown-container');
    const now = new Date().getTime();

    timerElements.forEach(el => {
      const targetDateStr = el.dataset.targetDate;
      if (!targetDateStr) return;

      const targetDate = new Date(targetDateStr).getTime();
      const distance = targetDate - now;

      const daysEl = el.querySelector('.days');
      const hoursEl = el.querySelector('.hours');
      const minsEl = el.querySelector('.minutes');
      const secsEl = el.querySelector('.seconds');

      if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    });
  }

  updateTimers();
  if (AppState.countdownInterval) clearInterval(AppState.countdownInterval);
  AppState.countdownInterval = setInterval(updateTimers, 1000);
}

/* ========================================================
   5. Event Grid Rendering & Filtering
   ======================================================== */
function renderEventsGrid() {
  const gridContainer = document.getElementById('events-grid');
  const countBadge = document.getElementById('filtered-count');
  if (!gridContainer) return;

  // Filter by category
  let filtered = AppState.events.filter(evt => {
    if (AppState.selectedCategory === 'all') return true;
    return evt.category === AppState.selectedCategory;
  });

  // Filter by search query
  if (AppState.searchQuery) {
    const q = AppState.searchQuery;
    filtered = filtered.filter(evt => {
      return (
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.categoryLabel.toLowerCase().includes(q) ||
        evt.city.toLowerCase().includes(q)
      );
    });
  }

  // Sort events
  filtered.sort((a, b) => {
    if (AppState.sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (AppState.sortBy === 'popularity') {
      return a.seatsRemaining - b.seatsRemaining; // fewer remaining = hotter/more popular
    } else if (AppState.sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'Event' : 'Events'} Found`;
  }

  // Handle empty state
  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-icon"><i class="fas fa-calendar-times"></i></div>
        <h3>No Events Found</h3>
        <p>We couldn't find any events matching "${AppState.searchQuery || AppState.selectedCategory}". Try clearing your filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">
          <i class="fas fa-redo"></i> Reset Filters
        </button>
      </div>
    `;
    return;
  }

  // Render cards
  gridContainer.innerHTML = filtered.map(evt => createEventCardHTML(evt)).join('');

  // Attach 3D interactive tilt effect
  gridContainer.querySelectorAll('.event-card').forEach(card => {
    apply3DTiltEffect(card);
  });
}

function createEventCardHTML(evt) {
  const percentFilled = Math.round(((evt.totalSeats - evt.seatsRemaining) / evt.totalSeats) * 100);

  return `
    <article class="event-card glass-panel" data-id="${evt.id}">
      <div class="card-image-box">
        <img src="${evt.image}" alt="${evt.title}" loading="lazy" />
        <span class="category-tag"><i class="fas fa-tag"></i> ${evt.categoryLabel}</span>
        <span class="card-price-pill ${evt.price === 'Free' ? 'free' : 'paid'}">${evt.price}</span>
      </div>
      <div class="card-body">
        <div class="card-date-line">
          <i class="far fa-calendar-alt"></i> ${evt.displayDate}
        </div>
        <h3 class="card-title">${evt.title}</h3>
        <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${evt.venue}</p>
        <p class="card-description">${evt.description}</p>

        <!-- Seats Capacity Bar -->
        <div class="seats-status-container">
          <div class="seats-label-row">
            <span><i class="fas fa-users"></i> Availability</span>
            <span class="seats-highlight">${evt.seatsRemaining} spots left</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percentFilled}%"></div>
          </div>
        </div>

        <div class="card-footer-actions">
          <button class="btn btn-secondary btn-sm" onclick="openEventDetails('${evt.id}')">
            <i class="fas fa-info-circle"></i> Info
          </button>
          <button class="btn btn-primary btn-sm" onclick="openRegistrationModal('${evt.id}')">
            <i class="fas fa-ticket-alt"></i> Register
          </button>
        </div>
      </div>
    </article>
  `;
}

function resetFilters() {
  AppState.searchQuery = '';
  AppState.selectedCategory = 'all';
  const searchInput = document.getElementById('event-search-input');
  if (searchInput) searchInput.value = '';
  const clearSearchBtn = document.getElementById('search-clear-btn');
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';

  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.dataset.category === 'all') pill.classList.add('active');
    else pill.classList.remove('active');
  });

  renderEventsGrid();
}

/* ========================================================
   6. Interactive 3D Card Tilt Physics
   ======================================================== */
function apply3DTiltEffect(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

/* ========================================================
   7. Event Details Modal
   ======================================================== */
function openEventDetails(eventId) {
  const evt = AppState.events.find(e => e.id === eventId);
  if (!evt) return;

  AppState.currentEventForDetails = evt;
  const modal = document.getElementById('event-details-modal');
  const content = document.getElementById('event-details-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="details-banner-wrap">
      <img src="${evt.image}" alt="${evt.title}" class="details-banner-img" />
      <span class="category-tag"><i class="fas fa-tag"></i> ${evt.categoryLabel}</span>
      <span class="card-price-pill ${evt.price === 'Free' ? 'free' : 'paid'}">${evt.price}</span>
    </div>

    <div class="details-main-body">
      <h2 class="details-title">${evt.title}</h2>
      
      <div class="details-meta-grid">
        <div class="meta-item">
          <i class="far fa-calendar-alt meta-icon"></i>
          <div>
            <strong>Date & Time</strong>
            <p>${evt.displayDate}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-map-marker-alt meta-icon"></i>
          <div>
            <strong>Venue & Location</strong>
            <p>${evt.venue}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-chair meta-icon"></i>
          <div>
            <strong>Capacity</strong>
            <p>${evt.seatsRemaining} seats available of ${evt.totalSeats}</p>
          </div>
        </div>
      </div>

      <div class="details-section">
        <h3>About This Event</h3>
        <p>${evt.detailedDescription}</p>
      </div>

      <div class="details-section">
        <h3>Featured Speakers & Hosts</h3>
        <div class="speakers-list">
          ${evt.speakers.map(spk => `
            <div class="speaker-pill">
              <div class="speaker-avatar"><i class="fas fa-user-tie"></i></div>
              <div>
                <h4>${spk.name}</h4>
                <small>${spk.role}</small>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="details-section">
        <h3>Event Agenda Schedule</h3>
        <ul class="agenda-timeline">
          ${evt.agenda.map(item => `<li><i class="fas fa-check-circle"></i> <span>${item}</span></li>`).join('')}
        </ul>
      </div>

      <div class="details-footer">
        <button class="btn btn-secondary" onclick="closeModal('event-details-modal')">
          Close
        </button>
        <button class="btn btn-primary" onclick="closeModal('event-details-modal'); openRegistrationModal('${evt.id}');">
          <i class="fas fa-ticket-alt"></i> Proceed to Registration
        </button>
      </div>
    </div>
  `;

  openModal('event-details-modal');
}

/* ========================================================
   8. Registration Form & JavaScript Form Validation
   ======================================================== */
function initRegistrationForm() {
  const form = document.getElementById('event-registration-form');
  const eventSelect = document.getElementById('reg-event-select');

  // Populate Event dropdown options
  if (eventSelect) {
    eventSelect.innerHTML = `
      <option value="">-- Choose an Event --</option>
      ${AppState.events.map(e => `<option value="${e.id}">${e.title} (${e.price})</option>`).join('')}
    `;
  }

  // Real-time input validation listeners
  const fields = ['reg-name', 'reg-email', 'reg-phone', 'reg-event-select', 'reg-ticket-type'];
  fields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => validateField(fieldId));
      el.addEventListener('blur', () => validateField(fieldId));
    }
  });

  // Form submission handler
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function openRegistrationModal(eventId = null) {
  const modal = document.getElementById('registration-modal');
  const form = document.getElementById('event-registration-form');
  const select = document.getElementById('reg-event-select');

  if (form) form.reset();
  clearAllValidationErrors();

  if (eventId && select) {
    select.value = eventId;
  }

  openModal('registration-modal');
}

function validateField(fieldId) {
  const el = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (!el || !errorEl) return true;

  let isValid = true;
  let errorMsg = '';
  const val = el.value.trim();

  switch (fieldId) {
    case 'reg-name':
      if (!val) {
        isValid = false;
        errorMsg = 'Please enter your full name.';
      } else if (val.length < 3) {
        isValid = false;
        errorMsg = 'Name must be at least 3 characters long.';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(val)) {
        isValid = false;
        errorMsg = 'Name can only contain alphabetic characters and spaces.';
      }
      break;

    case 'reg-email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!val) {
        isValid = false;
        errorMsg = 'Email address is required.';
      } else if (!emailRegex.test(val)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address (e.g., student@kiit.ac.in).';
      }
      break;

    case 'reg-phone':
      const phoneClean = val.replace(/[\s()-]/g, '');
      const phoneRegex = /^[+]?[0-9]{10,14}$/;
      if (!val) {
        isValid = false;
        errorMsg = 'Phone number is required.';
      } else if (!phoneRegex.test(phoneClean)) {
        isValid = false;
        errorMsg = 'Please enter a valid 10-digit phone number.';
      }
      break;

    case 'reg-event-select':
      if (!val) {
        isValid = false;
        errorMsg = 'Please select an event to register for.';
      }
      break;

    case 'reg-ticket-type':
      if (!val) {
        isValid = false;
        errorMsg = 'Please select a ticket tier.';
      }
      break;
  }

  if (!isValid) {
    el.classList.add('input-invalid');
    el.classList.remove('input-valid');
    errorEl.textContent = errorMsg;
    errorEl.style.display = 'block';
  } else {
    el.classList.remove('input-invalid');
    el.classList.add('input-valid');
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }

  return isValid;
}

function clearAllValidationErrors() {
  const fields = ['reg-name', 'reg-email', 'reg-phone', 'reg-event-select', 'reg-ticket-type'];
  fields.forEach(f => {
    const el = document.getElementById(f);
    const err = document.getElementById(`${f}-error`);
    if (el) {
      el.classList.remove('input-invalid', 'input-valid');
    }
    if (err) {
      err.textContent = '';
      err.style.display = 'none';
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const isNameValid = validateField('reg-name');
  const isEmailValid = validateField('reg-email');
  const isPhoneValid = validateField('reg-phone');
  const isEventValid = validateField('reg-event-select');
  const isTicketValid = validateField('reg-ticket-type');

  if (!isNameValid || !isEmailValid || !isPhoneValid || !isEventValid || !isTicketValid) {
    showToast('Please correct the highlighted errors before submitting.', 'error');
    return;
  }

  const eventId = document.getElementById('reg-event-select').value;
  const targetEvent = AppState.events.find(evt => evt.id === eventId);
  const attendeeName = document.getElementById('reg-name').value.trim();
  const attendeeEmail = document.getElementById('reg-email').value.trim();
  const attendeePhone = document.getElementById('reg-phone').value.trim();
  const ticketType = document.getElementById('reg-ticket-type').value;
  const ticketQuantity = parseInt(document.getElementById('reg-quantity').value, 10) || 1;

  // Build registration object
  const newRegistration = {
    eventId: eventId,
    eventTitle: targetEvent ? targetEvent.title : 'Event Registration',
    eventDate: targetEvent ? targetEvent.displayDate : 'TBA',
    eventVenue: targetEvent ? targetEvent.venue : 'TBA',
    eventImage: targetEvent ? targetEvent.image : '',
    eventPrice: targetEvent ? targetEvent.price : 'Free',
    attendeeName: attendeeName,
    attendeeEmail: attendeeEmail,
    attendeePhone: attendeePhone,
    ticketType: ticketType,
    ticketQuantity: ticketQuantity
  };

  // Save to LocalStorage
  const savedRecord = StorageManager.saveRegistration(newRegistration);

  // Close Registration Modal
  closeModal('registration-modal');

  // Launch Confetti Celebration
  fireCelebrationConfetti();

  // Update badge
  updateTicketsBadge();

  // Show 3D Digital Ticket Pass Modal
  showTicketConfirmationModal(savedRecord);
  showToast('Registration successful! Your 3D pass is generated.', 'success');
}

/* ========================================================
   9. Confetti Fireworks Animation
   ======================================================== */
function fireCelebrationConfetti() {
  if (typeof confetti === 'function') {
    // Left cannon
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#06b6d4', '#a855f7', '#f43f5e', '#38bdf8']
    });

    // Right cannon
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#06b6d4', '#a855f7', '#f43f5e', '#38bdf8']
    });
  }
}

/* ========================================================
   10. Interactive 3D Digital Ticket Pass Modal
   ======================================================== */
function showTicketConfirmationModal(ticket) {
  const modal = document.getElementById('ticket-modal');
  const container = document.getElementById('ticket-modal-content');
  if (!modal || !container || !ticket) return;

  container.innerHTML = `
    <div class="ticket-celebration-header">
      <div class="success-icon-badge"><i class="fas fa-check"></i></div>
      <h2>Registration Confirmed!</h2>
      <p>Here is your digital VIP pass. Stored securely in your browser's local storage.</p>
    </div>

    <!-- 3D Interactive Ticket Pass -->
    <div class="pass-3d-wrapper" id="interactive-ticket-pass">
      <div class="ticket-card glass-panel">
        <div class="ticket-stub-left">
          <div class="ticket-badge-pill">${ticket.ticketType.toUpperCase()} PASS</div>
          <h3 class="ticket-event-name">${ticket.eventTitle}</h3>
          <div class="ticket-info-grid">
            <div>
              <span class="t-label">ATTENDEE</span>
              <strong class="t-val">${ticket.attendeeName}</strong>
            </div>
            <div>
              <span class="t-label">BOOKING ID</span>
              <strong class="t-val text-cyan">${ticket.id}</strong>
            </div>
            <div>
              <span class="t-label">DATE & TIME</span>
              <strong class="t-val">${ticket.eventDate}</strong>
            </div>
            <div>
              <span class="t-label">QUANTITY</span>
              <strong class="t-val">${ticket.ticketQuantity} Pass(es)</strong>
            </div>
          </div>
          <div class="ticket-venue-row">
            <i class="fas fa-map-marker-alt"></i> ${ticket.eventVenue}
          </div>
        </div>

        <div class="ticket-divider">
          <div class="notch notch-top"></div>
          <div class="notch notch-bottom"></div>
        </div>

        <div class="ticket-stub-right">
          <div class="qr-code-box">
            <i class="fas fa-qrcode qr-icon"></i>
            <span class="qr-caption">SCAN AT GATE</span>
          </div>
          <div class="barcode-sim">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="ticket-actions-row">
      <button class="btn btn-secondary" onclick="window.print()">
        <i class="fas fa-print"></i> Print Ticket
      </button>
      <button class="btn btn-primary" onclick="closeModal('ticket-modal')">
        <i class="fas fa-check-circle"></i> Done
      </button>
    </div>
  `;

  const passEl = document.getElementById('interactive-ticket-pass');
  if (passEl) apply3DTiltEffect(passEl);

  openModal('ticket-modal');
}

/* ========================================================
   11. LocalStorage "My Registrations" Drawer / Modal
   ======================================================== */
function initMyTicketsDrawer() {
  const triggerBtn = document.getElementById('my-tickets-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', openMyTicketsModal);
  }
}

function openMyTicketsModal() {
  const modal = document.getElementById('my-tickets-modal');
  const container = document.getElementById('my-tickets-list');
  if (!modal || !container) return;

  const tickets = StorageManager.getRegistrations();

  if (tickets.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-icon"><i class="fas fa-ticket-alt"></i></div>
        <h3>No Registrations Yet</h3>
        <p>You haven't registered for any events yet. Browse our upcoming events and reserve your spot!</p>
        <button class="btn btn-primary" onclick="closeModal('my-tickets-modal'); document.getElementById('events').scrollIntoView({ behavior: 'smooth' });">
          <i class="fas fa-compass"></i> Explore Events
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="tickets-summary-bar">
        <span>You have <strong>${tickets.length}</strong> active registered ticket(s).</span>
      </div>
      <div class="registered-tickets-stack">
        ${tickets.map(t => `
          <div class="registered-item-card glass-panel" id="ticket-item-${t.id}">
            <div class="item-info">
              <span class="item-booking-id">${t.id} • ${t.ticketType} Pass</span>
              <h4>${t.eventTitle}</h4>
              <p><i class="far fa-calendar-alt"></i> ${t.eventDate}</p>
              <p><i class="fas fa-map-marker-alt"></i> ${t.eventVenue}</p>
              <small class="attendee-tag"><i class="fas fa-user"></i> Attendee: ${t.attendeeName} (${t.ticketQuantity} ticket(s))</small>
            </div>
            <div class="item-actions">
              <button class="btn btn-secondary btn-sm" onclick="viewTicketPassById('${t.id}')">
                <i class="fas fa-eye"></i> View Pass
              </button>
              <button class="btn btn-danger btn-sm" onclick="cancelRegistrationPrompt('${t.id}')">
                <i class="fas fa-trash-alt"></i> Cancel
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  openModal('my-tickets-modal');
}

function viewTicketPassById(id) {
  const ticket = StorageManager.getRegistrationById(id);
  if (!ticket) return;
  closeModal('my-tickets-modal');
  showTicketConfirmationModal(ticket);
}

function cancelRegistrationPrompt(id) {
  if (confirm(`Are you sure you want to cancel booking ${id}? This cannot be undone.`)) {
    const success = StorageManager.deleteRegistration(id);
    if (success) {
      showToast(`Registration ${id} cancelled successfully.`, 'info');
      updateTicketsBadge();
      openMyTicketsModal(); // Refresh modal view
    } else {
      showToast('Failed to cancel registration.', 'error');
    }
  }
}

function updateTicketsBadge() {
  const badge = document.getElementById('my-tickets-count-badge');
  const tickets = StorageManager.getRegistrations();
  if (badge) {
    badge.textContent = tickets.length;
    badge.style.display = tickets.length > 0 ? 'inline-flex' : 'none';
  }
}

/* ========================================================
   12. Modal Helpers & Overlay Management
   ======================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    AppState.activeModal = modalId;
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    AppState.activeModal = null;
  }
}

// Global click listener to close modals when clicking backdrop or close buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
    AppState.activeModal = null;
  }
  if (e.target.closest('.modal-close-btn')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      AppState.activeModal = null;
    }
  }
});

// ESC key to close active modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && AppState.activeModal) {
    closeModal(AppState.activeModal);
  }
});

/* ========================================================
   13. Toast Notification Component
   ======================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-pill toast-${type} animate-slide-up`;

  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    error: 'fa-exclamation-triangle'
  };

  toast.innerHTML = `
    <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

