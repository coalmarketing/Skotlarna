function initializeOverlays() {
    const contactBtn = document.getElementById("contactBtn");
    const menuBtn = document.getElementById("menuBtn");
    const contactOverlay = document.getElementById("contactOverlay");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeContactBtn = document.getElementById("closeContactBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const contactBtnOverlay = document.getElementById("contactBtnOverlay");
    const contactForm = document.getElementById("contactForm");

    if (contactBtn && contactOverlay) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            contactOverlay.classList.remove("hidden");
            contactOverlay.classList.add("flex");
            document.body.style.overflow = "hidden";
        });
    }

    if (contactBtnOverlay && contactOverlay && menuOverlay) {
        contactBtnOverlay.addEventListener("click", (e) => {
            e.preventDefault();
            // Close menu overlay
            menuOverlay.classList.add("hidden");
            menuOverlay.classList.remove("flex");
            // Open contact overlay
            contactOverlay.classList.remove("hidden");
            contactOverlay.classList.add("flex");
            document.body.style.overflow = "hidden";
        });
    }

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener("click", (e) => {
            e.preventDefault();
            menuOverlay.classList.remove("hidden");
            menuOverlay.classList.add("flex");
            document.body.style.overflow = "hidden";
        });
    }

    if (closeContactBtn && contactOverlay) {
        closeContactBtn.addEventListener("click", () => {
            contactOverlay.classList.add("hidden");
            contactOverlay.classList.remove("flex");
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
        });
    }

    if (closeMenuBtn && menuOverlay) {
        closeMenuBtn.addEventListener("click", () => {
            menuOverlay.classList.add("hidden");
            menuOverlay.classList.remove("flex");
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
        });
    }

    if (contactOverlay) {
        contactOverlay.addEventListener("click", (e) => {
            if (e.target === contactOverlay) {
                contactOverlay.classList.add("hidden");
                contactOverlay.classList.remove("flex");
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            }
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.add("hidden");
                menuOverlay.classList.remove("flex");
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate phone number - only digits, spaces, and max one +
            const phoneInput = contactForm.querySelector('input[name="phone"]');
            const phoneValue = phoneInput.value.trim();
            
            if (phoneValue) {
                // Check if contains only allowed characters (digits, spaces, +)
                if (!/^[\d\s+]+$/.test(phoneValue)) {
                    alert("Telefonní číslo může obsahovat pouze čísla, mezery a znak +");
                    return;
                }
                // Check if contains more than one +
                if ((phoneValue.match(/\+/g) || []).length > 1) {
                    alert("Telefonní číslo může obsahovat maximálně jeden znak +");
                    return;
                }
            }
            
            console.log("Zpráva odeslána:", data);
            alert("Děkujeme za vaši zprávu! Brzy se vám ozveme:).");
            
            contactOverlay.classList.add("hidden");
            contactOverlay.classList.remove("flex");
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
            contactForm.reset();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (contactOverlay && !contactOverlay.classList.contains("hidden")) {
                contactOverlay.classList.add("hidden");
                contactOverlay.classList.remove("flex");
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            }
            if (menuOverlay && !menuOverlay.classList.contains("hidden")) {
                menuOverlay.classList.add("hidden");
                menuOverlay.classList.remove("flex");
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            }
        }
    });

    if (menuOverlay) {
        const menuNavLinks = menuOverlay.querySelectorAll('nav a[href^="#"]');
        menuNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuOverlay.classList.add("hidden");
                menuOverlay.classList.remove("flex");
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeOverlays();
    initializeGalleryLightbox();
});

function initializeGalleryLightbox() {
    const galleryImages = document.querySelectorAll('[data-gallery-index]');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const prevImageMobile = document.getElementById('prevImageMobile');
    const nextImageMobile = document.getElementById('nextImageMobile');
    
    const galleryPaths = [
        'img/gallery-1.jpg',
        'img/gallery-2.jpg',
        'img/gallery-3.jpg',
        'img/gallery-4.jpg',
        'img/gallery-5.jpg',
        'img/gallery-6.jpg',
        'img/gallery-7.jpg',
        'img/gallery-8.jpg'
    ];
    
    let currentIndex = 0;
    
    function showImage(index) {
        currentIndex = index;
        lightboxImage.src = galleryPaths[currentIndex];
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    function closeGallery() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryPaths.length;
        lightboxImage.src = galleryPaths[currentIndex];
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryPaths.length) % galleryPaths.length;
        lightboxImage.src = galleryPaths[currentIndex];
    }
    
    // Event listeners
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-gallery-index'));
            showImage(index);
        });
    });
    
    closeLightbox.addEventListener('click', closeGallery);
    nextImage.addEventListener('click', showNext);
    prevImage.addEventListener('click', showPrev);
    nextImageMobile.addEventListener('click', showNext);
    prevImageMobile.addEventListener('click', showPrev);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeGallery();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeGallery();
        }
    });
}
