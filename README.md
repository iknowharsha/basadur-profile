# Basadur Profile Ranking Web Application

A React-based web application that helps students discover their Basadur Creative Problem Solving Profile by ranking 18 sets of 4 words each. Built for IoT class students to understand their thinking styles and improve team collaboration.

## 🚀 Features

- **Interactive Ranking Interface**: Drag-and-drop word ranking with expandable definitions
- **Progress Tracking**: Visual progress indicators with checkpoint screens
- **Dynamic Theming**: Color-coded interface based on user progress and final results
- **Radar Chart Visualization**: Beautiful chart showing thinking style breakdown
- **Local Storage Persistence**: Progress saved locally with 10-minute session TTL
- **Mobile-First Design**: Responsive interface optimized for mobile devices
- **Report Generation**: Downloadable text report with personalized results

## 🎯 How It Works

1. **Landing Screen**: Introduction to Basadur profiles with educational content
2. **Checkpoint Screens**: Motivational breaks at key progress milestones
3. **Ranking Questions**: 18 sets of 4 words to drag and rank by preference
4. **Name Collection**: Personalization step for final report
5. **Final Report**: Radar chart and detailed results with download option

## 📊 Basadur Quadrants

- **Generator**: Thrives on fresh questions and endless 'what-ifs'
- **Conceptualizer**: Turns big messy thoughts into sharp, shareable ideas
- **Optimizer**: Loves stress-testing concepts until the plan feels bulletproof
- **Implementer**: Rolls up sleeves, organizes people, and makes ideas real

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or download the project files**
   ```bash
   # If you have the files, navigate to the project directory
   cd basadur-profile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to that URL manually

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `build/` directory, ready for deployment to any static hosting service.

## 🎨 Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Drag & Drop**: react-beautiful-dnd
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Inline styles with responsive design
- **State Management**: React Context API with useReducer
- **Data Persistence**: LocalStorage with TTL management
- **Fonts**: IBM Plex Sans, JetBrains Mono (Google Fonts)

## 📱 Browser Support

- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 User Experience

### Session Management
- Progress automatically saved to localStorage
- 10-minute session timeout for data privacy
- Seamless recovery if browser is accidentally closed

### Accessibility
- High contrast color combinations
- Touch-friendly interface elements
- Clear visual hierarchy
- Keyboard navigation support

### Performance
- Fast loading times (< 2 seconds on 3G)
- Smooth drag interactions (< 100ms response)
- Optimized for mobile devices

## 📈 Calculation Method

The application uses the official Basadur methodology:

1. **User Rankings**: Convert 1-4 ranking (1=most like me) to Basadur scores (4=most characteristic)
2. **Column Totals**: Sum scores by column, excluding rows 1, 2, 5, 10, 14, 17
3. **Percentages**: Calculate percentage of maximum possible score (48 points)
4. **Dominant Profile**: Identify highest percentage quadrant

## 🔒 Privacy & Data

- **No server-side storage**: All data remains in your browser
- **Local-only processing**: Calculations performed entirely on your device
- **Session expiration**: Data automatically cleared after 10 minutes of inactivity
- **No tracking**: No analytics or user tracking implemented

## 📝 Development Notes

### Project Structure
```
src/
├── components/           # React components
│   ├── common/          # Reusable components
│   ├── ranking/         # Ranking-specific components
│   └── *.jsx           # Screen components
├── data/               # Word sets and configuration
├── utils/              # Utility functions
└── App.js              # Main application component
```

### Key Features Implementation
- **Drag & Drop**: Uses react-beautiful-dnd for smooth interactions
- **State Management**: Context API with reducer pattern
- **Persistence**: LocalStorage utilities with TTL
- **Calculations**: Modular calculation functions
- **Theming**: Dynamic color schemes based on progress/results

## 🚀 Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Recommended for React applications
- **Netlify**: Great for static sites with form handling
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: For enterprise deployment

## 📞 Support

This is an educational tool designed for IoT class students. For technical issues or questions about the Basadur methodology, consult your course instructor.

## 📄 License

Educational use only. Built for IoT class assessment purposes.

---

**Estimated completion time**: 5-7 minutes  
**Questions**: 18 sets of 4 words each  
**Result**: Colorful radar chart with personalized insights 