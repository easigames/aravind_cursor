# ArvindLuxEdit - Professional Video Editing Website

A modern, responsive video editing services website built with Next.js 15, TypeScript, and Tailwind CSS. Inspired by professional creative agency designs.

## 🚀 Features

- **Modern Design**: Beautiful gradient backgrounds, smooth animations, and professional UI
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Interactive Components**: 
  - Sticky navigation header with mobile menu
  - Animated hero section with statistics
  - Services showcase with hover effects
  - Portfolio gallery with category filtering
  - Testimonials carousel
  - Contact form with validation
  - Newsletter subscription
- **Performance Optimized**: Built with Next.js 15 for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS for rapid development

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: SVG icons
- **Images**: Next.js Image optimization

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd arvind_editing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
arvind_editing/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and animations
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── Header.tsx       # Navigation header
│       ├── Hero.tsx         # Hero section
│       ├── Services.tsx     # Services showcase
│       ├── HowItWorks.tsx   # Process explanation
│       ├── Portfolio.tsx    # Portfolio gallery
│       ├── OurClients.tsx   # Client showcase with videos
│       ├── Testimonials.tsx # Client testimonials
│       ├── FAQ.tsx          # Frequently asked questions
│       ├── BookCall.tsx     # Call booking form
│       ├── Contact.tsx      # Contact form
│       └── Footer.tsx       # Footer section
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎨 Sections

### 1. Header
- Fixed navigation with smooth scrolling
- Mobile-responsive hamburger menu
- "Book a Call" CTA button
- Updated navigation links

### 2. Hero
- Animated gradient background with floating blobs
- Compelling headline and subheading
- Statistics showcase (500+ projects, 200+ clients)
- Dual call-to-action buttons
- Scroll indicator

### 3. Services
- 6 service cards with icons
- Hover animations and effects
- Detailed service descriptions
- Video Editing, Motion Graphics, Color Grading, Sound Design, Social Media, Post-Production

### 4. How It Works
- 5-step process visualization
- Numbered steps with icons
- Connected timeline design
- Clear process explanation from consultation to delivery

### 5. Portfolio
- Category filtering (All, Commercial, Corporate, Social, Music)
- Project cards with hover effects
- View counts and play buttons
- "View All Projects" CTA

### 6. Our Clients & Their Videos
- Interactive client showcase
- Featured video player with client information
- Client logo grid with 6+ featured clients
- Success metrics and testimonials
- Trusted brands section

### 7. Testimonials
- Interactive testimonial carousel
- Client photos and 5-star ratings
- Company information
- Navigation dots for easy browsing

### 8. FAQ
- 10 frequently asked questions
- Accordion-style expandable answers
- Topics: pricing, timeline, revisions, formats, etc.
- "Still Have Questions?" CTA section

### 9. Book a Call
- Comprehensive booking form
- Date and time selection
- Project type and budget options
- Benefits of consultation listed
- Direct contact information
- 30-minute free consultation offer

### 10. Contact
- Contact form with validation
- Multiple contact methods (email, phone, location)
- Social media integration
- Office location details

### 11. Footer
- Company information and branding
- Quick links to all sections
- Services list
- Newsletter subscription
- Social media icons
- Legal links (Privacy Policy, Terms of Service)

## 🎯 Customization

### Colors
The primary color scheme uses purple/blue gradients. To change:
- Edit Tailwind classes in components (e.g., `bg-purple-600`, `text-purple-600`)
- Update gradient classes in Hero section

### Content
- Update text content in each component file
- Replace placeholder images in Portfolio section
- Modify service offerings in Services component
- Update testimonials in Testimonials component

### Animations
Custom animations are defined in `src/app/globals.css`:
- `animate-blob`: Floating blob animation
- `animate-fade-in`: Fade in animation
- `animate-fade-in-up`: Fade in with upward motion

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Build for Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by becreatives.com
- Built with Next.js and Tailwind CSS
- Icons from Heroicons (SVG)

## 📧 Contact

For questions or support, please contact:
- Email: hello@videoedit.com
- Website: [Your Website URL]

---

Made with ❤️ using Next.js
