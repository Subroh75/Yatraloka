'use client';

import Link from 'next/link';

const post = {
  title: 'Why YatraLoka is the Smartest Way to Book Travel in 2026',
  description: 'Discover how our AI-driven platform revolutionizes travel booking with transparent pricing and unbeatable value.',
  date: '2026-03-14',
  author: 'Yatraloka Team',
  tags: ['travel', 'AI', 'booking', 'transparency'],
  content: `
<h2>Revolutionizing Travel Booking with AI</h2>
<p>In 2026, travel booking is no longer about endless scrolling through confusing sites. At YatraLoka, we've harnessed the power of AI to make finding the best deals effortless. Our 'Best Value' search algorithm analyzes thousands of flights in real-time, prioritizing options that offer the most savings without compromising quality.</p>

<h2>Transparent Pricing You Can Trust</h2>
<p>Unlike traditional platforms that hide markups, we charge a clear 5% transparency fee on every booking. This means you see exactly what you're paying for — no hidden corporate profits eating into your travel budget. Our Growth Scout margin is applied upfront, so you can book with confidence knowing you're getting genuine value.</p>

<h2>Why Choose YatraLoka?</h2>
<ul>
  <li><strong>AI-Powered Search:</strong> Instant recommendations tailored to your preferences.</li>
  <li><strong>Real-Time Deals:</strong> Limited-time offers highlighted automatically.</li>
  <li><strong>Seamless Booking:</strong> Confirm your trip in seconds with our streamlined process.</li>
  <li><strong>Transparent Fees:</strong> Only 5% — no surprises.</li>
</ul>

<h2>Ready to Travel Smarter?</h2>
<p>Start your journey with YatraLoka today. Search for flights, discover deals, and book with peace of mind.</p>
`,
};

function generateSchema(post: typeof post, slug: string) {
  const url = `https://your-domain.com/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: post.tags.join(','),
  };
}

export default function BlogPostPage() {
  const schema = generateSchema(post, 'why-yatraloka');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white/10 p-10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <h1 className="text-4xl font-bold text-white">{post.title}</h1>
              <p className="mt-2 text-lg text-white/80">{post.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>

              <article className="mt-10 prose prose-invert max-w-none text-white">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              <div className="mt-10 rounded-2xl bg-white/20 p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Ready to Book Your Trip?</h3>
                <Link
                  href="/"
                  className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
                >
                  Search Flights Now
                </Link>
              </div>

              <script type="application/ld+json">
                {JSON.stringify(schema, null, 2)}
              </script>
            </div>
          </div>

          {/* Glassmorphic Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Latest Posts</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/welcome-to-yatraloka" className="text-white/80 hover:text-white text-sm">
                    Welcome to Yatraloka
                  </Link>
                </li>
                <li>
                  <Link href="/blog/top-5-hidden-gems" className="text-white/80 hover:text-white text-sm">
                    Top 5 Hidden Gems
                  </Link>
                </li>
                <li>
                  <Link href="/blog/how-to-find-cheap-flights" className="text-white/80 hover:text-white text-sm">
                    How to Find Cheap Flights
                  </Link>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <h4 className="text-sm font-semibold text-white mb-2">Why Choose Us?</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• AI-Driven Search</li>
                  <li>• Transparent 5% Fee</li>
                  <li>• Real-Time Deals</li>
                  <li>• Instant Booking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
</content>
<parameter name="filePath">/workspaces/Yatraloka/src/app/blog/why-yatraloka/page.tsx