# Portfolio Website

Welcome to my portfolio website! This is a modern, fully-featured Next.js portfolio showcasing skills, experiences, projects, and educational background with an immersive macOS-inspired design and seamless mobile integration.

## ✨ Features

### 🎯 Core Features

- **macOS-Style Windows**: Beautiful cards with macOS traffic light buttons (red, yellow, green)
- **Fullscreen Video Background**: Immersive animated background that fills the entire screen
- **GitHub Stats Integration**: Real-time GitHub statistics, streak, and top languages
- **vCard QR Code**: Scan QR code on mobile devices to instantly save contact information
- **Dark/Light Theme**: Smooth theme switching with persistent preferences
- **Responsive Design**: Optimized for mobile (sm), tablet (md), and desktop (lg) screens
- **Pinned Projects**: Feature your top 3 projects at the beginning
- **Interactive UI**: Smooth animations and transitions throughout
- **Social Connections**: Links to professional profiles (LinkedIn, Twitter, GitHub, etc.)

### 🎨 Design Highlights

- **macOS Aesthetic**: Window-style cards with functional close, minimize, and maximize buttons
- **Fullscreen Layout**: Video background positioned to fill entire viewport
- **Theme-Aware Stats**: GitHub stats automatically match light/dark mode
- **Responsive Breakpoints**:
  - Small (sm): Mobile devices
  - Medium (md): Tablets
  - Large (lg): Desktop screens
- **Modern Typography**: Responsive text sizing across breakpoints

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
│   ├── projects/                # Projects page with GitHub stats
│   ├── layout.tsx              # Root layout with fullscreen video
│   └── page.tsx                # Home page
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Explore.tsx        # Navigation menu
│   │   └── ThemeSwitcher.tsx  # Theme toggle
│   ├── features/              # Feature components
│   │   ├── ToggleProfileQR.tsx # Profile/QR toggle with vCard
│   │   ├── SocialLinks.tsx    # Social media links
│   │   └── GitHubStats.tsx    # GitHub statistics display
│   ├── common/                # Shared components
│   │   └── VideoBackground.tsx # Fullscreen animated background
│   ├── ui/                    # shadcn/ui + custom components
│   │   ├── button.tsx
│   │   ├── avatar.tsx
│   │   ├── tooltip.tsx
│   │   ├── badge.tsx
│   │   ├── mac-window.tsx     # macOS-style window wrapper
│   │   └── ...
│   └── cards/                 # Card components (use MacWindow)
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
│   └── projectsData.ts       # Includes isPinned property
├── types/                    # TypeScript type definitions
│   └── index.ts             # All interface definitions
├── lib/                      # Utility functions
│   └── utils.ts
└── public/                   # Static assets
    └── videos/              # Background videos
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
- **GitHub Stats**: [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)

## 🎨 macOS Window System

### MacWindow Component

The portfolio uses a custom `MacWindow` component that wraps content in a macOS-style window:

**Features**:

- Traffic light buttons (red, yellow, green) on top left
- Dynamic title bar
- Pinned indicator (📌) for featured items
- Theme-aware styling
- Responsive design

**Usage**:

```tsx
import MacWindow from "@/components/ui/mac-window";

<MacWindow title="Project Name" isPinned={true}>
  <div className="p-6">{/* Your content */}</div>
</MacWindow>;
```

### Video Background

The fullscreen video background creates an immersive experience:

**Technical Details**:

- Fixed positioning at z-index 0
- Fills entire viewport (100vw x 100vh)
- Configurable opacity (default 0.3)
- Theme-based video switching
- Smooth transitions between themes

**Customization**:

```tsx
<VideoBackground opacity={0.5} />
```

## � GitHub Stats Feature

### How it Works

The projects page displays real-time GitHub statistics using the GitHub Readme Stats API:

1. **GitHub Stats Card**: Shows total stars, commits, PRs, and contributions
2. **Streak Stats**: Displays current streak, longest streak, and contribution calendar
3. **Top Languages**: Shows most used programming languages in repositories

### Components

The `GitHubStats` component automatically:

- Detects current theme (light/dark)
- Fetches stats from GitHub Readme Stats API
- Updates styling to match portfolio theme
- Uses transparent backgrounds for seamless integration

### Customization

Update your GitHub username in `app/projects/page.tsx`:

```tsx
<GitHubStats username="your-github-username" />
```

## 📌 Pinned Projects

### Setting Featured Projects

Mark your top projects as pinned in `data/projectsData.ts`:

```typescript
export const projectsData: ProjectItem[] = [
  {
    project: "Featured Project",
    description: "...",
    technologies: [...],
    links: [...],
    isPinned: true,  // Add this property
  },
  // ... other projects
];
```

**Behavior**:

- Pinned projects appear first in the projects list
- Display a 📌 pin indicator in the window title
- Sorted automatically on page load
- Visual distinction with the pin icon

## �📱 Responsive Design

### Breakpoint Strategy

The portfolio uses Tailwind's responsive prefixes:

**Mobile First Approach**:

```tsx
className = "text-xl sm:text-3xl md:text-4xl lg:text-5xl";
```

**Breakpoints**:

- **sm** (640px): Mobile landscape, small tablets
- **md** (768px): Tablets, small laptops
- **lg** (1024px): Laptops, desktops
- **xl** (1280px): Large desktops

**Responsive Features**:

- Flexible card widths (11/12 → 10/12 → 1/2 → 1/3)
- Adaptive padding (px-4 → px-6 → px-8)
- Responsive typography
- Optimized carousel spacing
- Mobile-friendly navigation

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
- Fullscreen video background

### Customization

Update theme colors in `app/global.css`:

```css
:root {
  --primary: 142.1 76.2% 36.3%; /* Your brand color */
  --background: 0 0% 100%;
  /* ... other variables */
}

.dark {
  --primary: 142.1 70.6% 45.3%;
  --background: 0 0% 10%;
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

### Using MacWindow

```tsx
import MacWindow from "@/components/ui/mac-window";

<MacWindow title="Window Title" isPinned={false}>
  <div className="p-6">
    <p>Your content here</p>
  </div>
</MacWindow>;
```

### Using GitHubStats

```tsx
import GitHubStats from "@/components/features/GitHubStats";

<GitHubStats username="your-github-username" />;
```

### Using VideoBackground

```tsx
import VideoBackground from "@/components/common/VideoBackground";

<VideoBackground opacity={0.3} />;
```

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

## 🎯 Data Management

### Adding Projects

Edit `data/projectsData.ts`:

```typescript
import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    project: "Project Name",
    description: "Brief description of the project",
    technologies: ["React", "TypeScript", "Next.js"],
    links: [
      {
        link: "https://github.com/username/repo",
        icon: FaGithub,
      },
      {
        link: "https://demo.example.com",
        icon: CgWebsite,
      },
    ],
    isPinned: true, // Optional: feature this project
  },
];
```

### Adding Career Experience

Edit `data/careerData.ts`:

```typescript
import { CareerItem } from "@/types";

export const careerData: CareerItem[] = [
  {
    company: "Company Name",
    role: "Your Position",
    duration: "Jan 2020 - Present",
    address: "City, Country",
    description: "Role description",
    achievements: ["Achievement 1", "Achievement 2"],
    links: [
      {
        link: "https://company.com",
        icon: CgWebsite,
        type: "website",
      },
    ],
    isPinned: false, // Optional
  },
];
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
