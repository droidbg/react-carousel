# 🔄 React Carousel / Card Slider with Animation and different backgrounds

A beautiful, customizable card slider/carousel component for React. Built with Tailwind CSS, Framer Motion, and Parcel for modern bundling.

Demo: 


https://github.com/user-attachments/assets/6dc9a263-d0f6-4569-a74b-0bfd14b99f74



---

## 🚀 Features

- Smooth scroll animation
- Left/Right arrow controls
- Custom card styles
- Responsive design
- Dynamic props (title, category, gradient, link)

---

## 📦 Installation

```bash
npm install react-carousel-latest
```

## Usage

```typescript
import CardSlider from "react-carousel-latest";

<CardSlider
  shape="star" // Background icons
  randomBackground={true} // Background color random or fixed
  slides={[
    {
      title: "Shooting Star",
      category: "Astronomy",
      description: "Catch the next meteor shower in style.",
      link: "https://google.com", //Open Link on click of the button
    },
    {
      title: "Star Chef",
      category: "Food",
      description: "A recipe that’s out of this world.",
      // If no Link is provided Card is not clickable
    },
    {
      title: "Rising Star",
      category: "Entertainment",
      description: "Meet the actor taking Hollywood by storm.",
      link: githubLink,
    },
  ]}
/>;
```

### Background Icons Available

```javascript
// shapesAvaiable = "blob" | "heart" | "star" | "bear" | "music" | "trophy" | "ring";
// By default blob shape is given.
```
