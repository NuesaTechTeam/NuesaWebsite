const CategorySection = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    "All",
    "Academic Tips",
    "Projects & Innovations",
    "Events Recaps",
    "Career & Internship Tips",
    "Alumni Spotlight",
    "Tech & Trends",
    "Student Contributions",
  ];

  return (
    <section className="max-w-7xl mx-auto px-2 pt-6">
      <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
        Explore by Category
      </h3>

      <div className="flex gap-3 overflow-x-auto scrollbar-hidden pb-2 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 transform ${
              activeCategory === cat
                ? "bg-green-600 text-white scale-105 shadow-sm"
                : "bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
