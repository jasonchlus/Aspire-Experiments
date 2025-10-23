// Launch date: October 27, 2025 at 10:00 AM CT (3:00 PM UTC)
const LAUNCH_DATE = new Date('2025-10-27T15:00:00Z');

// Get all elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const backgroundVideo = document.getElementById('background-video');

// Format number with leading zero
function formatTimeUnit(value) {
    return value.toString().padStart(2, '0');
}

// Add celebration effect
function triggerCelebration() {
    const launchMessage = document.getElementById('launch-message');
    launchMessage.innerHTML = '🎉 <code class="brand-code">aspire.dev</code> is LIVE! 🎉';
    launchMessage.style.animation = 'celebration 2s ease-in-out infinite';
    
    // Add celebration styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-2deg); }
            75% { transform: scale(1.1) rotate(2deg); }
        }
    `;
    document.head.appendChild(style);
}

// Update countdown function with enhanced features
function updateCountdown() {
    try {
        const now = new Date();
        const difference = LAUNCH_DATE - now;
        
        if (difference <= 0) {
            // Launch has happened!
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Trigger celebration
            triggerCelebration();
            
            // Refresh page to show live site
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
            return;
        }
        
        // Check if within 5 minutes and start auto-refresh
        const fiveMinutesInMs = 5 * 60 * 1000;
        if (difference <= fiveMinutesInMs && difference > 0) {
            // Auto-refresh every 30 seconds when close to launch
            const refreshKey = 'lastAutoRefresh';
            const lastRefresh = sessionStorage.getItem(refreshKey);
            const now = Date.now();
            
            if (!lastRefresh || (now - parseInt(lastRefresh)) > 30000) {
                sessionStorage.setItem(refreshKey, now.toString());
                console.log('⏰ Within 5 minutes of launch - auto-refresh enabled');
                
                // Schedule refresh in 30 seconds
                setTimeout(() => {
                    console.log('🔄 Auto-refreshing page...');
                    window.location.reload(true);
                }, 30000);
            }
        }
        
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Store previous values for animation detection
        const prevSeconds = parseInt(secondsElement.textContent) || 0;
        const prevMinutes = parseInt(minutesElement.textContent) || 0;
        const prevHours = parseInt(hoursElement.textContent) || 0;
        const prevDays = parseInt(daysElement.textContent) || 0;
        
        // Update display with formatted values
        daysElement.textContent = formatTimeUnit(days);
        hoursElement.textContent = formatTimeUnit(hours);
        minutesElement.textContent = formatTimeUnit(minutes);
        secondsElement.textContent = formatTimeUnit(seconds);
        
        // Add pulse animation for number changes
        if (seconds !== prevSeconds) {
            secondsElement.style.animation = 'none';
            secondsElement.offsetHeight; // Trigger reflow
            secondsElement.style.animation = 'numberPulse 0.6s ease-in-out';
        }
        
        if (minutes !== prevMinutes) {
            minutesElement.style.animation = 'none';
            minutesElement.offsetHeight;
            minutesElement.style.animation = 'numberPulse 0.6s ease-in-out';
        }
        
        if (hours !== prevHours) {
            hoursElement.style.animation = 'none';
            hoursElement.offsetHeight;
            hoursElement.style.animation = 'numberPulse 0.6s ease-in-out';
        }
        
        if (days !== prevDays) {
            daysElement.style.animation = 'none';
            daysElement.offsetHeight;
            daysElement.style.animation = 'numberPulse 0.6s ease-in-out';
        }
        
    } catch (error) {
        console.error('Error updating countdown:', error);
        // Fallback display
        daysElement.textContent = '--';
        hoursElement.textContent = '--';
        minutesElement.textContent = '--';
        secondsElement.textContent = '--';
    }
}

// Video playback function
function playBackgroundVideo() {
    if (!backgroundVideo) return;
    backgroundVideo.currentTime = 0;
    backgroundVideo.playbackRate = 0.5;
    backgroundVideo.style.transition = 'opacity 1s ease-in-out';
    backgroundVideo.style.opacity = '0.6';
    backgroundVideo.play();
    backgroundVideo.onended = function() {
        backgroundVideo.style.opacity = '0';
    };
}

// Add interactive hover effects
function addInteractiveEffects() {
    const timeSegments = document.querySelectorAll('.time-segment');
    
    timeSegments.forEach(segment => {
        segment.addEventListener('mouseenter', () => {
            segment.style.transform = 'translateY(-12px) scale(1.05)';
        });
        
        segment.addEventListener('mouseleave', () => {
            segment.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        segment.addEventListener('click', () => {
            segment.style.animation = 'none';
            segment.offsetHeight;
            segment.style.animation = 'numberPulse 0.4s ease-in-out';
        });
    });
}

// Add loading animation
function showLoadingAnimation() {
    const container = document.querySelector('.countdown-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        container.style.transition = 'all 1s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize
function init() {
    try {
        console.log('🚀 Initializing aspire.dev countdown...');
        
        // Validate elements exist
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            throw new Error('Required countdown elements not found');
        }
        
        // Show loading animation
        showLoadingAnimation();
        
        // Add interactive effects
        addInteractiveEffects();
        
        // Start countdown immediately
        updateCountdown();
        
        // Update every second
        const countdownInterval = setInterval(() => {
            updateCountdown();
            
            // Check if launch has passed and clear interval
            const now = new Date();
            if (LAUNCH_DATE - now <= 0) {
                clearInterval(countdownInterval);
                console.log('🎉 Launch time reached! Countdown stopped.');
            }
        }, 1000);
        
        // Play video with delay, then periodically
        setTimeout(() => {
            playBackgroundVideo();
        }, 3000);
        
        setInterval(playBackgroundVideo, 90000); // Every 90 seconds
        
        console.log('✅ Countdown initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize countdown:', error);
    }
}

// Enhanced DOM ready check
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// Start the application
domReady(init);

// Add some fun console messages
console.log(`
🚀 aspire.dev Launch Countdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launch Date: ${LAUNCH_DATE.toLocaleString()}
Current Time: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if service worker file exists
        fetch('/sw.js').then(() => {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('✅ Service Worker registered'))
                .catch(() => console.log('ℹ️ No Service Worker found'));
        }).catch(() => {
            // Service worker file doesn't exist, that's okay
        });
    });
}
