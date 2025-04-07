
    // Mobile menu toggle
   // document.addEventListener('DOMContentLoaded', function() {
       // const mobileToggle = document.querySelector('.mobile_menu_bar');
       // const mobileMenu = document.querySelector('.et_mobile_menu');
        
        //if (mobileToggle && mobileMenu) {
          //  mobileToggle.addEventListener('click', function() {
          //      mobileMenu.classList.toggle('active');
        //    });
       // }
        
        // Close mobile menu when clicking outside
        //document.addEventListener('click', function(e) {
           // if (!e.target.closest('.mobile_menu_bar') && !e.target.closest('.et_mobile_menu')) {
              //  mobileMenu.classList.remove('active');
          //  }
       // });
    //});

    document.addEventListener('DOMContentLoaded', function() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Change icon between hamburger and X
            this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-btn').textContent = '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.mobile-menu')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-btn').textContent = '☰';
            }
        });
    });


















    document.addEventListener('DOMContentLoaded', function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const animationDuration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const delayBetweenItems = 100; // milliseconds
        
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                const target = parseInt(stat.getAttribute('data-target'));
                const format = stat.getAttribute('data-format');
                const start = 0;
                const totalFrames = Math.round(animationDuration / frameDuration);
                let frame = 0;
                
                const counter = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    const currentValue = Math.round(target * progress);
                    
                    if (format === 'percentage') {
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




























    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let currentIndex = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 seconds
        
        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === (currentIndex + 1) % slides.length) {
                    slide.classList.add('next');
                } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                    slide.classList.add('prev');
                }
            });
            
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
            resetInterval();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
            resetInterval();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
            resetInterval();
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
        }
    
        // Handle responsive carousel height
        function resizeCarousel() {
            const carouselSlides = document.querySelector('.carousel-slides');
            if (!carouselSlides) return;
            
            if (window.innerWidth <= 992) {
                // Mobile behavior
                const viewportHeight = window.innerHeight;
                carouselSlides.style.height = `${Math.min(viewportHeight * 0.6, 500)}px`;
            } else {
                // Desktop behavior
                carouselSlides.style.height = '500px';
            }
        }
    
        // Initialize
        updateSlides();
        slideInterval = setInterval(nextSlide, slideDuration);
        resizeCarousel();
        
        // Event listeners
        window.addEventListener('resize', resizeCarousel);
        
        // Pause on hover
        const carousel = document.querySelector('.image-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', resetInterval);
        }
        
        // Controls
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.getAttribute('data-index')));
            });
        });
        
        // Touch support
        let touchStartX = 0;
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                clearInterval(slideInterval);
            }, {passive: true});
            
            carousel.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                if (touchEndX < touchStartX - 50) nextSlide();
                if (touchEndX > touchStartX + 50) prevSlide();
                resetInterval();
            }, {passive: true});
        }
    });


































































































































    function toggleChatbox() {
        const chatbox = document.getElementById('chatbox');
        const floatingIcon = document.getElementById('floatingIcon');
  
        if (chatbox.style.display === 'none') {
          chatbox.style.display = 'block';
          floatingIcon.style.display = 'none';
        } else {
          chatbox.style.display = 'none';
          floatingIcon.style.display = 'flex';
        }
      }
      
      document.getElementById('userInput').addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();  
               sendMessage();  
          }
      });
  
   async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = encodeURIComponent(userInput.value);
  
    if (message.trim() === '') return;
  
    appendMessage('user', decodeURIComponent(message));
     
    try { 
      var response = await fetch('https://chatbot.cpf.or.ke/ask-question/'+message, {
        method: 'GET',
      });
       
       
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      function processChunk({ done, value }) {
        if (done) {
          console.log("Stream complete");
          return ;
        }
        const chunk = decoder.decode(value, { stream: true });
        appendMessage('bot', chunk || 'No reply received from server');
       
        return reader.read().then(processChunk);  
      }  
      
      var dataresponse = reader.read().then(processChunk);	 
      
    } catch (error) {
      appendMessage('bot', 'Sorry, something went wrong.');
    } 
  
    userInput.value = '';
  }
  
   
      function appendMessage(sender, text) {
        const chatboxBody = document.getElementById('chatboxBody');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerText = text;
  
        chatboxBody.appendChild(messageElement);
  
         chatboxBody.scrollTop = chatboxBody.scrollHeight;
      }
  
       async function loadChatHistory() {
        try {
        //alert( msg.text)
          const response = await fetch('https://chatbot.cpf.or.ke/ask-question/'+ msg.text);
          //const data = await response.json();
          /*data.messages.forEach(msg => {
            appendMessage(msg.sender, msg.text);
          });*/
          appendMessage(msg.sender, msg.text);
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      }
  
       window.onload = function() {
        loadChatHistory();
      };