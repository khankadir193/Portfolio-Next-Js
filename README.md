# Abdul Kadir Khan - Personal Portfolio

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Abdul%20Kadir%20Khan-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![Material--UI](https://img.shields.io/badge/Material--UI-7.3.9-blue?style=flat-square&logo=material-ui)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)

A stunning, modern personal portfolio website built with Next.js 16, featuring advanced animations, ambient background effects, and a responsive design. Showcasing Abdul Kadir Khan's journey as a Frontend Developer & Designer.

## 🌟 Features

### ✨ Advanced Animations
- **Ambient Background Motion**: Dynamic particle system with floating elements, geometric shapes, and wave animations
- **Background Name Display**: "ABDUL KADIR KHAN" appears throughout the page with subtle ambient animations
- **Interactive Card Animations**: Hover effects on skill, experience, and project cards
- **Hero Section Animations**: Smooth entrance animations for the main content

### 🎨 Design & UI
- **Dark Theme**: Modern dark color scheme with cyan/teal accent colors
- **Responsive Design**: Fully responsive across all device sizes
- **Material-UI Components**: Professional UI components with custom styling
- **Glassmorphism Effects**: Backdrop blur and transparency effects
- **Gradient Accents**: Beautiful gradient text and background effects

### 🚀 Performance
- **Next.js 16**: Latest Next.js with App Router
- **Optimized Fonts**: Geist font family for modern typography
- **CSS Modules**: Scoped styling for component isolation
- **Client-Side Hydration**: Optimized for performance

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.4** - Latest React with concurrent features
- **React DOM 19.2.4** - React rendering library

### UI & Styling
- **Material-UI 7.3.9** - React components library
- **Emotion** - CSS-in-JS styling solution
- **CSS Modules** - Scoped component styling
- **Geist Font** - Modern typography

### Development Tools
- **ESLint** - Code linting and formatting
- **Babel** - JavaScript transpilation
- **TypeScript Ready** - TypeScript configuration included

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router directory
│   ├── AmbientBackground.js      # Ambient background animation component
│   ├── AmbientBackground.module.css
│   ├── BackgroundName.js         # Background name display component
│   ├── BackgroundName.module.css
│   ├── CardComponents.js         # Reusable card components
│   ├── Footer.js                 # Site footer component
│   ├── globals.css               # Global styles
│   ├── Hero.js                   # Hero section component
│   ├── Hero.module.css
│   ├── layout.js                 # Root layout component
│   ├── MuiThemeProvider.js       # Material-UI theme provider
│   ├── Navbar.js                 # Navigation component
│   ├── page.js                   # Main page component
│   ├── page.module.css
│   └── favicon.ico
├── public/                       # Static assets
│   ├── kadir.jpg                 # Profile image
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── package.json                  # Dependencies and scripts
├── next.config.mjs              # Next.js configuration
├── jsconfig.json                # JavaScript configuration
├── eslint.config.mjs            # ESLint configuration
└── README.md                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18.17 or later)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 Customization

### Personal Information
Edit the personal details in `app/page.js`:
- Update name, bio, and contact information
- Modify skills, experience, and projects data
- Change social media links in `app/Footer.js`

### Styling
- **Colors**: Modify CSS custom properties in `app/globals.css`
- **Animations**: Adjust timing and effects in component CSS modules
- **Layout**: Customize responsive breakpoints and spacing

### Images
Replace `public/kadir.jpg` with your own profile image.

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Other Platforms
The project can be deployed to any platform supporting Next.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**

Build command: `npm run build`  
Output directory: `.next`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎭 Animation Features

### Ambient Background
- Floating particles with random colors and sizes
- Geometric shapes with morphing animations
- Wave effects at the bottom of the page
- Gradient orbs with pulsing effects

### Background Name Display
- Multiple instances of "ABDUL KADIR KHAN" scattered across the page
- Central name with glowing effects
- Scattered individual letters with drifting animations
- Subtle opacity to maintain content readability

### Interactive Elements
- Card hover animations with 3D transforms
- Navigation link hover effects
- Button interactions with scaling and shadows

## 🔧 Development

### Code Style
- **ESLint**: Configured for React and Next.js best practices
- **CSS Modules**: Scoped styling for component isolation
- **Component Structure**: Functional components with hooks

### Performance Optimization
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Self-hosted fonts with preloading
- **CSS Optimization**: Automatic CSS minification and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Material-UI** for the comprehensive component library
- **Vercel** for hosting and deployment platform
- **Geist Font** for the beautiful typography

## 📞 Contact

**Abdul Kadir Khan**
- **Email**: abdulkadirkhan@example.com
- **LinkedIn**: [linkedin.com/in/abdulkadirkhan](https://linkedin.com/in/abdulkadirkhan)
- **Portfolio**: [abdulkadirkhan.dev](https://abdulkadirkhan.dev)

---

⭐ **Star this repo** if you found it helpful!

Made with ❤️ by Abdul Kadir Khan
