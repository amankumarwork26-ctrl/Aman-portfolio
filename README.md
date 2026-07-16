# Aman Kumar Portfolio - Refactored Structure 

## 📁 Project Structure

Your portfolio has been successfully refactored. Now each section is stored in a separate HTML file:

```
 Portfolio Files
├── index.html              (Home Page - Profile Image Featured)
├── about.html              (About Section)
├── skills.html             (Technical Skills)
├── projects.html           (Projects Showcase)
├── certifications.html     (All Certificates)
├── contact.html            (Contact Form)
├── style.css               (Shared Styling for All Pages)
├── script.js               (Shared JavaScript for All Pages)
├── aman-profile.jpeg       (Profile Photo)
├── certificate-*.pdf       (Certificate Files)
└── certificate-*.jpeg      (Certificate Images)
```

---

##  Home Page (index.html)

### New Featured Section

Your profile image is displayed prominently at the top of the homepage, followed by your introduction and action buttons.

### Features

* Beautiful animated profile image with a gradient ring
* Typing effect (Web Developer, Python Programmer, etc.)
* CTA buttons linking to other sections
* Interactive particle network background

---

##  Page Navigation

### Available on Every Page

* Fixed navigation bar with links to all sections
* Footer with quick links and credits
* Consistent styling across all pages
* Shared JavaScript features such as custom cursor and animations

### Navigation Structure

```
Home (index.html) → Profile Image + Hero Content
    ↓
About (about.html) → Profile Image + Biography + Strengths
    ↓
Skills (skills.html) → Technical Skills Categories
    ↓
Projects (projects.html) → Project Showcase
    ↓
Certifications (certifications.html) → Certificates and Achievements
    ↓
Contact (contact.html) → Contact Form + Social Links
```

---

##  Home Page Highlights

### Profile Image Section

```html
<div class="hero-image-wrapper">
  <div class="hero-profile-image">
    <div class="image-ring"></div>
    <img src="aman-profile.jpeg" alt="Aman Kumar" class="profile-img" />
  </div>
</div>
```

### CSS Animations

  Gradient ring pulse animation
  Smooth fade-up entrance effect
  Professional styling with shadows and modern design

### Hero Content Section

  Welcome message
 Large name heading
  Dynamic typing effect with multiple roles
  Short professional description
  Three CTA buttons:

   Learn More
   Download Resume
   Contact Me
  Achievement statistics (Projects, Technologies, etc.)

---

##  Styling Enhancements

### New CSS Classes

 `.hero-image-wrapper` – Image container
 `.hero-profile-image` – Profile image wrapper
 `.image-ring` – Animated gradient border
 `.profile-img` – Profile image styling
 `.hero-text-wrapper` – Hero text content

### Added Animations

 `@keyframes pulse` – Animated ring effect
 Staggered entrance animations for image and text

---

##  Responsive Design

The portfolio is fully responsive and optimized for:

 Mobile Devices (320px+)
 Tablets (768px+)
 Desktop Screens (1024px+)

---

##  Navigation Links

All internal navigation links have been updated:

```javascript
Home      → index.html
About     → about.html
Skills    → skills.html
Projects  → projects.html
Certs     → certifications.html
Contact   → contact.html
```

---

##  EmailJS Integration

The contact form includes:

 Form validation
 Error handling
 EmailJS integration
 Success notifications
 Country code dropdown support

---

##  Usage Guide

### 1. Open the Home Page

```
Open index.html in your browser
```

### 2. Profile Image

 Your profile image will be displayed automatically
 Responsive design ensures a great appearance on all devices

### 3. Navigation

 Every page is connected through the navigation menu
 Mobile-friendly hamburger menu included

### 4. Deployment

 Keep all files in the same folder
 CSS, JavaScript, images, and certificates will work automatically

---

##  Features Summary

 Featured profile image on homepage
 Separate HTML file for each section
 Easy navigation between pages
 Fully responsive design
 Smooth animations and visual effects
 Contact form with validation
 Certificate showcase with links
 Social media integration
 Custom cursor effects
 Smooth scrolling experience

---

##  Files Created & Updated

### Created

 index.html (Homepage with featured profile image)
 about.html
 skills.html
 projects.html
 certifications.html
 contact.html

### Updated

 style.css (New styling and animation classes added)

### Reused

 script.js
 All images and certificate files

---

##  What's New?

### Before

All sections were displayed on a single page.

### After

 Dedicated page for each section
 Featured profile image on the homepage
 Better project organization
 Easier maintenance and updates
 More professional website structure

---

##  Next Steps

1. Place all files in the same folder.
2. Open `index.html` in your browser.
3. Test navigation across all pages.
4. Verify functionality before deployment.

---

**Built with ❤️ for Aman Kumar's Portfolio**

Happy Coding! 
