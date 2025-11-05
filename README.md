# Tourist Management System - React Version

A comprehensive tourist management system built with React.js, featuring both customer-facing functionality and an administrative panel for managing tours, bookings, users, and destinations.

## 🚀 Features

### Customer Features
- **Modern React UI** - Built with React 18 and modern hooks
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Tour Discovery** - Browse available tours and destinations
- **Booking System** - Easy tour booking with confirmation
- **User Authentication** - Registration and login system
- **Personal Dashboard** - View booking history and manage account
- **Contact System** - Contact form and support information

### Admin Features
- **Admin Dashboard** - Overview of bookings, revenue, and statistics
- **Booking Management** - View, edit, and manage customer bookings
- **Tour Management** - Add, edit, and delete tours
- **User Management** - Manage customer accounts
- **Destination Management** - Manage tour destinations
- **Reports & Analytics** - View system statistics
- **Settings** - Configure system parameters

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Modern styling with Flexbox and Grid
- **Font Awesome** - Icons
- **Local Storage** - Data persistence

## 📁 Project Structure

```
tourist-management-system-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Message.js
│   │   ├── sections/
│   │   │   ├── Hero.js
│   │   │   ├── Destinations.js
│   │   │   ├── Tours.js
│   │   │   ├── Booking.js
│   │   │   └── Contact.js
│   │   ├── modals/
│   │   │   ├── LoginModal.js
│   │   │   ├── RegisterModal.js
│   │   │   └── Modal.css
│   │   └── admin/
│   │       ├── AdminSidebar.js
│   │       ├── AdminDashboard.js
│   │       ├── AdminBookings.js
│   │       ├── AdminTours.js
│   │       ├── AdminUsers.js
│   │       ├── AdminDestinations.js
│   │       ├── AdminReports.js
│   │       └── AdminSettings.js
│   ├── context/
│   │   └── AppContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── Admin.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd tourist-management-system-react
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
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to GitHub Pages (recommended for quick hosting)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that will build the app and publish the `build/` directory to GitHub Pages when you push to `main`.

Steps to enable Pages automatically:
1. Ensure this repository is pushed to GitHub and the `deploy-pages.yml` workflow is present.
2. Push to `main` (the workflow runs automatically).
3. In your repository on GitHub, go to Settings → Pages and confirm the Source is set to "GitHub Actions" (it will be configured automatically in most repos).

Notes:
- I added `homepage: "./"` to `package.json` so the build uses relative asset paths which works for project pages.
- A `public/404.html` was also added to enable SPA fallbacks on GitHub Pages (prevents 404s on refresh for BrowserRouter).


## 🎯 Usage

### For Customers
1. **Browse Tours** - Visit the home page to see available tours
2. **Register/Login** - Create an account or login to manage bookings
3. **Book Tours** - Select a tour, choose dates, and complete booking
4. **View Dashboard** - Access your personal booking history

### For Administrators
1. **Access Admin Panel** - Navigate to `/admin`
2. **Dashboard** - View system overview and statistics
3. **Manage Bookings** - View and manage all customer bookings
4. **Tour Management** - Add, edit, or remove tours
5. **User Management** - Manage customer accounts
6. **Settings** - Configure system parameters

## 🔧 Key Components

### State Management
- **AppContext** - Centralized state management using React Context
- **Local Storage** - Data persistence across browser sessions
- **Reducer Pattern** - Predictable state updates

### Routing
- **React Router** - Client-side routing
- **Protected Routes** - Admin-only access control
- **Navigation** - Smooth scrolling and navigation

### UI Components
- **Responsive Design** - Mobile-first approach
- **Modal System** - Interactive popups for forms
- **Form Validation** - Client-side validation
- **Loading States** - User feedback during operations

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full feature set with sidebar navigation
- **Tablet** - Optimized layout with touch-friendly controls
- **Mobile** - Compact design with collapsible navigation

## 🔐 Authentication

- **User Registration** - Create new accounts
- **Login System** - Secure authentication
- **Role-based Access** - Admin vs regular user permissions
- **Session Management** - Persistent login state

## 💾 Data Management

The system uses browser localStorage for data persistence:
- **Bookings** - Customer tour bookings
- **Tours** - Available tour packages
- **Users** - Customer and admin accounts
- **Destinations** - Tour destinations
- **Settings** - System configuration

## 🎨 Styling

- **CSS Modules** - Component-scoped styling
- **Flexbox & Grid** - Modern layout techniques
- **CSS Variables** - Consistent theming
- **Responsive Design** - Mobile-first approach
- **Animations** - Smooth transitions and effects

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload the `build` folder to Netlify
3. Configure redirects for React Router

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🔧 Customization

### Adding New Tours
1. Access the admin panel
2. Navigate to "Tours" section
3. Click "Add Tour" button
4. Fill in tour details and save

### Modifying Styles
- Edit component-specific CSS files
- Update global styles in `index.css`
- Modify theme variables in CSS

### Adding Features
- Extend the Context API for new state
- Create new components following existing patterns
- Add new routes in `App.js`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   npm start -- --port 3001
   ```

2. **Dependencies not installing**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   npm run build -- --verbose
   ```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Email: info@touristhub.com
- Phone: +1 (555) 123-4567

## 🔄 Version History

### Version 1.0.0
- Initial React implementation
- Complete customer and admin functionality
- Responsive design
- Local storage integration
- Modern React patterns and hooks

---

**Built with ❤️ using React.js**
A comprehensive tourist management system built with React.js, featuring both customer-facing functionality and an administrative panel for managing tours, bookings, users, and destinations.

## 🚀 Features

### Customer Features
- **Modern React UI** - Built with React 18 and modern hooks
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Tour Discovery** - Browse available tours and destinations
- **Booking System** - Easy tour booking with confirmation
- **User Authentication** - Registration and login system
- **Personal Dashboard** - View booking history and manage account
- **Contact System** - Contact form and support information

### Admin Features
- **Admin Dashboard** - Overview of bookings, revenue, and statistics
- **Booking Management** - View, edit, and manage customer bookings
- **Tour Management** - Add, edit, and delete tours
- **User Management** - Manage customer accounts
- **Destination Management** - Manage tour destinations
- **Reports & Analytics** - View system statistics
- **Settings** - Configure system parameters

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Modern styling with Flexbox and Grid
- **Font Awesome** - Icons
- **Local Storage** - Data persistence

## 📁 Project Structure

```
tourist-management-system-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Message.js
│   │   ├── sections/
│   │   │   ├── Hero.js
│   │   │   ├── Destinations.js
│   │   │   ├── Tours.js
│   │   │   ├── Booking.js
│   │   │   └── Contact.js
│   │   ├── modals/
│   │   │   ├── LoginModal.js
│   │   │   ├── RegisterModal.js
│   │   │   └── Modal.css
│   │   └── admin/
│   │       ├── AdminSidebar.js
│   │       ├── AdminDashboard.js
│   │       ├── AdminBookings.js
│   │       ├── AdminTours.js
│   │       ├── AdminUsers.js
│   │       ├── AdminDestinations.js
│   │       ├── AdminReports.js
│   │       └── AdminSettings.js
│   ├── context/
│   │   └── AppContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── Admin.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd tourist-management-system-react
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
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🎯 Usage

### For Customers
1. **Browse Tours** - Visit the home page to see available tours
2. **Register/Login** - Create an account or login to manage bookings
3. **Book Tours** - Select a tour, choose dates, and complete booking
4. **View Dashboard** - Access your personal booking history

### For Administrators
1. **Access Admin Panel** - Navigate to `/admin`
2. **Dashboard** - View system overview and statistics
3. **Manage Bookings** - View and manage all customer bookings
4. **Tour Management** - Add, edit, or remove tours
5. **User Management** - Manage customer accounts
6. **Settings** - Configure system parameters

## 🔧 Key Components

### State Management
- **AppContext** - Centralized state management using React Context
- **Local Storage** - Data persistence across browser sessions
- **Reducer Pattern** - Predictable state updates

### Routing
- **React Router** - Client-side routing
- **Protected Routes** - Admin-only access control
- **Navigation** - Smooth scrolling and navigation

### UI Components
- **Responsive Design** - Mobile-first approach
- **Modal System** - Interactive popups for forms
- **Form Validation** - Client-side validation
- **Loading States** - User feedback during operations

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full feature set with sidebar navigation
- **Tablet** - Optimized layout with touch-friendly controls
- **Mobile** - Compact design with collapsible navigation

## 🔐 Authentication

- **User Registration** - Create new accounts
- **Login System** - Secure authentication
- **Role-based Access** - Admin vs regular user permissions
- **Session Management** - Persistent login state

## 💾 Data Management

The system uses browser localStorage for data persistence:
- **Bookings** - Customer tour bookings
- **Tours** - Available tour packages
- **Users** - Customer and admin accounts
- **Destinations** - Tour destinations
- **Settings** - System configuration

## 🎨 Styling

- **CSS Modules** - Component-scoped styling
- **Flexbox & Grid** - Modern layout techniques
- **CSS Variables** - Consistent theming
- **Responsive Design** - Mobile-first approach
- **Animations** - Smooth transitions and effects

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload the `build` folder to Netlify
3. Configure redirects for React Router

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🔧 Customization

### Adding New Tours
1. Access the admin panel
2. Navigate to "Tours" section
3. Click "Add Tour" button
4. Fill in tour details and save

### Modifying Styles
- Edit component-specific CSS files
- Update global styles in `index.css`
- Modify theme variables in CSS

### Adding Features
- Extend the Context API for new state
- Create new components following existing patterns
- Add new routes in `App.js`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   npm start -- --port 3001
   ```

2. **Dependencies not installing**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   npm run build -- --verbose
   ```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Email: info@touristhub.com
- Phone: +1 (555) 123-4567

## 🔄 Version History

### Version 1.0.0
- Initial React implementation
- Complete customer and admin functionality
- Responsive design
- Local storage integration
- Modern React patterns and hooks

---

**Built with ❤️ using React.js**