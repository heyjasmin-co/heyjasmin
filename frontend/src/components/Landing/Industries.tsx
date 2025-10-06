function Industries() {
  const industries = [
    { icon: "🏠", name: "Home Services" },
    { icon: "💇", name: "Salons & Spas" },
    { icon: "🚗", name: "Auto Services" },
    { icon: "🏋️", name: "Fitness Centers" },
    { icon: "🏥", name: "Healthcare" },
    { icon: "🏢", name: "Real Estate" },
  ];
  return (
    <section id="industries" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 sm:text-4xl">
          Built for businesses like yours
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-2 text-4xl">{industry.icon}</div>
              <p className="text-sm font-semibold text-gray-900">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
