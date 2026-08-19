const CategorySection = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    "All",
    "Announcements",
    "Events",
    "Student Contributions",
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
                  : "bg-green-50 text-green-800 hover:bg-green-100 hover:text-green-900"
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