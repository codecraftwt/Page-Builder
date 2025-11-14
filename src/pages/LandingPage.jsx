import { useEffect } from 'react';

export default function LandingPage({ data, viewMode = 'desktop' }) {
  useEffect(() => {}, []);

  const primary = data.colors?.primary || '#2563eb'; // blue-600
  const secondary = data.colors?.secondary || '#64748b'; // slate-500
  const bg = data.colors?.bg || '#f8fafc'; // slate-50
  const bgGradient = data.bgGradient || null;

  return (
    <div
      style={{
        background: bgGradient || bg,
        minHeight: '100vh',
        fontFamily: data.fontFamily || 'system-ui, -apple-system, sans-serif',
        color: '#1f2937',
      }}
    >
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold"
              style={{ color: primary }}
            >
              {data.company || 'Your Company'}
            </h1>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition"
                  style={{ color: 'black' }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative h-96 md:h-[500px] overflow-hidden">
        {data.heroImage ? (
          <img
            src={data.heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-6">
          <div className="max-w-3xl">
            <h1
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontSize: data.titleFontSize || '3rem' }}
            >
              {data.title || 'Welcome to Our Platform'}
            </h1>
            <p
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              style={{ fontSize: data.descriptionFontSize || '1.25rem' }}
            >
              {data.description || 'Transform your career with innovative solutions and opportunities.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 rounded-lg font-semibold text-white transition transform hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                Get Started
              </button>
              <button
                className="px-6 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        <section className="bg-white p-8 rounded-xl shadow-sm border-l-4" style={{ borderLeftColor: primary , backgroundColor: secondary }}>
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
            Featured Opportunity
          </h2>
          <div>
            <h3 className="text-xl font-bold mb-1">{data.title || 'Senior Frontend Engineer'}</h3>
            <p className="text-gray-600 mb-3">
              {data.company} • {data.location || 'Remote'} • Full-time
            </p>
            {data.salary && (
              <p className="text-lg font-semibold text-green-600 mb-4">{data.salary}</p>
            )}
            <p className="text-gray-700 mb-6 leading-relaxed">{data.description}</p>
            {/* <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'TypeScript', 'Tailwind'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: '#dbeafe', color: primary }}
                >
                  {skill}
                </span>
              ))}
            </div> */}
            <button
              className="px-6 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: primary }}
            >
              Apply Now
            </button>
          </div>
        </section>

        {data.services?.length > 0 && (
          <section id="services">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.services.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.features?.length > 0 && (
          <section id="about">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.features.map((f, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: primary }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.team?.length > 0 && (
          <section id="team">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {data.team.map((m, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: secondary }}
                  >
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-gray-600">{m.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{m.bio}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.testimonials?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
              What People Say
            </h2>
            <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`} >
              {data.testimonials.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm" style={{ backgroundColor: secondary }}>
                  <div className="flex items-center mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3"
                      style={{ backgroundColor: primary }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-gray-600">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm">"{t.comment}"</p>
                  <div className="text-yellow-500 mt-2">★★★★★</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.faq?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {data.faq.map((q, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{q.question}</h3>
                  <p className="text-gray-600">{q.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          className="text-center py-12 px-8 rounded-xl text-white"
          style={{ backgroundColor: primary }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
            Join thousands of professionals and unlock new opportunities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white font-semibold rounded-lg hover:opacity-90 transition"
              style={{ color: primary }}>
              Apply Now
            </button>
            <button className="px-8 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-4'} gap-8 mb-8`}>
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                {data.company || 'Company'}
              </h3>
              <p className="text-sm mb-4">Connecting talent with opportunity.</p>
              <div className="flex space-x-4 text-sm">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} className="hover:text-white">LinkedIn</a>
                )}
                {data.socialLinks?.twitter && (
                  <a href={data.socialLinks.twitter} className="hover:text-white">Twitter</a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} className="hover:text-white">GitHub</a>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-1 text-sm">
                {['Home', 'Services', 'About', 'Team', 'Contact'].map((link) => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-white">→ {link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Services</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-white">Web Development</a></li>
                <li><a href="#" className="hover:text-white">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p className="text-sm">{data.location || '123 Business Ave, City'}</p>
              <p className="text-sm">Phone: {data.phone || '(555) 000-1234'}</p>
              <p className="text-sm">Email: {data.email || 'hello@company.com'}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs">
            <p>© {new Date().getFullYear()} {data.company || 'Company'}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}