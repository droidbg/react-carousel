# 🔄 React Carousel / Card Slider Package with Animation and different backgrounds

A beautiful, customizable card slider/carousel component for React. Built with Tailwind CSS, Framer Motion, and Parcel for modern bundling.
Download [Carousel Package](https://www.npmjs.com/package/react-carousel-latest) from [Here](https://www.npmjs.com/package/react-carousel-latest). 

Check out the [demo here](https://react-carousel-latest.vercel.app/). 
 
![react_carousal_demo](https://github.com/user-attachments/assets/ebfc661f-4d01-4721-804f-03806b94737c)



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
