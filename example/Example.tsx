import CardSlider from "../src/CardSlider";

const Example = () => {
  return (
    <div>
      <div className="bg-purple-500 text-white p-2 text-center text-xl font-bold mb-4">
        REACT CRAOUSEL DEMONSTRATION
      </div>

      <CardSlider
        slides={[
          {
            title: "Champion's Journey",
            category: "Sports",
            description:
              "Follow the inspiring story of an athlete who overcame all odds to win gold.",
          },
          {
            title: "Innovation Award",
            category: "Technology",
            description:
              "Discover the groundbreaking tech that’s shaping the future.",
          },
          {
            title: "Top Performer",
            category: "Business",
            description:
              "Learn how this company skyrocketed to success in just one year.",
          },
          {
            title: "Creative Excellence",
            category: "Art",
            description:
              "A showcase of stunning designs that redefine creativity.",
          },
          {
            title: "Community Hero",
            category: "Social Impact",
            description:
              "Meet the individual making a difference in their local community.",
          },
        ]}
        shape="trophy"
      />
    </div>
  );
};

export default Example;
