document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const delayBetweenItems = 100; // milliseconds
    
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            const target = parseInt(stat.getAttribute('data-target'));
            const isPercentage = stat.parentElement.querySelector('.stat-description').textContent.includes('%');
            const start = 0;
            const totalFrames = Math.round(animationDuration / frameDuration);
            let frame = 0;
            
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentValue = Math.round(target * progress);
                
                if (isPercentage) {
                    stat.textContent = currentValue + '%';
                } else {
                    // Format number with commas
                    stat.textContent = currentValue.toLocaleString();
                }
                
                if (frame === totalFrames) {
                    clearInterval(counter);
                }
            }, frameDuration);
        }, index * delayBetweenItems);
    });
});










//mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile_menu_bar');
    const mainNav = document.querySelector('.main-nav');
    const rightSection = document.querySelector('.right-section');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Create a container for mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-nav-container');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-nav-container mobile-nav-active';
            mobileMenu.appendChild(mainNav.cloneNode(true));
            mobileMenu.appendChild(rightSection.cloneNode(true));
            document.querySelector('#main-header').appendChild(mobileMenu);
        } else {
            mobileMenu.remove();
        }
    });
    
    // Close menu when clicking on a link (optional)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-nav-container a')) {
            document.querySelector('.mobile_menu_bar').classList.remove('active');
            document.querySelector('.mobile-nav-container')?.remove();
        }
    });
});
























function resizeCarousel() {
    const carouselSlides = document.querySelector('.carousel-slides');
    if (carouselSlides) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            carouselSlides.style.height = `${window.innerHeight * 0.7}px`;
        } else {
            carouselSlides.style.height = '500px'; // Default height
        }
    }
}
