// 3D Background Effect
function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.querySelector('.floating-balls').appendChild(renderer.domElement);
    
    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D background
    if (typeof THREE !== 'undefined') {
        init3DBackground();
    }
    
    // Add CSS classes for animations
    const elements = document.querySelectorAll('.panel-card, .feature-card, .stat-card');
    elements.forEach(el => {
        el.classList.add('animate__animated', 'animate__fadeInUp');
    });
    
    // Update email display with animation
    setInterval(() => {
        const emailText = document.querySelector('.email-text');
        if (emailText) {
            emailText.style.animation = 'none';
            setTimeout(() => {
                emailText.style.animation = 'pulse 2s infinite';
            }, 10);
        }
    }, 5000);
});

// Email Storage System
class TempMailStorage {
    constructor() {
        this.storageKey = 'tempmail_pro_data';
        this.loadData();
    }
    
    loadData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {
            currentEmail: '',
            emails: [],
            settings: {}
        };
    }
    
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    saveEmail(email) {
        const data = this.loadData();
        data.emails.push({
            ...email,
            id: Date.now(),
            receivedAt: new Date().toISOString()
        });
        this.saveData(data);
        return email;
    }
    
    getEmails() {
        return this.loadData().emails;
    }
    
    clearEmails() {
        const data = this.loadData();
        data.emails = [];
        this.saveData(data);
    }
}

// Initialize storage
const mailStorage = new TempMailStorage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TempMailStorage, generateRandomEmail };
}
