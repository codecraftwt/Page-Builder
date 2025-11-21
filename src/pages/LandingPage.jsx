// src/components/LandingPage.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedField } from "../store/slices/editorSlice.js";
import EditableField from "../components/editor/EditableField.jsx";

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mt-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        viewBox="0 0 24 24"
        fill={rating >= star ? "#facc15" : "none"}
        stroke={rating >= star ? "#facc15" : "#d1d5db"}
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function LandingPage({ data, viewMode = "desktop" }) {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);

  useEffect(() => {
    const check = () => setForceMobile(viewMode === "mobile" || window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [viewMode]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const primary = data.colors?.primary || "#2563eb";
  const secondary = data.colors?.secondary || "#64748b";
  const bg = data.colors?.bg || "#f8fafc";
  const textColor = data.colors?.text || "#1f2937";
  const headingColor = data.colors?.heading || "#1f2937";
  const bgGradient = data.bgGradientEnabled
    ? `linear-gradient(to bottom, ${data.bgGradientStart || "#ffffff"}, ${data.bgGradientEnd || "#f8fafc"})`
    : null;

  const navItems = ["Home", "Services", "About", "Team", "Contact"];

  return (
    <div
      onClick={() => dispatch(clearSelectedField())}
      style={{
        background: bgGradient || bg,
        minHeight: "100vh",
        fontFamily: data.fontFamily || "system-ui, -apple-system, sans-serif",
        color: textColor,
        fontSize: data.bodyFontSize || "1rem",
      }}
    >
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <EditableField fieldId="header-company" label="Company Name" tag="h1" className="text-xl font-bold" style={{ color: primary }}>
              {data.company || "Your Company"}
            </EditableField>

            {!forceMobile && (
              <nav className="hidden md:flex space-x-8 text-sm font-medium">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition" style={{ color: "black" }}>
                    {item}
                  </a>
                ))}
              </nav>
            )}

            {forceMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Open menu"
              >
                <div className="space-y-1">
                  <span className="block w-6 h-0.5 bg-gray-800"></span>
                  <span className="block w-6 h-0.5 bg-gray-800"></span>
                  <span className="block w-6 h-0.5 bg-gray-800"></span>
                </div>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && forceMobile && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <EditableField fieldId="mobile-company" label="Company" tag="h2" className="text-lg font-bold" style={{ color: primary }}>
                {data.company || "Your Company"}
              </EditableField>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block py-3 px-4 text-base font-medium rounded-lg hover:bg-gray-50 transition" style={{ color: textColor }}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative h-96 md:h-[500px] overflow-hidden">
        {data.heroImage ? (
          <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" style={data.heroImageStyles || {}} />
        ) : (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <EditableField
              fieldId="hero-title"
              label="Hero Title"
              tag="h1"
              className="text-3xl md:text-5xl font-bold text-white"
              style={{ fontSize: data.titleFontSize || "3rem", textAlign: data.textAlign || "center" }}
            >
              {data.title || "Welcome to Our Platform"}
            </EditableField>

            <EditableField
              fieldId="hero-description"
              label="Hero Description"
              tag="p"
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              {data.description || "Transform your career with innovative solutions and opportunities."}
            </EditableField>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EditableField fieldId="hero-btn1" label="Primary Button" tag="button" className="px-6 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: primary, borderRadius: data.buttonBorderRadius || "0.5rem" }}>
                Get Started
              </EditableField>
              <EditableField fieldId="hero-btn2" label="Secondary Button" tag="button" className="px-6 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition" style={{ borderRadius: data.buttonBorderRadius || "0.5rem" }}>
                Learn More
              </EditableField>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {(() => {
          const sections = ["basic", "features", "testimonials", "about", "contact", "gallery", "faq", "pricing", "services", "team"];
          return (data.sectionOrder || []).filter(id => sections.includes(id)).map(id => {

            // BASIC - Featured Opportunity
            if (id === "basic") {
              return (
                <section key="basic" className="bg-white p-8 shadow-sm border-l-4 rounded-lg" style={{ borderLeftColor: primary, backgroundColor: secondary, borderRadius: data.cardBorderRadius || "0.5rem" }}>
                  <EditableField fieldId="basic-heading" label="Section Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>
                    Featured Opportunity
                  </EditableField>
                  <div>
                    <EditableField fieldId="basic-title" label="Job Title" tag="h3" className="text-xl font-bold mb-1">{data.title || "Senior Frontend Engineer"}</EditableField>
                    <p className="text-gray-600 mb-3">
                      <EditableField fieldId="basic-company" label="Company" tag="span" style={{ fontWeight: "bold" }}>{data.company}</EditableField>
                      {" • "}
                      <EditableField fieldId="basic-location" label="Location" tag="span">{data.location || "Remote"}</EditableField>
                      {" • Full-time"}
                    </p>
                    {data.salary && <EditableField fieldId="basic-salary" label="Salary" tag="p" className="text-lg font-semibold text-green-600 mb-4">{data.salary}</EditableField>}
                    <EditableField fieldId="basic-description" label="Description" tag="p" className="text-gray-700 mb-6 leading-relaxed">{data.description}</EditableField>
                    <button className="px-6 py-2 font-semibold text-white rounded" style={{ backgroundColor: primary, borderRadius: data.buttonBorderRadius || "0.5rem" }}>Apply Now</button>
                  </div>
                </section>
              );
            }

            // FEATURES
            if (id === "features" && data.features?.length > 0) {
              return (
                <section key="features" id="features">
                  <EditableField fieldId="features-heading" label="Features Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>Why Choose Us?</EditableField>
                  <div className="grid md:grid-cols-3 gap-6">
                    {data.features.map((f, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <div className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: primary }}>{i + 1}</div>
                        <EditableField fieldId={`features-${i}-title`} label="Feature Title" tag="h3" className="font-semibold text-lg mb-2">{f.title}</EditableField>
                        <EditableField fieldId={`features-${i}-description`} label="Feature Description" tag="p" className="text-gray-600 text-sm">{f.description}</EditableField>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // TESTIMONIALS
            if (id === "testimonials" && data.testimonials?.length > 0) {
              return (
                <section key="testimonials" id="testimonials">
                  <EditableField fieldId="testimonials-heading" label="Testimonials Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>What People Say</EditableField>
                  <div className={`grid ${viewMode === "mobile" ? "grid-cols-1" : "md:grid-cols-3"} gap-6`}>
                    {data.testimonials.map((t, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-sm" style={{ backgroundColor: secondary, borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: primary }}>{t.name?.[0] || "A"}</div>
                          <div>
                            <EditableField fieldId={`testimonials-${i}-name`} label="Name" tag="p" className="font-semibold text-sm">{t.name}</EditableField>
                            <EditableField fieldId={`testimonials-${i}-role`} label="Role" tag="p" className="text-xs text-gray-600">{t.role}</EditableField>
                          </div>
                        </div>
                        <EditableField fieldId={`testimonials-${i}-comment`} label="Comment" tag="p" className="text-gray-700 italic text-sm">"{t.comment}"</EditableField>
                        <div className="mt-3"><StarRating rating={t.rating || 5} /></div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // ABOUT
            if (id === "about" && (data.aboutTitle || data.aboutDescription || data.mission || data.vision)) {
              return (
                <section key="about" id="about">
                  <EditableField fieldId="about-heading" label="About Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>{data.aboutTitle || "About Us"}</EditableField>
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    {data.aboutDescription && <EditableField fieldId="about-description" label="About Description" tag="p" className="text-lg text-gray-700">{data.aboutDescription}</EditableField>}
                    {data.mission && (
                      <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
                        <EditableField fieldId="about-mission" label="Mission" tag="p" className="text-gray-600">{data.mission}</EditableField>
                      </div>
                    )}
                    {data.vision && (
                      <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <h3 className="font-semibold text-xl mb-2">Our Vision</h3>
                        <EditableField fieldId="about-vision" label="Vision" tag="p" className="text-gray-600">{data.vision}</EditableField>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // CONTACT
            if (id === "contact") {
              return (
                <section key="contact" id="contact">
                  <EditableField fieldId="contact-heading" label="Contact Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>{data.contactTitle || "Contact Us"}</EditableField>
                  <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                      <h3 className="font-semibold text-xl mb-4">Get In Touch</h3>
                      {data.address && <EditableField fieldId="contact-address" label="Address" tag="p" className="text-gray-600"><strong>Address:</strong><br />{data.address}</EditableField>}
                      {data.contactPhone && <EditableField fieldId="contact-phone" label="Phone" tag="p" className="text-gray-600"><strong>Phone:</strong> {data.contactPhone}</EditableField>}
                      {data.contactEmail && <EditableField fieldId="contact-email" label="Email" tag="p" className="text-gray-600"><strong>Email:</strong> {data.contactEmail}</EditableField>}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                      <h3 className="font-semibold text-xl mb-4">Follow Us</h3>
                      {data.linkedin && <EditableField fieldId="contact-linkedin" label="LinkedIn" tag="a" href={data.linkedin} className="block text-blue-600 hover:underline">LinkedIn</EditableField>}
                      {data.twitter && <EditableField fieldId="contact-twitter" label="Twitter" tag="a" href={data.twitter} className="block text-blue-600 hover:underline">Twitter</EditableField>}
                      {data.github && <EditableField fieldId="contact-github" label="GitHub" tag="a" href={data.github} className="block text-blue-600 hover:underline">GitHub</EditableField>}
                    </div>
                  </div>
                </section>
              );
            }

            // GALLERY
            if (id === "gallery" && data.gallery?.length > 0) {
              return (
                <section key="gallery" id="gallery">
                  <EditableField fieldId="gallery-heading" label="Gallery Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>Gallery</EditableField>
                  <div className="grid md:grid-cols-3 gap-6">
                    {data.gallery.map((g, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        {g.url && <img src={g.url} alt={g.title} className="w-full h-48 object-cover rounded mb-3" />}
                        <EditableField fieldId={`gallery-${i}-title`} label="Title" tag="h3" className="font-semibold text-lg mb-1">{g.title}</EditableField>
                        <EditableField fieldId={`gallery-${i}-description`} label="Description" tag="p" className="text-gray-600 text-sm">{g.description}</EditableField>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // PRICING
            if (id === "pricing" && data.pricing?.length > 0) {
              return (
                <section key="pricing" id="pricing">
                  <EditableField fieldId="pricing-heading" label="Pricing Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>Pricing Plans</EditableField>
                  <div className="grid md:grid-cols-3 gap-6">
                    {data.pricing.map((p, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <EditableField fieldId={`pricing-${i}-plan`} label="Plan Name" tag="h3" className="font-semibold text-xl mb-2">{p.plan}</EditableField>
                        <EditableField fieldId={`pricing-${i}-price`} label="Price" tag="p" className="text-3xl font-bold text-green-600 mb-4">{p.price}</EditableField>
                        {p.features && (
                          <EditableField fieldId={`pricing-${i}-features`} label="Features" tag="ul" className="text-gray-600 text-sm space-y-1">
                            {p.features.split(',').map((f, idx) => <li key={idx}>• {f.trim()}</li>)}
                          </EditableField>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // FAQ
            if (id === "faq" && data.faq?.length > 0) {
              return (
                <section key="faq" id="faq">
                  <EditableField fieldId="faq-heading" label="FAQ Heading" tag="h2" className="text-2xl font-bold text-center mb-8" style={{ color: headingColor }}>Frequently Asked Questions</EditableField>
                  <div className="max-w-3xl mx-auto space-y-4">
                    {data.faq.map((q, i) => (
                      <div key={i} className="bg-white p-5 rounded-lg shadow-sm" style={{ borderRadius: data.cardBorderRadius || "0.5rem" }}>
                        <EditableField fieldId={`faq-${i}-question`} label="Question" tag="h3" className="font-semibold text-lg mb-2">{q.question}</EditableField>
                        <EditableField fieldId={`faq-${i}-answer`} label="Answer" tag="p" className="text-gray-600">{q.answer}</EditableField>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            return null;
          }).filter(Boolean);
        })()}

        {/* CTA */}
        <section className="text-center py-12 px-8 rounded-xl text-white" style={{ backgroundColor: primary, borderRadius: data.cardBorderRadius || "0.5rem" }}>
          <EditableField fieldId="cta-title" label="CTA Title" tag="h2" className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</EditableField>
          <EditableField fieldId="cta-text" label="CTA Text" tag="p" className="text-lg mb-8 max-w-xl mx-auto opacity-90">
            Join thousands of professionals and unlock new opportunities today.
          </EditableField>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white font-semibold rounded-lg" style={{ color: primary, borderRadius: data.buttonBorderRadius || "0.5rem" }}>Apply Now</button>
            <button className="px-8 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition" style={{ borderRadius: data.buttonBorderRadius || "0.5rem" }}>Contact Us</button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableField fieldId="footer-copyright" label="Copyright" tag="p" className="text-xs">
            © {new Date().getFullYear()} {data.company || "Company"}. All rights reserved.
          </EditableField>
        </div>
      </footer>
    </div>
  );
}