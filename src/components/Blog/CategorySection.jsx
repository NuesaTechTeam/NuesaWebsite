const CategorySection = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    "All",
    "Announcements",
    "Events",
    "Student Contributions",
    "Academic Tips",
    "Projects & Innovations",
    "Events Recaps",
    "Career & Internship Tips",
    "Tech & Trends",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-2 pb-4">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive
                  ? "bg-green text-white"
                  : "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-800 hover:text-green-900 dark:hover:text-green-400"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;