import CardSlider from "react-carousel-latest";

const Example = () => {
  const githubLink = "https://github.com/droidbg/react-carousel";
  return (
    <div>
      <div className="bg-purple-500 text-white p-2 text-center text-xl font-bold mb-4">
        REACT CRAOUSEL DEMONSTRATION
      </div>

      <div className="btext-black p-2 text-xl font-bold">
        Trophy Icon in Background
      </div>

      <CardSlider
        shape="trophy"
        slides={[
          {
            title: "Champion's Journey",
            category: "Sports",
            description:
              "Follow the inspiring story of an athlete who overcame all odds to win gold.",
            link: githubLink,
          },
          {
            title: "Innovation Award",
            category: "Technology",
            description:
              "Discover the groundbreaking tech thats shaping the future.",
            link: githubLink,
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
      />

      <div className="btext-black p-2 text-xl font-bold">
        Random Background Color + Star in Background
      </div>

      <CardSlider
        shape="star"
        randomBackground={true}
        slides={[
          {
            title: "Shooting Star",
            category: "Astronomy",
            description: "Catch the next meteor shower in style.",
            link: githubLink,
          },
          {
            title: "Star Chef",
            category: "Food",
            description: "A recipe that’s out of this world.",
            link: githubLink,
          },
          {
            title: "Rising Star",
            category: "Entertainment",
            description: "Meet the actor taking Hollywood by storm.",
            link: githubLink,
          },
          {
            title: "Shooting Star",
            category: "Astronomy",
            description: "Catch the next meteor shower in style.",
            link: githubLink,
          },
          {
            title: "Star Chef",
            category: "Food",
            description: "A recipe that’s out of this world.",
            link: githubLink,
          },
          {
            title: "Rising Star",
            category: "Entertainment",
            description: "Meet the actor taking Hollywood by storm.",
            link: githubLink,
          },
        ]}
      />
      <div className="btext-black p-2 text-xl font-bold">
        Heart in Background
      </div>

      <CardSlider
        shape="heart"
        randomBackground={true}
        slides={[
          {
            title: "Eternal Love",
            category: "Relationships",
            description: "A story of passion that stands the test of time.",
            link: githubLink,
          },
          {
            title: "Self-Care Day",
            category: "Wellness",
            description: "Pamper yourself with these relaxing ideas.",
            link: githubLink,
          },
          {
            title: "Kindness Matters",
            category: "Inspiration",
            description: "Small acts that make a big difference.",
            link: githubLink,
          },
          {
            title: "Eternal Love",
            category: "Relationships",
            description: "A story of passion that stands the test of time.",
            link: githubLink,
          },
          {
            title: "Self-Care Day",
            category: "Wellness",
            description: "Pamper yourself with these relaxing ideas.",
            link: githubLink,
          },
          {
            title: "Kindness Matters",
            category: "Inspiration",
            description: "Small acts that make a big difference.",
            link: githubLink,
          },
        ]}
      />

      <div className="btext-black p-2 text-xl font-bold">
        Bear in Background
      </div>

      <CardSlider
        shape="bear"
        randomBackground={true}
        slides={[
          {
            title: "Eternal Love",
            category: "Relationships",
            description: "A story of passion that stands the test of time.",
            link: githubLink,
          },
          {
            title: "Self-Care Day",
            category: "Wellness",
            description: "Pamper yourself with these relaxing ideas.",
            link: githubLink,
          },
          {
            title: "Kindness Matters",
            category: "Inspiration",
            description: "Small acts that make a big difference.",
            link: githubLink,
          },
          {
            title: "Eternal Love",
            category: "Relationships",
            description: "A story of passion that stands the test of time.",
            link: githubLink,
          },
          {
            title: "Self-Care Day",
            category: "Wellness",
            description: "Pamper yourself with these relaxing ideas.",
            link: githubLink,
          },
          {
            title: "Kindness Matters",
            category: "Inspiration",
            description: "Small acts that make a big difference.",
            link: githubLink,
          },
        ]}
      />

      <div className="btext-black p-2 text-xl font-bold">
        Ring in Background
      </div>

      <CardSlider
        shape="ring"
        randomBackground={true}
        slides={[
          {
            title: "Commitment Code",
            category: "Open Source",
            description: "A repo dedicated to collaborative growth.",
            link: githubLink,
          },
          {
            title: "Unity Loop",
            category: "Community",
            description: "Bringing people together, one commit at a time.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
          {
            title: "Commitment Code",
            category: "Open Source",
            description: "A repo dedicated to collaborative growth.",
            link: githubLink,
          },
          {
            title: "Unity Loop",
            category: "Community",
            description: "Bringing people together, one commit at a time.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
        ]}
      />
      <div className="btext-black p-2 text-xl font-bold">
        Music in Background
      </div>

      <CardSlider
        shape="music"
        slides={[
          {
            title: "Commitment Code",
            category: "Open Source",
            description: "A repo dedicated to collaborative growth.",
            link: githubLink,
          },
          {
            title: "Unity Loop",
            category: "Community",
            description: "Bringing people together, one commit at a time.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
          {
            title: "Ring of Stars",
            category: "Astronomy",
            description: "Track constellations in this stellar project.",
            link: githubLink,
          },
        ]}
      />
    </div>
  );
};

export default Example;
