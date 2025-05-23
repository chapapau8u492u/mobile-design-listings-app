
# EmptyCup Interior Designers

A mobile-responsive web application for browsing and shortlisting interior designers, built with HTML, CSS, JavaScript, Node.js, and Express.

## 🚀 Features

- **Mobile-first responsive design** matching the provided Figma mockups
- **Designer listing** with detailed profiles, ratings, and contact information
- **Shortlist functionality** with local storage persistence
- **Filter system** to view only shortlisted designers
- **RESTful API** serving designer data
- **Touch-friendly interactions** optimized for mobile devices
- **Smooth animations** and modern UI/UX

## 📱 Design

The application replicates the mobile app design from the provided Figma file, featuring:
- Clean, minimalist interface with warm beige color scheme
- Card-based layout for designer profiles
- Interactive navigation with icon-based filtering
- Professional typography using Inter font family
- Responsive grid system that adapts to different screen sizes

## 🛠 Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Responsive design with Flexbox/Grid
- **Vanilla JavaScript** - Interactive functionality and API integration
- **Local Storage** - Persistent shortlist data

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## 📦 Project Structure

```
project-root/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles and responsive design
│   └── app.js              # JavaScript functionality
├── backend/
│   ├── server.js           # Express server and API routes
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone or extract the project**
   ```bash
   cd project-root
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The API server will start on `http://localhost:3000`

3. **Setup Frontend**
   ```bash
   cd ../frontend
   # Open index.html in a browser or use a local server
   npx serve .
   ```
   If using serve, the frontend will be available at `http://localhost:3000`

### Development Mode

For development with auto-restart:
```bash
cd backend
npm install -g nodemon
npm run dev
```

## 🌐 API Endpoints

### Base URL: `http://localhost:3000`

- `GET /` - API information and available endpoints
- `GET /api/designers` - Get all designers
- `GET /api/designers/:id` - Get specific designer by ID
- `GET /api/designers/location/:location` - Filter designers by location
- `GET /api/search` - Search designers with query parameters
- `GET /health` - Health check endpoint

### Example API Response

```json
{
  "id": 1,
  "name": "Epic Designs",
  "rating": 4.5,
  "description": "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
  "projects": 57,
  "experience": 8,
  "price": "$$",
  "phone": "+91 - 984532853",
  "phone2": "+91 - 984532854",
  "location": "Bangalore",
  "specialties": ["Modern", "Minimalist", "Contemporary"]
}
```

## 📱 Usage

### Core Features

1. **Browse Designers**: Scroll through the list of interior designers
2. **View Details**: Each card shows designer information, ratings, and contact details
3. **Shortlist**: Tap the bookmark icon to add/remove designers from your shortlist
4. **Filter**: Use the "Shortlisted" filter to view only saved designers
5. **Responsive**: Works seamlessly on mobile, tablet, and desktop devices

### Navigation Icons
- **List**: Default view showing all designers
- **Gallery**: (Future feature) Grid view of designer portfolios
- **Map**: (Future feature) Map view of designer locations
- **Shortlisted**: Filter to show only shortlisted designers
- **Sort**: (Future feature) Sort designers by various criteria

## 🎨 Design Implementation

The application precisely matches the provided Figma design with:

- **Color Palette**: Warm beige backgrounds (#FDF5E6), professional typography
- **Typography**: Inter font family for clean, modern readability
- **Icons**: Custom SVG icons matching the design system
- **Spacing**: Consistent padding and margins following design specifications
- **Interactive States**: Hover effects, active states, and smooth transitions

## 🚀 Deployment

### Frontend (Netlify)
1. Build the frontend assets
2. Deploy the `frontend/` folder to Netlify
3. Update API URLs in `app.js` to point to your deployed backend

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Set start command: `npm start`
5. Update frontend to use the deployed API URL

### Environment Variables
Update `API_BASE_URL` in `app.js` to your deployed backend URL:
```javascript
const API_BASE_URL = 'https://your-backend.onrender.com';
```

## 🧪 Testing

The application includes:
- Error handling for API failures
- Fallback to mock data when backend is unavailable
- Responsive design testing across device sizes
- Touch interaction optimization for mobile devices

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

Built with ❤️ for EmptyCup Interior Designers
```
