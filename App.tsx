import React from "react";
import ReactDOM from "react-dom/client";
import CardSlider from ".";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <div>
      <div className="bg-purple-500 text-white p-2 text-center text-xl font-bold mb-4">
        REACT CRAOUSEL DEMONSTRATION
      </div>

      <CardSlider
        slides={[
          {
            title: "Sliding Window",
            category: "DSA",
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
