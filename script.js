/* ==========================================================================
   Prem Raval Portfolio - Dynamic Interactions JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Menu ---
  const mobileToggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggleBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggleBtn.querySelector('i')) {
          mobileToggleBtn.querySelector('i').className = 'fas fa-bars';
        }
      });
    });
  }

  // --- Typing Text Effect ---
  const phrases = [
    "B.Tech Computer Engineer (Class of 2027)",
    "Mobile & Web Developer (Android, Flutter, Python)",
    "Machine Learning & CNN Specialist",
    "Published Research Author (IJIRCCE)"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingText');

  function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // --- Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Project Detail Modal ---
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechStack = document.getElementById('modalTechStack');

  const projectDetailsMap = {
    'job-portal': {
      title: 'Job Portal for Disabled People',
      category: 'Major Project • Web & Accessibility',
      year: '2023',
      desc: `This web platform connects candidates with disabilities directly to employers with an emphasis on accessibility and trust.
             <br><br>
             <strong>Key Highlights:</strong>
             <ul>
               <li>• Verification workflow requiring candidates to upload official disability documentation before applying.</li>
               <li>• Built-in resume builder specifically formatted for applicant tracking systems.</li>
               <li>• Recruiter portal enabling companies to post jobs, filter verified applicants, and schedule interview calls.</li>
             </ul>`,
      tech: ['HTML/CSS', 'JavaScript', 'SQL', 'Python', 'Web Accessibility']
    },
    'cnn-classifier': {
      title: 'Image Classification Project Using CNN',
      category: 'Minor Project • Machine Learning',
      year: '2024',
      desc: `Designed and trained a deep Convolutional Neural Network (CNN) for image recognition.
             <br><br>
             <strong>Key Highlights:</strong>
             <ul>
               <li>• Trained on a multi-class dataset of 10 distinct object categories.</li>
               <li>• Achieved 80%+ classification accuracy across test datasets.</li>
               <li>• Implemented data augmentation and dropout layers to prevent overfitting.</li>
             </ul>`,
      tech: ['Python', 'CNN', 'Deep Learning', 'Data Analysis', 'Automation']
    },
    'hostel-connect': {
      title: 'Hostel Connect Mobile App',
      category: 'Minor Project • Android Application',
      year: '2024',
      desc: `A unified mobile application built using Android SDK to digitize and streamline hostel living for student residents.
             <br><br>
             <strong>Key Highlights:</strong>
             <ul>
               <li>• Centralized platform for complaint lodging, room maintenance requests, and announcements.</li>
               <li>• Integrated student attendance and pass request tracking system.</li>
               <li>• Responsive native UI designed with Android Studio.</li>
             </ul>`,
      tech: ['Android SDK', 'Android Studio', 'Java/Kotlin', 'SQLite']
    },
    'fun-tracer': {
      title: 'Fun Tracer Educational Game',
      category: 'Minor Project • Game Development',
      year: '2024',
      desc: `An interactive educational game developed in Unity Engine that recreates tactile letter tracing in a colorful digital environment.
             <br><br>
             <strong>Key Highlights:</strong>
             <ul>
               <li>• Recreates traditional tracing books into digital stroke recognition.</li>
               <li>• Gamified learning loop with sound effects, stroke accuracy scores, and reward badges.</li>
               <li>• Targeted at improving early childhood motor and handwriting skills.</li>
             </ul>`,
      tech: ['Unity Engine', 'C#', '2D Game Design', 'UI/UX']
    }
  };

  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details) {
        modalTitle.textContent = details.title;
        modalCategory.textContent = details.category;
        modalYear.textContent = details.year;
        modalDesc.innerHTML = details.desc;

        modalTechStack.innerHTML = details.tech
          .map(t => `<span class="tech-badge">${t}</span>`)
          .join('');

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- Copy Email Toast Notification ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('premraval0770@gmail.com').then(() => {
        showToast('Email copied to clipboard: premraval0770@gmail.com');
      }).catch(() => {
        showToast('Email: premraval0770@gmail.com');
      });
    });
  }

  function showToast(message) {
    if (toast) {
      toast.querySelector('.toast-msg').textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
