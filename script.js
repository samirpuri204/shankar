// Enhanced header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Global variables for gallery and videos
let allImages = [];
let allVideos = [];
let isGalleryExpanded = false;
let isVideosExpanded = false;
const INITIAL_GALLERY_COUNT = 6;
const INITIAL_VIDEOS_COUNT = 4;

// Load and display images from the image folder
async function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    allImages = [
        'images/00813c2a-41ca-4eee-84e9-cdb88935804d.JPG',
        'images/0100a02b-7692-45c8-9be2-ec2c69c6fa19.JPG',
        'images/0292db87-d418-45c8-b5c9-fa76db8bbb65.JPG',
        'images/0298a60f-9b5f-487d-9b35-3940aaed27bf.JPG',
        'images/0479a4a4-5731-444b-bcbf-0f5e96a6fe27.JPG',
        'images/06498129-6d97-4971-9abc-3b8924a26f25.JPG',
        'images/072515fd-dadc-45d2-915a-257e5fb7a5df.JPG',
        'images/077f1b32-df74-4b24-860a-fc3ea64ddd44.JPG',
        'images/082f7a6a-d1ec-4ec5-8dcd-f056ff4e1a4d.JPG',
        'images/0f3183e9-ff00-40a3-82a0-4ad6a5f68b49.JPG',
        'images/0f433648-8e26-4cbe-8451-ef76130d496f.JPG',
        'images/120229e4-84bc-4b38-a912-e944ae821e27.JPG'
    ];
    
    renderGallery();
}

// Load and display videos
async function loadVideos() {
    const videosGrid = document.getElementById('videos-grid');
    
    allVideos = [
        { src: 'images/jilla-hospital.mp4', title: 'जिल्ला अस्पताल', description: 'प्रदेश अस्पताल कुश्मा, पर्बत — स्वास्थ्य सेवा विकास र सामुदायिक योगदान', featured: true },
        'images/1a72e449-8509-4e8c-ba21-71da202f9618.MP4',
        'images/1d9492eb-beb2-46ed-8972-f59232c70fa7.MP4',
        'images/2426ce00-bdfe-4b98-8641-ac3b3d204bff.MP4',
        'images/284fcbcc-0032-4268-88e0-2e59d6d7e500.MP4',
        'images/554c1531-7286-4b45-b12a-4ca8ba159cf3.MP4',
        'images/5d925625-e70e-495c-ac06-5e5154ec7f52.MP4',
        'images/7160544a-8b8b-4949-81eb-4adef35d0219.MP4',
        'images/773dacc4-f177-4bea-8bd8-d2d93dc14286.MP4',
        'images/7dface2a-82c2-4883-aa32-f2ce0d94c79e.MP4',
        'images/AE991BDA-CFA3-4215-9C29-443F0A2ECE39.MOV'
    ];
    
    renderVideos();
}

// Render gallery based on current state
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const imagesToShow = isGalleryExpanded ? allImages : allImages.slice(0, INITIAL_GALLERY_COUNT);
    
    galleryGrid.innerHTML = '';
    imagesToShow.forEach((imagePath, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="श्री शंकर गिरी - फोटो ${index + 1}" 
                 onclick="openModal('${imagePath}')" 
                 onerror="this.style.display='none'">
        `;
        galleryGrid.appendChild(galleryItem);
    });
    
    updateGalleryButton();
}

function getVideoMeta(video, index) {
    if (typeof video === 'object') {
        return {
            src: video.src,
            title: video.title,
            description: video.description,
            featured: Boolean(video.featured)
        };
    }

    return {
        src: video,
        title: `भिडियो ${index + 1}`,
        description: 'श्री शंकर गिरीको कार्यक्रम र गतिविधिहरू',
        featured: false
    };
}

function getGalleryVideos() {
    return allVideos.filter((video) => !(typeof video === 'object' && video.featured));
}

// Render videos based on current state
function renderVideos() {
    const videosGrid = document.getElementById('videos-grid');
    const galleryVideos = getGalleryVideos();
    const videosToShow = isVideosExpanded ? galleryVideos : galleryVideos.slice(0, INITIAL_VIDEOS_COUNT);
    
    videosGrid.innerHTML = '';
    videosToShow.forEach((video, index) => {
        const { src, title, description, featured } = getVideoMeta(video, index);
        const videoItem = document.createElement('div');
        videoItem.className = featured ? 'video-item video-item-featured' : 'video-item';
        videoItem.innerHTML = `
            <video class="inline-video" controls playsinline webkit-playsinline x5-playsinline preload="metadata" onerror="this.parentElement.style.display='none'">
                <source src="${src}" type="video/mp4">
                <source src="${src}" type="video/quicktime">
                तपाईंको ब्राउजरले भिडियो समर्थन गर्दैन।
            </video>
            <div class="video-item-content">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        videosGrid.appendChild(videoItem);
    });
    
    updateVideosButton();
    initInlineVideos();
}

// Toggle gallery display
function toggleGallery() {
    isGalleryExpanded = !isGalleryExpanded;
    renderGallery();
}

// Toggle videos display
function toggleVideos() {
    isVideosExpanded = !isVideosExpanded;
    renderVideos();
}

// Update gallery button
function updateGalleryButton() {
    const btn = document.getElementById('gallery-see-more-btn');
    if (btn) {
        if (isGalleryExpanded) {
            btn.innerHTML = '<i class="fas fa-chevron-up"></i> कम देखाउनुहोस्';
            btn.classList.add('expanded');
        } else {
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> थप हेर्नुहोस् (' + (allImages.length - INITIAL_GALLERY_COUNT) + ' बढी)';
            btn.classList.remove('expanded');
        }
    }
}

// Update videos button
function updateVideosButton() {
    const btn = document.getElementById('videos-see-more-btn');
    if (btn) {
        if (isVideosExpanded) {
            btn.innerHTML = '<i class="fas fa-chevron-up"></i> कम देखाउनुहोस्';
            btn.classList.add('expanded');
        } else {
            const galleryCount = getGalleryVideos().length;
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> थप हेर्नुहोस् (' + (galleryCount - INITIAL_VIDEOS_COUNT) + ' बढी)';
            btn.classList.remove('expanded');
        }
    }
}

// Modal functionality for image gallery
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal') || createModal();
    const modalImg = modal.querySelector('.modal-content');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <img class="modal-content" id="modalImage">
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Global variables for works functionality
let allWorks = [];
let isExpanded = false;
const INITIAL_WORKS_COUNT = 8;

// Load works/achievements data with see more functionality
function loadWorks() {
    const worksList = document.getElementById('works-list');
    
    // Expanded works data with categories and detailed achievements
    allWorks = [
        { text: "प्रदेश अस्पताल कुश्मा पर्बतको आधुनिकीकरण कार्यक्रम", category: "स्वास्थ्य", icon: "🏥" },
        { text: "अस्पतालमा नयाँ उपकरणहरूको व्यवस्था", category: "स्वास्थ्य", icon: "🔬" },
        { text: "स्वास्थ्य सेवाको गुणस्तर सुधार कार्यक्रम", category: "स्वास्थ्य", icon: "⚕️" },
        { text: "नि:शुल्क स्वास्थ्य शिविरहरूको आयोजना", category: "स्वास्थ्य", icon: "🏕️" },
        { text: "स्थानीय समुदायको स्वास्थ्य चेतना कार्यक्रम", category: "स्वास्थ्य", icon: "📢" },
        { text: "अस्पतालको भौतिक संरचना सुधार", category: "स्वास्थ्य", icon: "🏗️" },
        { text: "चिकित्सक र स्वास्थ्यकर्मीहरूको क्षमता विकास", category: "स्वास्थ्य", icon: "👨‍⚕️" },
        { text: "आपातकालीन सेवाको विस्तार", category: "स्वास्थ्य", icon: "🚑" },
        { text: "मातृ र शिशु स्वास्थ्य सेवा सुधार", category: "स्वास्थ्य", icon: "👶" },
        { text: "गरिब र असहाय बिरामीहरूको लागि सहायता कोष स्थापना", category: "स्वास्थ्य", icon: "💰" },
        { text: "अस्पतालमा नयाँ वार्डहरूको निर्माण", category: "स्वास्थ्य", icon: "🏢" },
        { text: "डिजिटल स्वास्थ्य रेकर्ड प्रणाली स्थापना", category: "स्वास्थ्य", icon: "💻" },
        { text: "टेलिमेडिसिन सेवाको सुरुवात", category: "स्वास्थ्य", icon: "📱" },
        { text: "रक्तदान कार्यक्रमको नियमित आयोजना", category: "स्वास्थ्य", icon: "🩸" },
        { text: "स्वास्थ्य बीमा कार्यक्रमको प्रवर्धन", category: "स्वास्थ्य", icon: "🛡️" },
        { text: "शिक्षा क्षेत्रमा छात्रवृत्ति कार्यक्रम", category: "शिक्षा", icon: "🎓" },
        { text: "गरिब विद्यार्थीहरूको लागि निःशुल्क पुस्तक वितरण", category: "शिक्षा", icon: "📚" },
        { text: "विद्यालय भवन निर्माण र मर्मत", category: "शिक्षा", icon: "🏫" },
        { text: "शिक्षकहरूको तालिम कार्यक्रम", category: "शिक्षा", icon: "👨‍🏫" },
        { text: "डिजिटल शिक्षा प्रणालीको विकास", category: "शिक्षा", icon: "💻" },
        { text: "सामुदायिक पुस्तकालय स्थापना", category: "शिक्षा", icon: "📖" },
        { text: "खेलकुद सामग्री वितरण", category: "शिक्षा", icon: "⚽" },
        { text: "विज्ञान प्रयोगशाला स्थापना", category: "शिक्षा", icon: "🔬" },
        { text: "कम्प्युटर शिक्षा कार्यक्रम", category: "शिक्षा", icon: "🖥️" },
        { text: "व्यावसायिक तालिम कार्यक्रम", category: "शिक्षा", icon: "🛠️" },
        { text: "सडक र पुल निर्माण परियोजना", category: "पूर्वाधार", icon: "🛣️" },
        { text: "पानी आपूर्ति व्यवस्था सुधार", category: "पूर्वाधार", icon: "💧" },
        { text: "सामुदायिक भवन निर्माण", category: "पूर्वाधार", icon: "🏛️" },
        { text: "विद्युत् लाइन विस्तार कार्यक्रम", category: "पूर्वाधार", icon: "⚡" },
        { text: "इन्टरनेट कनेक्टिभिटी विस्तार", category: "पूर्वाधार", icon: "🌐" },
        { text: "वृक्षारोपण अभियान", category: "वातावरण", icon: "🌳" },
        { text: "फोहोर व्यवस्थापन कार्यक्रम", category: "वातावरण", icon: "♻️" },
        { text: "जैविक खेती प्रवर्धन", category: "वातावरण", icon: "🌱" },
        { text: "प्राकृतिक स्रोत संरक्षण", category: "वातावरण", icon: "🏞️" },
        { text: "वातावरण संरक्षण चेतना कार्यक्रम", category: "वातावरण", icon: "🌍" },
        { text: "महिला सशक्तिकरण कार्यक्रम", category: "सामाजिक", icon: "👩" },
        { text: "सीप विकास तालिम", category: "सामाजिक", icon: "🎯" },
        { text: "लघु उद्यम विकास कार्यक्रम", category: "सामाजिक", icon: "🏪" },
        { text: "युवा रोजगारी कार्यक्रम", category: "सामाजिक", icon: "👨‍💼" },
        { text: "कृषि आधुनिकीकरण कार्यक्रम", category: "कृषि", icon: "🚜" },
        { text: "पशुपालन विकास कार्यक्रम", category: "कृषि", icon: "🐄" },
        { text: "मत्स्यपालन प्रवर्धन", category: "कृषि", icon: "🐟" },
        { text: "सहकारी संस्था स्थापना", category: "आर्थिक", icon: "🤝" },
        { text: "माइक्रो फाइनान्स कार्यक्रम", category: "आर्थिक", icon: "💳" },
        { text: "बचत समूह गठन", category: "आर्थिक", icon: "💰" },
        { text: "आपदा व्यवस्थापन तयारी", category: "सुरक्षा", icon: "🚨" },
        { text: "राहत वितरण कार्यक्रम", category: "सुरक्षा", icon: "📦" },
        { text: "पुनर्निर्माण सहायता", category: "सुरक्षा", icon: "🔨" },
        { text: "सामुदायिक सुरक्षा कार्यक्रम", category: "सुरक्षा", icon: "🛡️" },
        { text: "स्वयंसेवक तालिम कार्यक्रम", category: "सुरक्षा", icon: "🙋‍♂️" }
    ];
    
    renderWorks();
}

// Render works based on current state (expanded or collapsed)
function renderWorks() {
    const worksList = document.getElementById('works-list');
    const worksToShow = isExpanded ? allWorks : allWorks.slice(0, INITIAL_WORKS_COUNT);
    
    const worksHTML = `
        <div class="works-grid" id="works-grid">
            ${worksToShow.map((work, index) => `
                <div class="work-item" style="--i: ${index}">
                    <div class="work-icon">${work.icon}</div>
                    <div class="work-content">
                        <div class="work-number">${index + 1}</div>
                        <div class="work-text">${work.text}</div>
                        <div class="work-category">${work.category}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="works-stats">
            <div class="stats-item">
                <div class="stats-number">${allWorks.length}</div>
                <div class="stats-label">कुल कामहरू</div>
            </div>
            <div class="stats-item">
                <div class="stats-number">${new Set(allWorks.map(w => w.category)).size}</div>
                <div class="stats-label">क्षेत्रहरू</div>
            </div>
            <div class="stats-item">
                <div class="stats-number">${worksToShow.length}</div>
                <div class="stats-label">देखाइएको</div>
            </div>
        </div>
        <div class="works-note">
            <p><strong>नोट:</strong> यी मैले गरेका मुख्य कामहरूको सूची हो।</p>
        </div>
    `;
    
    worksList.innerHTML = worksHTML;
    updateSeeMoreButton();
}

// Toggle works display (see more/see less)
function toggleWorks() {
    isExpanded = !isExpanded;
    renderWorks();
    
    // Smooth scroll to works section when expanding
    if (isExpanded) {
        document.getElementById('works-list').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Update see more button text and state
function updateSeeMoreButton() {
    const seeMoreBtn = document.getElementById('see-more-btn');
    if (seeMoreBtn) {
        if (isExpanded) {
            seeMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> कम देखाउनुहोस्';
            seeMoreBtn.classList.add('expanded');
        } else {
            seeMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> थप हेर्नुहोस् (' + (allWorks.length - INITIAL_WORKS_COUNT) + ' बढी)';
            seeMoreBtn.classList.remove('expanded');
        }
    }
}

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9]+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9]+/, Math.floor(current));
            }
        }, 20);
    });
}

// Initialize counter animation when stats section is visible
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// Add CSS for works grid
const worksCSS = `
    .works-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .work-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #667eea;
        transition: transform 0.3s ease;
    }
    
    .work-item:hover {
        transform: translateX(5px);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .work-number {
        background: #667eea;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }
    
    .work-text {
        flex: 1;
        font-weight: 500;
    }
    
    .works-note {
        background: #e3f2fd;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #2196f3;
    }
    
    .works-note p {
        margin: 0;
        color: #1565c0;
    }
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = worksCSS;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.achievement-card, .gallery-item, .video-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}



// Update copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Enable inline playback on mobile (no forced fullscreen on iOS)
function initInlineVideos() {
    document.querySelectorAll('video').forEach((video) => {
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.playsInline = true;
        video.controls = true;

        video.addEventListener('webkitbeginfullscreen', (event) => {
            event.preventDefault();
            if (typeof video.webkitExitFullscreen === 'function') {
                video.webkitExitFullscreen();
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadVideos();
    loadWorks();
    initAnimations();
    initStatsAnimation();
    initInlineVideos();

    updateCopyrightYear();
    
    // Add loading states
    const galleryGrid = document.getElementById('gallery-grid');
    const videosGrid = document.getElementById('videos-grid');
    
    if (galleryGrid.children.length === 0) {
        galleryGrid.innerHTML = '<div class="loading-message">फोटोहरू लोड भइरहेको छ...</div>';
    }
    
    if (videosGrid.children.length === 0) {
        videosGrid.innerHTML = '<div class="loading-message">भिडियोहरू लोड भइरहेको छ...</div>';
    }
});

// Add loading message styles
const loadingCSS = `
    .loading-message {
        text-align: center;
        padding: 3rem;
        font-size: 1.2rem;
        color: #666;
        grid-column: 1 / -1;
    }
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);