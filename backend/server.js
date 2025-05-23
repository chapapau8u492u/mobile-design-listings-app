
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock designer data
const designers = [
    {
        id: 1,
        name: "Epic Designs",
        rating: 4.5,
        description: "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
        projects: 57,
        experience: 8,
        price: "$$",
        phone: "+91 - 984532853",
        phone2: "+91 - 984532854",
        location: "Bangalore",
        specialties: ["Modern", "Minimalist", "Contemporary"],
        portfolio: [
            "https://example.com/portfolio1.jpg",
            "https://example.com/portfolio2.jpg"
        ]
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
        phone2: "+91 - 984532854",
        location: "Mumbai",
        specialties: ["Luxury", "Classic", "Eclectic"],
        portfolio: [
            "https://example.com/portfolio3.jpg",
            "https://example.com/portfolio4.jpg"
        ]
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
        phone2: "+91 - 984532854",
        location: "Delhi",
        specialties: ["Sustainable", "Modern", "Industrial"],
        portfolio: [
            "https://example.com/portfolio5.jpg",
            "https://example.com/portfolio6.jpg"
        ]
    },
    {
        id: 4,
        name: "Creative Spaces",
        rating: 4.2,
        description: "Award-winning design firm with expertise in residential and commercial spaces.",
        projects: 68,
        experience: 10,
        price: "$$$$",
        phone: "+91 - 984532855",
        phone2: "+91 - 984532856",
        location: "Chennai",
        specialties: ["Commercial", "Residential", "Hospitality"],
        portfolio: [
            "https://example.com/portfolio7.jpg",
            "https://example.com/portfolio8.jpg"
        ]
    },
    {
        id: 5,
        name: "Design Studio 360",
        rating: 3.8,
        description: "Young and dynamic team focused on innovative design solutions for modern living.",
        projects: 25,
        experience: 3,
        price: "$",
        phone: "+91 - 984532857",
        phone2: "+91 - 984532858",
        location: "Pune",
        specialties: ["Modern", "Scandinavian", "Budget-friendly"],
        portfolio: [
            "https://example.com/portfolio9.jpg",
            "https://example.com/portfolio10.jpg"
        ]
    }
];

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'EmptyCup Interior Designers API',
        version: '1.0.0',
        endpoints: {
            designers: '/api/designers',
            designer: '/api/designers/:id'
        }
    });
});

// Get all designers
app.get('/api/designers', (req, res) => {
    try {
        console.log('GET /api/designers - Fetching all designers');
        
        // Add some delay to simulate real API
        setTimeout(() => {
            res.json(designers);
        }, 500);
        
    } catch (error) {
        console.error('Error fetching designers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get designer by ID
app.get('/api/designers/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const designer = designers.find(d => d.id === id);
        
        if (!designer) {
            return res.status(404).json({ error: 'Designer not found' });
        }
        
        console.log(`GET /api/designers/${id} - Fetching designer:`, designer.name);
        res.json(designer);
        
    } catch (error) {
        console.error('Error fetching designer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Filter designers by location
app.get('/api/designers/location/:location', (req, res) => {
    try {
        const location = req.params.location;
        const filteredDesigners = designers.filter(d => 
            d.location.toLowerCase().includes(location.toLowerCase())
        );
        
        console.log(`GET /api/designers/location/${location} - Found ${filteredDesigners.length} designers`);
        res.json(filteredDesigners);
        
    } catch (error) {
        console.error('Error filtering designers by location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search designers
app.get('/api/search', (req, res) => {
    try {
        const { q, minRating, maxPrice, specialty } = req.query;
        let results = [...designers];
        
        if (q) {
            results = results.filter(d => 
                d.name.toLowerCase().includes(q.toLowerCase()) ||
                d.description.toLowerCase().includes(q.toLowerCase())
            );
        }
        
        if (minRating) {
            results = results.filter(d => d.rating >= parseFloat(minRating));
        }
        
        if (specialty) {
            results = results.filter(d => 
                d.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
            );
        }
        
        console.log(`GET /api/search - Query: ${JSON.stringify(req.query)} - Found ${results.length} results`);
        res.json(results);
        
    } catch (error) {
        console.error('Error searching designers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 EmptyCup API Server running on port ${PORT}`);
    console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
    console.log(`🔗 API endpoints available at: http://localhost:${PORT}/api/designers`);
    console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
