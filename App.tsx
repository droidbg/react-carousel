import React from "react";
import ReactDOM from "react-dom/client";
import CardSlider from ".";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <div>
      <CardSlider
        slides={[
          {
            title: "Math",
            category: "Subject",
          },
          {
            title: "Math",
            category: "Subject",
          },
          {
            title: "Math",
            category: "Subject",
          },
          {
            title: "Math",
            category: "Subject",
          },
          {
            title: "Math",
            category: "Subject",
          },
          {
            title: "Math",
            category: "Subject",
          },
        ]}
      />
    </div>
  );
};

root.render(<App />);
