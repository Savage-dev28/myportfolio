// Portfolio video hover preview functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const videoSrc = wrapper.getAttribute('data-video');
        
        // Set the video source
        if (videoSrc) {
            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            video.appendChild(source);
        }
        
        let timeoutId = null;
        
        // On hover: play video for 5 seconds
        wrapper.addEventListener('mouseenter', function() {
            if (videoSrc) {
                video.play().catch(err => {
                    console.warn('Video autoplay not allowed:', err);
                });
                
                // Clear any existing timeout
                if (timeoutId) clearTimeout(timeoutId);
                
                // Pause after 5 seconds
                timeoutId = setTimeout(() => {
                    video.pause();
                    video.currentTime = 0; // Reset to beginning
                }, 5000);
            }
        });
        
        // On hover out: pause and reset
        wrapper.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
            
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        });
        
        // Click to play full video (optional - opens in fullscreen)
        wrapper.addEventListener('click', function() {
            if (videoSrc && video.paused) {
                video.play().catch(err => {
                    console.warn('Video play not allowed:', err);
                });
                // Request fullscreen
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
            }
        });
    });
});
