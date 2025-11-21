import { useEffect, useState } from "react";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function LandingPage({ data, viewMode = "desktop" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);

  useEffect(() => {
    const check = () => setForceMobile(viewMode === "mobile" || window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [viewMode]);

  // Colors & Styles
  const primary = data.colors?.primary || "#3b82f6";
  const textColor = data.colors?.text || "#1f2937";
  const headingColor = data.colors?.heading || "#111827";
  const bgColor = data.colors?.bg || "#ffffff";
  const bgGradient = data.bgGradientEnabled
    ? `linear-gradient(to bottom, ${data.bgGradientStart || "#f8fafc"}, ${data.bgGradientEnd || "#e2e8f0"})`
    : bgColor;

  const buttonStyle = {
    backgroundColor: primary,
    borderRadius: data.buttonBorderRadius || "12px",
  };

  return (
    <div
      style={{
        background: bgGradient,
        minHeight: "100vh",
        fontFamily: data.fontFamily || "system-ui, sans-serif",
        color: textColor,
        fontSize: data.bodyFontSize || "16px",
      }}
      className="leading-relaxed"
    >
      {/* Navbar */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: primary }}>
            {data.company || "Your Company"}
          </h1>

          {!forceMobile && (
            <nav className="hidden md:flex space-x-10">
              {(() => {
                const navItems = ["Home"];
                if (data.sectionOrder?.includes("jobDetails")) navItems.push("Job");
                if (data.sectionOrder?.includes("features")) navItems.push("Features");
                if (data.sectionOrder?.includes("testimonials")) navItems.push("Testimonials");
                if (data.sectionOrder?.includes("about")) navItems.push("About");
                if (data.sectionOrder?.includes("contact")) navItems.push("Contact");
                if (data.sectionOrder?.includes("gallery")) navItems.push("Gallery");
                if (data.sectionOrder?.includes("faq")) navItems.push("FAQ");
                if (data.sectionOrder?.includes("pricing")) navItems.push("Pricing");
                return navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-blue-600 font-semibold transition">
                    {item}
                  </a>
                ));
              })()}
            </nav>
          )}

          {forceMobile && (
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && forceMobile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold" style={{ color: primary }}>{data.company}</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl">×</button>
            </div>
            <nav className="space-y-6 text-xl">
              {(() => {
                const navItems = ["Home"];
                if (data.sectionOrder?.includes("jobDetails")) navItems.push("Job");
                if (data.sectionOrder?.includes("features")) navItems.push("Features");
                if (data.sectionOrder?.includes("testimonials")) navItems.push("Testimonials");
                if (data.sectionOrder?.includes("about")) navItems.push("About");
                if (data.sectionOrder?.includes("contact")) navItems.push("Contact");
                if (data.sectionOrder?.includes("gallery")) navItems.push("Gallery");
                if (data.sectionOrder?.includes("faq")) navItems.push("FAQ");
                if (data.sectionOrder?.includes("pricing")) navItems.push("Pricing");
                return navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600">
                    {item}
                  </a>
                ));
              })()}
            </nav>
          </div>
        </div>
      )}

      {/* HERO SECTION - Always First */}
      <section id="home" className="relative">
        {data.heroImage ? (
          <img
            src={data.heroImage}
            alt="Hero"
            className="w-full h-screen object-cover"
            style={data.heroImageStyles || {}}
          />
        ) : (
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 w-full h-screen" />
        )}

        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-6">
          <div className="max-w-5xl">
            <h1
              className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight"
              style={{
                ...data.titleStyles,
                textAlign: data.textAlign || "center",
              }}
            >
              {data.title || "We're Hiring!"}
            </h1>
            <p
              className="text-xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto"
              style={{
                ...data.descriptionStyles,
                textAlign: data.textAlign || "center",
              }}
            >
              {data.description || "Join our innovative team and build the future of technology."}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 text-xl font-bold text-white rounded-2xl hover:opacity-90 transition transform hover:scale-105 shadow-2xl" style={buttonStyle}>
                Apply Now
              </button>
              <button className="px-10 py-5 text-xl font-bold border-4 border-white text-white rounded-2xl hover:bg-white hover:text-gray-900 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

        {/* DYNAMIC SECTIONS - Respects sectionOrder */}
      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">

        {(data.sectionOrder || ["jobDetails", "features", "testimonials"]).map((sectionId) => {

          // JOB DETAILS SECTION
          if (sectionId === "jobDetails") {
            return (
              <section key="jobDetails" id="job" className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-12 md:p-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10" style={{ color: headingColor }}>
                      Job Opportunity
                    </h2>
                    <h3 className="text-3xl font-bold mb-8" style={data.titleStyles}>
                      {data.title || "Senior Frontend Developer"}
                    </h3>
                    <div className="space-y-6 text-lg">
                      <div className="flex items-center gap-4">
                        <span className="font-bold">Company:</span>
                        <span style={data.companyStyles}>{data.company || "TechCorp"}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">Location:</span>
                        <span style={data.locationStyles}>{data.location || "Remote"}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">Salary:</span>
                        <span className="text-2xl font-bold text-green-600" style={data.salaryStyles}>
                          {data.salary || "₹18–30 LPA"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">Email:</span>
                        <a href={`mailto:${data.email}`} style={data.emailStyles} className="underline">
                          {data.email || "careers@company.com"}
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">Phone:</span>
                        <span style={data.phoneStyles}>{data.phone || "+91 98765 43210"}</span>
                      </div>
                    </div>
                    <button className="mt-10 px-10 py-5 text-xl font-bold text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105" style={buttonStyle}>
                      Apply Now
                    </button>
                  </div>
                  <div className="bg-gray-100 border-2 border-dashed rounded-r-3xl flex items-center justify-center text-gray-500 text-2xl">
                    Company Logo
                  </div>
                </div>
              </section>
            );
          }

          // FEATURES SECTION
          if (sectionId === "features" && data.features?.length > 0) {
            return (
              <section key="features" id="features">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  Why Join Us?
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                  {data.features.map((f, i) => (
                    <div key={i} className="bg-white p-10 rounded-3xl shadow-xl text-center hover:shadow-2xl transition transform hover:-translate-y-2">
                      <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl font-bold text-blue-600">
                        {i + 1}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                      <p className="text-gray-600 text-lg">{f.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // TESTIMONIALS SECTION
          if (sectionId === "testimonials" && data.testimonials?.length > 0) {
            return (
              <section key="testimonials" id="testimonials">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  What Our Team Says
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                  {data.testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-10 rounded-3xl shadow-xl">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-5" style={{ backgroundColor: primary }}>
                          {t.name?.[0] || "A"}
                        </div>
                        <div>
                          <p className="font-bold text-xl">{t.name || "Anonymous"}</p>
                          <p className="text-gray-600">{t.role || "Team Member"}</p>
                        </div>
                      </div>
                      <p className="italic text-gray-700 text-lg mb-6">"{t.comment}"</p>
                      <StarRating rating={5} />
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // ABOUT SECTION
          if (sectionId === "about" && (data.aboutTitle || data.aboutDescription || data.mission || data.vision)) {
            return (
              <section key="about" id="about">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  {data.aboutTitle || "About Us"}
                </h2>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <p className="text-xl text-gray-700">{data.aboutDescription}</p>
                  {data.mission && (
                    <div className="bg-white p-8 rounded-3xl shadow-xl">
                      <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                      <p className="text-lg text-gray-600">{data.mission}</p>
                    </div>
                  )}
                  {data.vision && (
                    <div className="bg-white p-8 rounded-3xl shadow-xl">
                      <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                      <p className="text-lg text-gray-600">{data.vision}</p>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // CONTACT SECTION
          if (sectionId === "contact" && (data.contactTitle || data.address || data.contactPhone || data.contactEmail || data.linkedin || data.twitter || data.github)) {
            return (
              <section key="contact" id="contact">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  {data.contactTitle || "Contact Us"}
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                    <div className="space-y-4">
                      {data.address && <p><strong>Address:</strong> {data.address}</p>}
                      {data.contactPhone && <p><strong>Phone:</strong> {data.contactPhone}</p>}
                      {data.contactEmail && <p><strong>Email:</strong> <a href={`mailto:${data.contactEmail}`} className="underline">{data.contactEmail}</a></p>}
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                    <div className="flex gap-4">
                      {data.linkedin && <a href={data.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>}
                      {data.twitter && <a href={data.twitter} className="text-blue-400 hover:underline">Twitter</a>}
                      {data.github && <a href={data.github} className="text-gray-800 hover:underline">GitHub</a>}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // GALLERY SECTION
          if (sectionId === "gallery" && data.gallery?.length > 0) {
            return (
              <section key="gallery" id="gallery">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  Gallery
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {data.gallery.map((g, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-xl">
                      <img src={g.url} alt={g.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                      <h3 className="text-xl font-bold mb-2">{g.title}</h3>
                      <p className="text-gray-600">{g.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // FAQ SECTION
          if (sectionId === "faq" && data.faq?.length > 0) {
            return (
              <section key="faq" id="faq">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  Frequently Asked Questions
                </h2>
                <div className="max-w-4xl mx-auto space-y-6">
                  {data.faq.map((q, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-xl">
                      <h3 className="text-xl font-bold mb-4">{q.question}</h3>
                      <p className="text-gray-600">{q.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // PRICING SECTION
          if (sectionId === "pricing" && data.pricing?.length > 0) {
            return (
              <section key="pricing" id="pricing">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: headingColor }}>
                  Pricing Plans
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {data.pricing.map((p, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-xl text-center">
                      <h3 className="text-2xl font-bold mb-4">{p.plan}</h3>
                      <p className="text-3xl font-bold text-green-600 mb-6">{p.price}</p>
                      <ul className="text-left space-y-2 mb-6">
                        {p.features.split(',').map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature.trim()}
                          </li>
                        ))}
                      </ul>
                      <button className="px-6 py-3 text-white rounded-2xl font-bold" style={buttonStyle}>
                        Choose Plan
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}

        {/* Final CTA */}
        <section className="text-center py-24 rounded-3xl" style={{ backgroundColor: primary }}>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8">
            Ready to Join Us?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto opacity-90">
            Take the next step in your career with a team that values innovation and growth.
          </p>
          <button className="px-16 py-6 text-2xl font-bold bg-white text-blue-600 rounded-3xl hover:shadow-2xl transform hover:scale-110 transition duration-300 shadow-2xl">
            Apply Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">{data.company || "Your Company"}</h3>
          <p className="text-gray-400 text-lg mb-6">
            Building the future, one line of code at a time.
          </p>
          <p className="text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          {(data.email || data.phone) && (
            <p className="mt-6 text-gray-400">
              {data.email && <span>Contact: <a href={`mailto:${data.email}`} className="underline">{data.email}</a></span>}
              {data.phone && <span> | Phone: {data.phone}</span>}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}