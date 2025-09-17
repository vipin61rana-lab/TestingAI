# 🏥 Claim Processing System

A modern, full-stack web application for managing insurance claims and user administration.

## ⚡ Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/vipin61rana-lab/TestingAI.git
cd TestingAI

# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../client
npm install
```

### Running the Application
```bash
# Terminal 1: Start Backend Server
cd server
npm start
# Server runs on http://localhost:4000

# Terminal 2: Start Frontend Client
cd client  
npm start
# Client runs on http://localhost:3000
```

## 🎯 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Main Application** | http://localhost:3000 | React frontend interface |
| **API Endpoints** | http://localhost:4000/api | REST API backend |
| **Database** | `server/db.json` | JSON database file |

## 🗂️ Documentation

| Document | Description |
|----------|-------------|
| [📚 WIKI.md](WIKI.md) | Complete technical documentation |
| [🔗 API_DOCUMENTATION.md](API_DOCUMENTATION.md) | API reference and testing guide |
| [📖 README.md](README.md) | This file - quick start guide |

## ✨ Key Features

### 🏠 Dashboard Features
- **Claims Analytics Dashboard**: Interactive Chart.js visualizations
  - **Doughnut Chart**: Claim distribution by type
  - **Bar Chart**: Claim count visualization
  - **Summary Cards**: Real-time statistics (total, pending, approved)
- **Enhanced Navigation**: Professional Material-UI menu bar
- **Table Sorting**: Click any column to sort data
- **Pagination**: 5 claims per page with navigation controls
- **Search Functionality**: Real-time filtering by name or ID
- **Responsive Design**: Mobile-friendly interface

### 📝 Claim Management
- **Multi-Step Forms**: 3-step claim creation process
- **Form Validation**: Real-time validation with error feedback
- **CRUD Operations**: Create, Read, Update, Delete claims
- **Professional UI**: Material-UI components throughout

### 👥 User Administration
- **User Management**: Complete CRUD for user accounts
- **Role Management**: Admin/User role assignment
- **Separated Interface**: Distinct sections for different operations
- **Modal Dialogs**: Professional edit/delete confirmations

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - Modern functional components
- **Material-UI 5.x** - Professional component library
- **Chart.js + React-Chart.js-2** - Interactive data visualization
- **React Router** - Client-side routing
- **Fetch API** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **LowDB** - JSON database
- **CORS** - Cross-origin support

## 📊 API Quick Reference

### Claims Endpoints
```bash
GET    /api/claims          # Get all claims
POST   /api/claims          # Create claim
PUT    /api/claims/:id      # Update claim  
DELETE /api/claims/:id      # Delete claim
```

### Users Endpoints
```bash
GET    /api/users           # Get all users
POST   /api/users           # Create user
PUT    /api/users/:username # Update user role
DELETE /api/users/:username # Delete user
```

## 🧪 Quick Test

### Test API Endpoints
```bash
# Get all claims
curl http://localhost:4000/api/claims

# Get all users
curl http://localhost:4000/api/users

# Create a test claim
curl -X POST http://localhost:4000/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Test User",
    "email": "test@example.com", 
    "phone": "555-0123",
    "claimType": "Auto",
    "claimAmount": 1000,
    "description": "Test claim"
  }'
```

### Test UI Interface
1. Open http://localhost:3000
2. View existing claims on dashboard
3. Click "New Claim" to create a claim
4. Navigate to "Add User" for user management
5. Test sorting by clicking column headers
6. Try edit/delete operations

## 🗃️ Seed Data

The application comes with pre-loaded sample data:

### Claims (5 records)
1. Auto Insurance - John Doe ($5,000)
2. Health Insurance - Jane Smith ($3,500)  
3. Home Insurance - Bob Johnson ($7,200)
4. Life Insurance - Alice Brown ($1,800)
5. Travel Insurance - Charlie Wilson ($950)

### Users (2 records)
1. **admin** (role: admin)
2. **user1** (role: user)

## 🔧 Troubleshooting

### Port Conflicts
If ports are in use, kill existing processes:
```bash
# Kill port 3000 (React)
lsof -ti:3000 | xargs kill -9

# Kill port 4000 (Express)  
lsof -ti:4000 | xargs kill -9
```

### Module Issues
Clear and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Reset
Delete and restart server to regenerate seed data:
```bash
rm server/db.json
cd server && npm start
```

## 📁 Project Structure

```
TestingAI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/          # Main application pages  
│   │   ├── App.js          # App component & routing
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Express Backend
│   ├── index.js            # Server & API endpoints
│   ├── db.json             # JSON database (auto-created)
│   └── package.json        # Backend dependencies  
├── WIKI.md                 # Complete documentation
├── API_DOCUMENTATION.md    # API reference guide
└── README.md              # This quick start guide
```

## 🎨 UI Screenshots/Features

### Professional Dashboard
- **Claims Analytics**: Interactive charts showing data distribution
- Enhanced Paper navigation with elevation
- Sortable table columns with visual indicators
- Pagination controls with Material-UI styling
- Professional action icons with hover effects
- Real-time search and filtering capabilities

### Form Validation
- Real-time email/phone format validation
- Required field indicators
- Step-by-step form progression
- Error messaging with helpful feedback

### User Management
- Separated sections for different operations
- Modal dialogs for edit/delete confirmation
- Role management with dropdown selection
- Paginated user listing for better organization

## 🚀 Production Deployment

### Build Commands
```bash
# Build frontend for production
cd client
npm run build

# Frontend build output: client/build/
# Serve static files from Express server
```

### Environment Setup
```bash
# Set production environment
export NODE_ENV=production
export PORT=4000
```

## 📞 Support

### Repository Information
- **Repository**: https://github.com/vipin61rana-lab/TestingAI
- **Owner**: vipin61rana-lab
- **Branch**: main

### Documentation Links
- [React Documentation](https://reactjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Express.js Documentation](https://expressjs.com/)
- [LowDB Documentation](https://github.com/typicode/lowdb)

---

## 🏆 Recent Enhancements

✅ **Claims Analytics Dashboard**: Interactive Chart.js charts with real-time data  
✅ **Data Visualization**: Doughnut and bar charts showing claim distributions  
✅ **Enhanced UI Components**: Professional Material-UI integration  
✅ **Form Validation**: Comprehensive real-time validation  
✅ **Table Sorting**: Interactive column sorting functionality  
✅ **User Management**: Complete CRUD operations with modals  
✅ **Responsive Design**: Mobile-friendly interface improvements  
✅ **Pagination**: Efficient data display with page controls  
✅ **Professional Styling**: Consistent design across all pages  
✅ **Search Functionality**: Real-time filtering and search capabilities  

---

*For complete technical details, see [WIKI.md](WIKI.md) | For API details, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)*