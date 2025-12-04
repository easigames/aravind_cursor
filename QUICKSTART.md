# Quick Start Guide - ArvEdit Website

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Customization Guide

### 1. Update Branding

**Logo & Company Name**
- File: `src/components/Header.tsx`
- Line 14-16: Change "ArvEdit" to your company name
- File: `src/components/Footer.tsx`
- Line 13-15: Update footer branding

### 2. Update Contact Information

**Email & Phone**
- File: `src/components/Contact.tsx`
- Lines 186-187: Update email addresses
- Lines 200-201: Update phone numbers
- File: `src/components/BookCall.tsx`
- Lines 126-136: Update contact details

**Physical Address**
- File: `src/components/Contact.tsx`
- Lines 214-215: Update address

### 3. Customize Colors

**Primary Color (Purple)**
Replace all instances of:
- `bg-purple-600` → `bg-[your-color]-600`
- `text-purple-600` → `text-[your-color]-600`
- `hover:bg-purple-700` → `hover:bg-[your-color]-700`

**Or use custom colors:**
```tsx
className="bg-[#YOUR_HEX_COLOR]"
```

### 4. Update Statistics

**Hero Section**
- File: `src/components/Hero.tsx`
- Lines 52-75: Update project counts, clients, awards, years

### 5. Add Your Content

**Services**
- File: `src/components/Services.tsx`
- Lines 4-49: Update service descriptions

**Portfolio Projects**
- File: `src/components/Portfolio.tsx`
- Lines 8-43: Update project data and images

**Client Case Studies**
- File: `src/components/OurClients.tsx`
- Lines 7-68: Update client information and videos

**Testimonials**
- File: `src/components/Testimonials.tsx`
- Lines 7-48: Update client testimonials

**FAQs**
- File: `src/components/FAQ.tsx`
- Lines 7-66: Update questions and answers

### 6. Update Images

**Replace Placeholder Images**
Current images use Unsplash URLs. Replace with your own:

```tsx
// Before
src="https://images.unsplash.com/photo-..."

// After
src="/images/your-image.jpg"
```

Place your images in the `public/images/` folder.

### 7. Social Media Links

**Update Social Links**
- File: `src/components/Contact.tsx`
- Lines 235-266: Update social media URLs
- File: `src/components/Footer.tsx`
- Lines 21-48: Update footer social links

### 8. Form Handling

**Connect Forms to Backend**

Currently forms use `console.log()`. Update to your backend:

```tsx
// In BookCall.tsx, Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Replace with your API endpoint
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  // Handle response
};
```

---

## 🎨 Common Customizations

### Change Font
Update in `src/app/layout.tsx`:
```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'] })
```

### Add New Section
1. Create component in `src/components/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to page layout
4. Update navigation in `src/components/Header.tsx`

### Modify Navigation
File: `src/components/Header.tsx`
- Lines 19-35: Desktop navigation
- Lines 79-122: Mobile navigation

### Change Animations
File: `src/app/globals.css`
- Lines 34-102: Custom animations
- Modify keyframes or add new ones

---

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Deploy to Other Platforms

```bash
# Build the app
npm run build

# The output will be in .next folder
# Upload to your hosting provider
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for TypeScript errors
npm run build

# Fix linting issues
npm run lint -- --fix
```

---

## 📚 File Structure Quick Reference

```
src/
├── app/
│   ├── globals.css      # Styles & animations
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page (update section order here)
│
└── components/
    ├── Header.tsx       # Navigation (update menu items)
    ├── Hero.tsx         # Hero section (update headline, stats)
    ├── Services.tsx     # Services (update offerings)
    ├── HowItWorks.tsx   # Process (update steps)
    ├── Portfolio.tsx    # Portfolio (update projects)
    ├── OurClients.tsx   # Clients (update case studies)
    ├── Testimonials.tsx # Testimonials (update reviews)
    ├── FAQ.tsx          # FAQs (update Q&A)
    ├── BookCall.tsx     # Booking form (connect to backend)
    ├── Contact.tsx      # Contact form (update info)
    └── Footer.tsx       # Footer (update links)
```

---

## 🎯 Next Steps

1. ✅ Update branding and colors
2. ✅ Replace placeholder content
3. ✅ Add your images
4. ✅ Update contact information
5. ✅ Connect forms to backend
6. ✅ Test on mobile devices
7. ✅ Deploy to production
8. ✅ Set up analytics
9. ✅ Configure SEO meta tags
10. ✅ Add your domain

---

## 💡 Tips

- **Keep it simple**: Don't over-customize initially
- **Test mobile first**: Most visitors will be on mobile
- **Optimize images**: Use WebP format for better performance
- **Update regularly**: Keep content fresh
- **Monitor analytics**: Track what works

---

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review [FEATURES.md](FEATURES.md) for complete feature list
- Contact: hello@videoedit.com

---

**Ready to launch?** Follow the steps above and you'll have a professional video editing website live in no time! 🚀

