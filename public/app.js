
// App State
const state = {
    designers: [],
    shortlisted: new Set(),
    currentFilter: 'all'
};

// API Base URL - Change this to your deployed backend URL
const API_BASE_URL = 'http://localhost:3000'; // For local development

// DOM Elements
const designersList = document.getElementById('designers-list');
const loading = document.getElementById('loading');
const shortlistedFilter = document.getElementById('shortlisted-filter');

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    console.log('App initialized');
    await loadDesigners();
    setupEventListeners();
    loadShortlistedFromStorage();
});

// Load designers from API
async function loadDesigners() {
    try {
        loading.classList.remove('hidden');
        
        // For demo purposes, if API is not available, use mock data
        let designers;
        try {
            const response = await fetch(`${API_BASE_URL}/api/designers`);
            if (!response.ok) throw new Error('API not available');
            designers = await response.json();
        } catch (error) {
            console.log('Using mock data (API not available)');
            designers = getMockDesigners();
        }
        
        state.designers = designers;
        renderDesigners(designers);
        
    } catch (error) {
        console.error('Error loading designers:', error);
        showError('Failed to load designers. Please try again.');
    } finally {
        loading.classList.add('hidden');
    }
}

// Mock data for demo
function getMockDesigners() {
    return [
        {
            id: 1,
            name: "Epic Designs",
            rating: 4.5,
            description: "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
            projects: 57,
            experience: 8,
            price: "$$",
            phone: "+91 - 984532853",
            phone2: "+91 - 984532854"
        },
        {
            id: 2,
            name: "Studio - D3",
            rating: 4.5,
            description: "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
            projects: 43,
            experience: 6,
            price: "$$$",
            phone: "+91 - 984532853",
            phone2: "+91 - 984532854"
        },
        {
            id: 3,
            name: "House of designs",
            rating: 4.0,
            description: "Creative studio specializing in modern interior design with sustainable materials.",
            projects: 32,
            experience: 5,
            price: "$$",
            phone: "+91 - 984532853",
            phone2: "+91 - 984532854"
        }
    ];
}

// Render designers
function renderDesigners(designers) {
    designersList.innerHTML = '';
    
    designers.forEach((designer, index) => {
        const card = createDesignerCard(designer, index);
        designersList.appendChild(card);
    });
}

// Create designer card element
function createDesignerCard(designer, index) {
    const card = document.createElement('div');
    card.className = 'designer-card';
    card.dataset.id = designer.id;
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="card-content">
            <div class="card-left">
                <h3 class="designer-name">${designer.name}</h3>
                <div class="designer-rating">
                    <div class="stars">
                        ${generateStars(designer.rating)}
                    </div>
                </div>
                <p class="designer-description">${designer.description}</p>
                <div class="designer-stats">
                    <div class="stat">
                        <span class="stat-value">${designer.projects}</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${designer.experience}</span>
                        <span class="stat-label">Years</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${designer.price}</span>
                        <span class="stat-label">Price</span>
                    </div>
                </div>
                <div class="designer-contact">
                    <span class="phone-number">${designer.phone}</span>
                    <span class="phone-number">${designer.phone2}</span>
                </div>
            </div>
            <div class="card-right">
                <div class="card-actions">
                    <button class="action-btn details-btn-icon" data-action="details" data-id="${designer.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <a href="#" class="details-btn">Details</a>
                </div>
                <div class="card-actions">
                    <button class="action-btn hide-btn" data-action="hide" data-id="${designer.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 12s-4-8-8-8-8 8-8 8 4 8 8 8 8-8 8-8z" stroke="currentColor" stroke-width="2" fill="none"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M1 1l22 22" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <span style="font-size: 12px; color: #666;">Hide</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn shortlist-btn ${state.shortlisted.has(designer.id.toString()) ? 'active' : ''}" 
                            data-action="shortlist" data-id="${designer.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
                                  stroke="currentColor" stroke-width="2" 
                                  fill="${state.shortlisted.has(designer.id.toString()) ? 'currentColor' : 'none'}"/>
                        </svg>
                    </button>
                    <span style="font-size: 12px; color: #666;">Shortlist</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn report-btn" data-action="report" data-id="${designer.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M12 8v4" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 16h.01" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <span style="font-size: 12px; color: #666;">Report</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += `
            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `;
    }
    
    // Half star
    if (hasHalfStar) {
        stars += `
            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                <defs>
                    <linearGradient id="half">
                        <stop offset="50%" stop-color="currentColor"/>
                        <stop offset="50%" stop-color="#ddd"/>
                    </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)"/>
            </svg>
        `;
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += `
            <svg class="star empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `;
    }
    
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Card action buttons
    designersList.addEventListener('click', handleCardAction);
    
    // Navigation filters
    document.querySelectorAll('.nav-icon[data-filter]').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

// Handle card actions
function handleCardAction(event) {
    const action = event.target.closest('[data-action]')?.dataset.action;
    const id = event.target.closest('[data-action]')?.dataset.id;
    
    if (!action || !id) return;
    
    switch (action) {
        case 'shortlist':
            toggleShortlist(id);
            break;
        case 'hide':
            hideDesigner(id);
            break;
        case 'details':
            showDetails(id);
            break;
        case 'report':
            reportDesigner(id);
            break;
    }
}

// Toggle shortlist
function toggleShortlist(id) {
    const btn = document.querySelector(`.shortlist-btn[data-id="${id}"]`);
    const svg = btn.querySelector('path');
    
    if (state.shortlisted.has(id)) {
        state.shortlisted.delete(id);
        btn.classList.remove('active');
        svg.setAttribute('fill', 'none');
    } else {
        state.shortlisted.add(id);
        btn.classList.add('active');
        svg.setAttribute('fill', 'currentColor');
    }
    
    saveShortlistedToStorage();
    updateFilterCount();
    
    // If currently filtering by shortlisted, update view
    if (state.currentFilter === 'shortlisted') {
        filterDesigners('shortlisted');
    }
}

// Hide designer
function hideDesigner(id) {
    const card = document.querySelector(`.designer-card[data-id="${id}"]`);
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

// Show details
function showDetails(id) {
    const designer = state.designers.find(d => d.id == id);
    alert(`Details for ${designer.name}\n\nThis would typically open a detailed view page.`);
}

// Report designer
function reportDesigner(id) {
    const designer = state.designers.find(d => d.id == id);
    alert(`Report ${designer.name}\n\nThis would typically open a reporting form.`);
}

// Handle filter
function handleFilter(event) {
    const filter = event.currentTarget.dataset.filter;
    
    // Update active state
    document.querySelectorAll('.nav-icon').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    state.currentFilter = filter;
    filterDesigners(filter);
}

// Filter designers
function filterDesigners(filter) {
    const cards = document.querySelectorAll('.designer-card');
    
    cards.forEach(card => {
        const id = card.dataset.id;
        const isShortlisted = state.shortlisted.has(id);
        
        switch (filter) {
            case 'shortlisted':
                card.style.display = isShortlisted ? 'block' : 'none';
                break;
            case 'all':
            default:
                card.style.display = 'block';
                break;
        }
    });
    
    document.body.classList.toggle('filter-active', filter === 'shortlisted');
}

// Update filter count
function updateFilterCount() {
    const count = state.shortlisted.size;
    const filterBtn = shortlistedFilter.querySelector('span');
    if (count > 0) {
        filterBtn.textContent = `Shortlisted (${count})`;
    } else {
        filterBtn.textContent = 'Shortlisted';
    }
}

// Storage functions
function saveShortlistedToStorage() {
    localStorage.setItem('shortlisted', JSON.stringify([...state.shortlisted]));
}

function loadShortlistedFromStorage() {
    const saved = localStorage.getItem('shortlisted');
    if (saved) {
        state.shortlisted = new Set(JSON.parse(saved));
        updateFilterCount();
    }
}

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4444;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        toggleShortlist,
        filterDesigners,
        generateStars
    };
}
