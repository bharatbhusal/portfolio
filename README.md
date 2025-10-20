# Portfolio Website

Welcome to my portfolio website! This is a modern, fully-featured Next.js portfolio showcasing skills, experiences, projects, and educational background with interactive features and seamless mobile integration.

## ✨ Features

### 🎯 Core Features

- **vCard QR Code Integration**: Scan QR code on mobile devices (iOS/Android) to instantly save contact information
- **Dark/Light Theme**: Smooth theme switching with persistent preferences
- **Responsive Design**: Optimized for all screen sizes and devices
- **Interactive UI**: Smooth animations and transitions throughout
- **Social Connections**: Links to professional profiles (LinkedIn, Twitter, GitHub, etc.)
- **Work Experience**: Detailed career journey with achievements
- **Education**: Academic background and qualifications
- **Projects**: Portfolio of major projects with live demos and source code

### 🔥 New Enhancements

- **Mobile Contact Saving**: QR code generates vCard file for direct contact saving
- **Modular Component Structure**: Clean, maintainable codebase
- **Shadcn/ui Integration**: Modern, accessible UI components
- **Centralized Configuration**: Easy to update personal information
- **Enhanced Accessibility**: WCAG compliant with keyboard navigation
- **Video Background**: Animated background in dark mode
- **Tooltip Support**: Helpful tooltips throughout the interface

## 🏗️ Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── api/
│   │   └── contact/
│   │       └── vcard/           # vCard generation endpoint
│   │           └── route.ts
│   ├── career/                  # Career page
│   ├── education/               # Education page
│   ├── projects/                # Projects page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Explore.tsx        # Navigation menu
│   │   └── ThemeSwitcher.tsx  # Theme toggle
│   ├── features/              # Feature components
│   │   ├── ToggleProfileQR.tsx # Profile/QR toggle with vCard
│   │   └── SocialLinks.tsx    # Social media links
│   ├── common/                # Shared components
│   │   └── VideoBackground.tsx # Animated background
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── avatar.tsx
│   │   ├── tooltip.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   └── cards/                 # Card components
│       ├── CareerCard.tsx
│       ├── EducationCard.tsx
│       └── ProjectsCard.tsx
├── config/                    # Configuration files
│   ├── contact-info.ts       # Contact details
│   ├── site-config.ts        # Site settings
│   └── index.ts              # Config exports
├── data/                     # Data files
│   ├── aboutMe.ts
│   ├── careerData.ts
│   ├── educationData.ts
│   └── projectsData.ts
├── lib/                      # Utility functions
│   └── utils.ts
└── public/                   # Static assets
    ├── videos/
    └── images/
```

## 🚀 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**:
  - [Lucide React](https://lucide.dev/) - Modern icon library
  - [React Icons](https://react-icons.github.io/react-icons/) - Popular icon sets
- **QR Code**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)

## 📱 vCard Feature

### How it Works

1. **QR Code Generation**: The profile section displays a QR code that points to `/api/contact/vcard`
2. **vCard API**: Server-side endpoint generates a vCard (VCF) file with contact information
3. **Mobile Integration**:
   - iOS devices: Opens Contacts app with "Add Contact" prompt
   - Android devices: Prompts to save contact via default contacts app
4. **Data Included**:
   - Full name
   - Email address
   - Phone number
   - Website/Portfolio URL
   - Social media links (GitHub, LinkedIn, Twitter, etc.)
   - Profile photo
   - Professional title

### Testing the vCard

1. Run the development server
2. Navigate to the home page
3. Click the QR icon on the profile picture
4. Scan the QR code with your mobile device
5. Your phone should prompt to save the contact

## 🎨 Theme System

### Color Hierarchy

The theme system uses CSS variables for consistent theming:

**Light Mode**:

- Clean white background
- High contrast text
- Vibrant green primary color
- Subtle gray accents

**Dark Mode**:

- Deep dark background (#1A1A1A)
- Light text with proper contrast
- Enhanced green primary
- Elevated cards with depth

### Customization

Update theme colors in `global.css`:

```css
:root {
  --primary: 142.1 76.2% 36.3%; /* Your brand color */
  --background: 0 0% 100%;
  /* ... other variables */
}
```

## ⚙️ Configuration

### Update Personal Information

Edit `config/contact-info.ts`:

```typescript
export const contactInfo = {
  name: {
    full: "Your Name",
    first: "Your",
    last: "Name",
  },
  email: "your.email@example.com",
  phone: "+1-234-567-8900",
  // ... more settings
};
```

### Update Site Settings

Edit `config/site-config.ts`:

```typescript
export const siteConfig = {
  title: "Your Name",
  description: "Your tagline",
  url: "https://yourwebsite.com",
  // ... more settings
};
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bharatbhusal/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## 📋 Component Usage Examples

### Using ToggleProfileQR

```tsx
import ToggleProfileQR from "@/components/features/ToggleProfileQR";

<ToggleProfileQR
  profileUrl="/your-photo.jpg"
  qrValue={`${siteConfig.url}/api/contact/vcard`}
  name="Your Name"
/>;
```

### Using SocialLinks

```tsx
import SocialLinks from "@/components/features/SocialLinks";

<SocialLinks />;
```

### Using ThemeSwitcher

```tsx
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

<ThemeSwitcher />;
```

## ♿ Accessibility

This portfolio follows WCAG 2.1 Level AA standards:

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators
- Proper heading hierarchy
- Color contrast ratios
- Screen reader friendly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bharatbhusal/portfolio/issues).

## 📧 Contact

Bharat Bhusal

- Website: [bharatbhusal.com](https://bharatbhusal.com)
- Email: bharatbhusal78@gmail.com
- LinkedIn: [bharatbhusal](https://linkedin.com/in/bharatbhusal/)
- GitHub: [@bharatbhusal](https://github.com/bharatbhusal)
- Twitter: [@bharatbhusal02](https://twitter.com/bharatbhusal02)

---

Made with ❤️ by Bharat Bhusal
