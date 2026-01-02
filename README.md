# 🕉️ Shree Mahamaya Temple - Official Website

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/nitttishsharma/mahamayaraipurmandir)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)](https://vitejs.dev/)

A modern, feature-rich website for Shree Mahamaya Temple in Raipur, built with React and Supabase. This platform provides comprehensive temple information, event management, donation tracking, and a powerful admin panel for content management.

## 🌟 Features

### Public Features
- **🏛️ Temple Information** - Comprehensive details about the temple, its history, and significance
- **📅 Events Management** - Browse upcoming and past temple events with detailed information
- **🖼️ Photo Gallery** - Beautiful image gallery with lightbox view and categorization
- **👥 Committee Members** - Meet the temple management committee
- **💰 Donation System** - 
  - Multiple donation campaigns
  - Lead capture form before showing bank details
  - Payment screenshot upload
  - Real-time donation tracking
- **🎯 Online Services** - Direct links to YouTube Live, Facebook Live, and booking platforms
- **🌐 Multi-language Support** - Full English and Hindi language support
- **📱 Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **🔔 Welcome Popup** - Configurable welcome message with image and link

### Admin Features
- **🔐 Secure Authentication** - Supabase-powered admin login
- **📊 Dashboard** - Centralized content management
- **✏️ Content Management**
  - Events CRUD operations
  - Gallery image management
  - Committee member profiles
  - Donation campaign management
  - Site settings configuration
- **📈 Donation Leads** - View and track all donation inquiries with payment screenshots
- **🎨 Welcome Popup Control** - Enable/disable and customize the welcome popup
- **🔗 Live Links Management** - Update YouTube and Facebook live stream URLs
- **🖼️ Image Management** - Upload and manage images with Supabase Storage

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **React Router DOM 7.11.0** - Client-side routing
- **Vite 7.2.4** - Lightning-fast build tool
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Storage (for images)
  - Row Level Security (RLS)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
mahamayaraipurmandir-main/
├── public/
│   ├── images/           # Static images
│   ├── version.json      # Version information
│   └── _redirects        # SPA routing config
├── src/
│   ├── components/       # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   ├── DonationForm.jsx
│   │   ├── PaymentScreenshotUpload.jsx
│   │   ├── VersionChecker.jsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── LanguageContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/             # Static data files
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin panel pages
│   │   └── ...
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── supabaseClient.js # Supabase configuration
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json           # Vercel deployment config
└── netlify.toml          # Netlify deployment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitttishsharma/mahamayaraipurmandir.git
   cd mahamayaraipurmandir-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL migrations from the deployment guide
   - Configure Storage bucket named `images` with public read access
   - Set up authentication

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Hosting Platform

This project is configured for deployment on:
- **Vercel** (Recommended) - Zero configuration
- **Netlify** - Automatic deployment
- **Cloudflare Pages** - Fast global CDN

See the [Deployment Guide](docs/deployment_guide.md) for detailed instructions.

## 🗄️ Database Schema

### Tables
- `events` - Temple events and programs
- `gallery` - Photo gallery images
- `committee` - Committee member profiles
- `donations` - Donation campaigns
- `donation_leads` - Donor information and payment tracking
- `site_settings` - Configurable site settings

All tables have Row Level Security (RLS) enabled:
- Public read access
- Authenticated write access (admin only)

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Sign in with Supabase credentials
3. Access the admin dashboard at `/admin/dashboard`

### Admin Routes
- `/admin/dashboard` - Main dashboard
- `/admin/events` - Manage events
- `/admin/gallery` - Manage gallery
- `/admin/committee` - Manage committee members
- `/admin/donations` - Manage donation campaigns
- `/admin/donation-leads` - View donation leads
- `/admin/settings` - Site settings

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes |

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#8B4513',    // Main temple color
      secondary: '#D4AF37',  // Accent color
      // ... other colors
    }
  }
}
```

### Adding New Languages
1. Update `src/context/LanguageContext.jsx`
2. Add translations to the `translations` object
3. Update language selector in `Navbar.jsx`

## 📱 Features in Detail

### Donation Flow
1. User clicks "Donate" button
2. Fills out lead capture form (name, phone, amount, message)
3. Bank details are revealed after form submission
4. User can upload payment screenshot
5. Admin views all leads in the admin panel

### Toast Notifications
- Success messages (green)
- Error messages (red)
- Info messages (blue)
- Warning messages (amber)
- Confirmation dialogs (purple)

### Image Management
- All images stored in Supabase Storage
- Automatic deletion when records are removed
- Image upload with preview
- Supports PNG, JPG, JPEG formats

## 🐛 Troubleshooting

### Common Issues

**Issue: Blank page after deployment**
- Check browser console for errors
- Verify environment variables are set
- Ensure Supabase URL and keys are correct

**Issue: Images not loading**
- Check Supabase Storage bucket is public
- Verify RLS policies allow read access
- Check image URLs are correct

**Issue: Admin login fails**
- Verify Supabase authentication is enabled
- Check email/password in Supabase dashboard
- Clear browser cache and cookies

**Issue: Routes show 404**
- Ensure routing config files are deployed (`vercel.json`, `netlify.toml`, `_redirects`)
- Check hosting platform settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Nittish Sharma** - Initial development and deployment

## 🙏 Acknowledgments

- Shree Mahamaya Temple Committee
- Supabase for the amazing BaaS platform
- React and Vite communities
- All contributors and supporters

## 📞 Support

For issues, questions, or contributions:
- Open an issue on [GitHub](https://github.com/nitttishsharma/mahamayaraipurmandir/issues)
- Contact the temple administration

---

**Made with ❤️ for Shree Mahamaya Temple, Raipur**

**Version:** 1.0.0 | **Last Updated:** January 2, 2026
