// Aspire Launch Countdown - Static Site Script

// Launch date: October 27, 2025 at 12:00 UTC
const LAUNCH_DATE = new Date('2025-10-27T12:00:00Z');

// Get all elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const backgroundVideo = document.getElementById('background-video');

// Update countdown function
function updateCountdown() {
    const now = new Date();
    const difference = LAUNCH_DATE - now;
    
    if (difference <= 0) {
        // Launch has happened!
        daysElement.textContent = '0';
        hoursElement.textContent = '0';
        minutesElement.textContent = '0';
        secondsElement.textContent = '0';
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update display
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

// Video playback function
function playBackgroundVideo() {
    if (!backgroundVideo) return;
    
    backgroundVideo.currentTime = 0;
    backgroundVideo.playbackRate = 0.25;
    backgroundVideo.style.opacity = '1';
    
    backgroundVideo.play();
    
    backgroundVideo.addEventListener('ended', () => {
        backgroundVideo.style.opacity = '0';
    }, { once: true });
}

// Initialize
function init() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Play video every 60 seconds
    setInterval(playBackgroundVideo, 60000);
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
