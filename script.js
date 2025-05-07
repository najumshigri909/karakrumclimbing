document.addEventListener("DOMContentLoaded", function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');
  const submenuBtns = document.querySelectorAll('.submenu-btn');
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && 
        mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // Mobile dropdown menus
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = btn.parentElement;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
            d.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
        btn.setAttribute('aria-expanded', !isExpanded);
      }
    });
  });

  // Mobile submenus
  submenuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = btn.parentElement;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        // Close all other submenus at this level
        const parentList = submenu.parentElement;
        parentList.querySelectorAll('.submenu').forEach(sm => {
          if (sm !== submenu) {
            sm.classList.remove('active');
            sm.querySelector('.submenu-btn').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current submenu
        submenu.classList.toggle('active');
        btn.setAttribute('aria-expanded', !isExpanded);
      }
    });
  });

  // Close dropdowns when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // Update dropdown arrows on desktop hover
  if (window.innerWidth > 768) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-icon').style.transform = 'rotate(180deg)';
      });
      
      dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-icon').style.transform = 'rotate(0)';
      });
    });
  }



  // Hero Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let slideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function goToSlide(index) {
    clearInterval(slideInterval);
    showSlide(index);
    startSlider();
  }

  function changeSlide(n) {
    clearInterval(slideInterval);
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    showSlide(currentSlide);
    startSlider();
  }

  function startSlider() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
  }

  // Navigation buttons
  document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
  document.querySelector('.next').addEventListener('click', () => changeSlide(1));

  // Start the slider
  showSlide(currentSlide);
  startSlider();

  // Expeditions Carousel
  const expeditions = [
    {
      title: "Bondit Peaks (6660) Expedition",
      desc: "Muztagh Tower is also known as the Mustagh Tower. Muztagh is located in the Baltoro Muztagh, a subrange of the Karakoram range.",
      image: "images/expadition/banditpeakexpadition.jpeg",
      link: "#"
    },
    {
      title: "Chogolisa Expedition 7668-m",
      desc: "Chogolisa (or Bride Peak) is a mountain in the Karakorum region of Gilgit-Baltistan, Pakistan. A prominent yet challenging peak.",
      image: "images/expadition/Expedition-2.jpg",
      link: "#"
    },
    {
      title: "Drifika (6447M) Expedition",
      desc: "Drifika is a mountain that has a height of 6447 meters. It was first climbed in 1978 and lies in the Hushe Valley of Karakoram.",
      image: "images/expadition/Expedition-3.jpg",
      link: "#"
    },
    {
      title: "Baintha Brakk(7285M) Expedition",
      desc: "Baintha Brakk is also known as Ogre. It is a mountain that is too difficult to climb due to its steep rock walls and vertical nature.",
      image: "images/expadition/Expedition-4.jpg",
      link: "#"
    },
    {
      title: "Gasherbrum I (8080m) Expedition",
      desc: "Also called Hidden Peak, it is the 11th highest mountain in the world and the third highest in Pakistan.",
      image: "images/expadition/Expedition-5.jpg",
      link: "#"
    },
    {
      title: "Nanga Parbat (8126m) Expedition",
      desc: "The ninth-highest mountain on Earth, Nanga Parbat is known as the 'Killer Mountain' for its difficult climb.",
      image: "images/expadition/Expedition-6.jpg",
      link: "#"
    }
  ];

  let expeditionStartIndex = 0;
  const expeditionContainer = document.querySelector('.carousel-track');
  let expeditionInterval;

  function renderExpeditions() {
    expeditionContainer.innerHTML = '';
    
    // Show 3 cards at a time (adjust based on screen size)
    const cardsToShow = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    
    for (let i = 0; i < cardsToShow; i++) {
      const index = (expeditionStartIndex + i) % expeditions.length;
      const exp = expeditions[index];
      
      const card = document.createElement('div');
      card.className = 'expedition-card';
      card.innerHTML = `
        <img src="${exp.image}" alt="${exp.title}" loading="lazy">
        <div class="card-body">
          <h3>${exp.title}</h3>
          <p>${exp.desc}</p>
          <a href="${exp.link}" class="btn btn-small">Learn More</a>
        </div>
      `;
      expeditionContainer.appendChild(card);
    }
  }

  function changeExpedition(step) {
    expeditionStartIndex = (expeditionStartIndex + step + expeditions.length) % expeditions.length;
    renderExpeditions();
  }

  // Navigation buttons
  document.querySelector('.carousel-nav.prev').addEventListener('click', () => changeExpedition(-1));
  document.querySelector('.carousel-nav.next').addEventListener('click', () => changeExpedition(1));

  // Start the expedition carousel
  renderExpeditions();
  expeditionInterval = setInterval(() => changeExpedition(1), 5000);

  // Trekking Grid
  const trekkingSpots = [
    {
      title: "K2 Base Camp Trek",
      duration: "18 days",
      desc: "Trek to the foot of the world's second highest mountain through breathtaking landscapes.",
      image: "images/tracking/tracking-1.jpg",
      link: "#"
    },
    {
      title: "Gondogoro La Trek",
      duration: "16 days",
      desc: "Challenge yourself on a high-altitude pass trek with epic views of K2 and its neighbors.",
      image: "images/tracking/tracking-2.jpeg",
      link: "#"
    },
    {
      title: "Snow Lake Trek",
      duration: "14 days",
      desc: "Discover one of the largest non-polar glaciers deep in the Karakoram mountains and lake.",
      image: "images/tracking/tracking-3.jpeg",
      link: "#"
    },
    {
      title: "Nangma Valley Trek",
      duration: "10 days",
      desc: "A hidden valley with stunning granite towers and charming traditional villages, by crowds.",
      image: "images/tracking/tracking-4.jpeg",
      link: "#"
    },
    {
      title: "Five Base Camp Trek",
      duration: "21 days",
      desc: "Visit five different base camps including K2, Broad Peak, and Gasherbrums.",
      image: "images/destination.jpeg",
      link: "#"
    },
    {
      title: "Fairy Meadows Trek",
      duration: "7 days",
      desc: "An easy trek to beautiful meadows offering breathtaking views of Nanga Parbat's majestic peak.",
      image: "images/destination.jpeg",
      link: "#"
    }
  ];

  const trekkingContainer = document.querySelector('.trek-grid');

  function renderTrekking() {
    trekkingContainer.innerHTML = '';
    
    // Show all on desktop, 2 on tablet, 1 on mobile
    const cardsToShow = window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
    
    trekkingSpots.slice(0, cardsToShow).forEach(trek => {
      const card = document.createElement('article');
      card.className = 'trek-card';
      card.innerHTML = `
        <div class="card-image">
          <img src="${trek.image}" alt="${trek.title}" loading="lazy">
        </div>
        <div class="card-body">
          <h3>${trek.title}</h3>
          <span class="duration">${trek.duration}</span>
          <p>${trek.desc}</p>
          <a href="${trek.link}" class="btn btn-small">View Details</a>
        </div>
      `;
      trekkingContainer.appendChild(card);
    });
  }

  // Initial render and on resize
  renderTrekking();
  window.addEventListener('resize', renderTrekking);
});
// Welcome Popup
document.addEventListener("DOMContentLoaded", function() {
  // Check if popup was already shown in this session
  if (!sessionStorage.getItem('popupShown')) {
    const welcomePopup = document.querySelector('.welcome-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const exploreBtn = document.querySelector('.explore-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    // Show popup after slight delay
    setTimeout(() => {
      welcomePopup.classList.add('active');
      document.body.classList.add('no-scroll');
    }, 1000);
    
    // Close popup handlers
    function closePopup() {
      welcomePopup.classList.remove('active');
      document.body.classList.remove('no-scroll');
      sessionStorage.setItem('popupShown', 'true');
    }
    
    closePopupBtn.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    
    // Explore button handler
    exploreBtn.addEventListener('click', function() {
      closePopup();
      // Scroll to expeditions section
      document.querySelector('.expeditions').scrollIntoView({
        behavior: 'smooth'
      });
    });
    
    // Close when clicking outside content
    welcomePopup.addEventListener('click', function(e) {
      if (e.target === welcomePopup) {
        closePopup();
      }
    });
  }

  // Feedback Form Submission
  const feedbackForm = document.getElementById('feedbackForm');
  
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 'Not rated';
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to your server
    console.log('Feedback submitted:', { name, email, rating, message });
    
    // Show thank you message
    alert('Thank you for your feedback! We appreciate your time and will use your input to improve our services.');
    
    // Reset form
    feedbackForm.reset();
    
    // Reset star ratings
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
      radio.checked = false;
    });
  });
  
  // Star rating hover effect
  const stars = document.querySelectorAll('.star-rating label');
  
  stars.forEach(star => {
    star.addEventListener('mouseover', function() {
      const value = this.getAttribute('for').replace('star', '');
      highlightStars(value);
    });
    
    star.addEventListener('mouseout', function() {
      const checked = document.querySelector('input[name="rating"]:checked');
      if (checked) {
        highlightStars(checked.value);
      } else {
        resetStars();
      }
    });
  });
  
  function highlightStars(value) {
    stars.forEach(star => {
      const starValue = star.getAttribute('for').replace('star', '');
      if (starValue <= value) {
        star.style.color = 'var(--secondary)';
      } else {
        star.style.color = 'var(--light-gray)';
      }
    });
  }
  
  function resetStars() {
    stars.forEach(star => {
      star.style.color = 'var(--light-gray)';
    });
  }
});

// Add this to your existing carousel code to ensure it works with new sections
window.addEventListener('resize', function() {
  // Re-render expeditions and treks on resize
  if (typeof renderExpeditions === 'function') {
    renderExpeditions();
  }
  if (typeof renderTrekking === 'function') {
    renderTrekking();
  }
});