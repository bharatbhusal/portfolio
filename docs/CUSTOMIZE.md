# How to Fork and Customize

This portfolio has been designed to be fully customizable and reusable. You can adapt it to your own personal details, experiences, and GitHub repositories without altering core rendering components.

## Configuration & Customization Checklist

Follow these steps to customize the portfolio:

---

### Step 1: Environment Variables
Create a `.env` (or `.env.local`) file in the root of the project to configure your GitHub integration.
```env
# Your GitHub Username (Used to fetch repositories and streak details)
GITHUB_USERNAME=yourusername
NEXT_PUBLIC_GITHUB_USERNAME=yourusername

# (Optional) GitHub Token - Recommended to increase API rate limits (100 requests vs 5000 requests/hr)
# Generate one in GitHub Settings -> Developer Settings -> Personal Access Tokens (Classic or Fine-grained)
GITHUB_TOKEN=ghp_yourpersonaltokenhere
```

### Step 2: Personal Profile Photos
To replace the avatar images and favicons:
1. **Profile Photo**: Replace the image at `public/name.jpeg` with your own profile photo. Keep the filename as `name.jpeg`.
2. **Favicon/Logo**: Replace the image at `app/icon.jpg` with your own square logo/icon. Next.js will automatically detect this and render it as your site's favicon.

### Step 3: Bio, Name & Contact Details
Open [config/contact-info.ts](portfolio/config/contact-info.ts) and modify it with your name, job title, email, short bio, keywords, and social links:
```typescript
export const contactInfo = {
  name: {
    first: "YourName",
    last: "LastName",
    full: "YourName LastName",
  },
  title: "Software Engineer",
  email: "your.email@example.com",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourhandle",
    // ...
  },
  bio: "Brief developer tagline...",
};
```

### Step 4: Career & Experience
Open [data/careerData.ts](portfolio/data/careerData.ts) and replace the array with your employment history:
```typescript
export const careerData = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    period: "2024 - Present",
    description: "Built scalable web apps using Next.js...",
    highlights: ["Led team of 4", "Improved loading speed by 40%"],
  },
  // ...
];
```

### Step 5: Education & Certifications
Open [data/educationData.ts](portfolio/data/educationData.ts) and replace the array with your educational background:
```typescript
export const educationData = [
  {
    degree: "B.S. in Computer Science",
    school: "State University",
    period: "2020 - 2024",
    description: "Specialized in Software Engineering...",
    highlights: ["GPA: 3.9/4.0", "Dean's List"],
  },
  // ...
];
```

### Step 6: GitHub Repo Pinning
To control which projects are highlighted at the top of your portfolio projects page:
1. Go to your GitHub repository settings.
2. In the **About** section, add the tag `"pin"` (case-insensitive) to your repository's **Topics**.
3. The portfolio's listing page will automatically scan for the `"pin"` tag, move these repositories to the very top, highlight them with a special border, and hide the `"pin"` tag from the public topic badges.
