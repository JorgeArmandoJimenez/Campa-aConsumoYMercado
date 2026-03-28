/**
 * ========================================
 * EcoConsciente Blog - JavaScript
 * Campana de Concientizacion sobre Cambio Climatico
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initCounters();
    initNewsletterForm();
    initAnimations();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    var header = document.querySelector('.header');

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        var links = navLinks.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var j = 0; j < anchors.length; j++) {
        anchors[j].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                var headerOffset = 80;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Scroll effects - scroll to top button
 */
function initScrollEffects() {
    var scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Animated counters
 */
function initCounters() {
    var counters = document.querySelectorAll('.counter-number');
    var observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    var counterObserver = new IntersectionObserver(function(entries, observer) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (entry.isIntersecting) {
                var counter = entry.target;
                var target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        }
    }, observerOptions);

    for (var j = 0; j < counters.length; j++) {
        counterObserver.observe(counters[j]);
    }
}

function animateCounter(element, target) {
    var duration = 2000; // 2 seconds
    var start = 0;
    var increment = target / (duration / 16); // 60fps
    var current = start;

    function updateCounter() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCounter();
}

/**
 * Newsletter form handling
 */
function initNewsletterForm() {
    var form = document.getElementById('newsletterForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var emailInput = form.querySelector('input[type="email"]');
            var email = emailInput.value.trim();

            if (validateEmail(email)) {
                // Show success message
                showNotification('Gracias por suscribirte! Juntos haremos la diferencia.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Por favor, ingresa un correo electronico valido.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    var existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    var notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<span>' + message + '</span><button class="notification-close" aria-label="Cerrar">&times;</button>';

    // Add styles
    notification.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 1rem 2rem; background-color: ' + (type === 'success' ? '#2E7D32' : '#D32F2F') + '; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 1rem; z-index: 10000; animation: slideUp 0.3s ease; font-family: Poppins, sans-serif;';

    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        var style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '@keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }';
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    var closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1;';
    closeBtn.addEventListener('click', function() { notification.remove(); });

    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Scroll animations for elements
 */
function initAnimations() {
    var animatedElements = document.querySelectorAll('.problem-card, .action-card, .resource-card');
    
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var animationObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (entry.isIntersecting) {
                (function(el, index) {
                    setTimeout(function() {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                })(entry.target, i);
            }
        }
    }, observerOptions);

    for (var j = 0; j < animatedElements.length; j++) {
        animatedElements[j].style.opacity = '0';
        animatedElements[j].style.transform = 'translateY(30px)';
        animatedElements[j].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(animatedElements[j]);
    }
}

/**
 * Share functionality
 */
function shareOnSocial(platform) {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent('Pequenos cambios, GRAN IMPACTO - Campana de Concientizacion');
    var hashtags = 'CambioClimatico,CuidemosElPlaneta,ConsumoResponsable,Sostenibilidad,EcoFriendly';

    var shareUrl;

    switch(platform) {
        case 'twitter':
            shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '&hashtags=' + hashtags;
            break;
        case 'facebook':
            shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
            break;
        case 'whatsapp':
            shareUrl = 'https://wa.me/?text=' + title + '%20' + url;
            break;
        case 'linkedin':
            shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Make share function globally available
window.shareOnSocial = shareOnSocial;

/**
 * Print/Save as PDF functionality
 */
function printPage() {
    window.print();
}

window.printPage = printPage;

console.log('EcoConsciente Blog loaded successfully!');
console.log('Pequenos cambios = GRAN impacto');
console.log('#CambioClimatico #CuidemosElPlaneta #ConsumoResponsable #Sostenibilidad #EcoFriendly');