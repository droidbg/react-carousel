# 🔄 React Card Slider

A beautiful, customizable card slider/carousel component for React. Built with Tailwind CSS, Framer Motion, and Parcel for modern bundling.

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
npm install react-carousal
```

## Usage

```typescript
import { CardSlider } from "react-card-slider";

<CardSlider
  slides={[
    {
      title: "Science",
      category: "Subject",
      gradient: "linear-gradient(to right, #ff6a00, #ee0979)",
    },
    {
      title: "History",
      category: "Subject",
      gradient: "linear-gradient(to right, #6a11cb, #2575fc)",
    },
  ]}
  linkTo="/papers"
/>;
```
