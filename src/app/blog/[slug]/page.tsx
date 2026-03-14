'use client';

import { notFound } from 'next/navigation';

type BlogPost = {
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
};

const posts: Record<string, BlogPost> = {
  'welcome-to-yatraloka': {
    title: 'Welcome to SafarCloud: Your Travel Planning HQ',
    description:
      'Get started with our latest deals, travel tips, and curated destination guides.',
    date: '2026-03-14',
    author: 'SafarCloud Team',
    tags: ['travel', 'deals', 'tips'],
    content: `
<h2>Start Exploring Today</h2>

<p>Welcome to <strong>SafarCloud</strong> — your one-stop destination for finding the best flight deals and planning unforgettable trips. Our goal is to help you travel smart, spend less, and discover new places with confidence.</p>

<h3>What you can do here</h3>
<ul>
  <li>Search flights and compare prices in seconds.</li>
  <li>See recommended deals highlighted with urgency badges.</li>
  <li>Book with confidence knowing your fare includes a transparent margin.</li>
</ul>

<h3>What’s next?</h3>
<p>We’ll be adding more guides, destination spotlights, and travel strategies. Check back regularly or subscribe to updates.</p>
`,
  },
  'top-5-hidden-gems': {
    title: 'Top 5 Hidden Gems for Your Next Escape',
    description:
      'Discover underrated destinations that deliver unforgettable experiences.',
    date: '2026-03-14',
    author: 'SafarCloud Team',
    tags: ['destinations', 'travel'],
    content: `
<h2>Step Off the Beaten Path</h2>

<p>Finding the right destination is half the adventure. Here are five underrated spots with big rewards:</p>

<ol>
  <li><strong>Zanzibar, Tanzania</strong> – Beaches, spice markets, and easy island hopping.</li>
  <li><strong>Ljubljana, Slovenia</strong> – Charming canals and a cozy European vibe.</li>
  <li><strong>Kyoto, Japan</strong> – Traditional culture, temples, and seasonal festivals.</li>
  <li><strong>Cartagena, Colombia</strong> – Colorful streets and Caribbean coastlines.</li>
  <li><strong>Porto, Portugal</strong> – Historic wine cellars and riverside charm.</li>
</ol>

<p>Each of these places offers something unique without the crowds.</p>
`,
  },
  'how-to-find-cheap-flights': {
    title: 'How to Find Cheap Flights (Without the Stress)',
    description:
      'Learn simple tricks that help you score better fares and travel smarter.',
    date: '2026-03-14',
    author: 'SafarCloud Team',
    tags: ['flights', 'money-saving', 'travel'],
    content: `
<h2>Smart Search Strategies</h2>

<p>To score cheaper flights, consider these easy practices:</p>

<ul>
  <li>Search in incognito mode to avoid price tracking.</li>
  <li>Compare nearby airports and flexible dates.</li>
  <li>Book 6–8 weeks in advance for best prices.</li>
</ul>

<p>Our platform helps surface the best options quickly so you can book with confidence.</p>
`,
  },
};

function generateSchema(post: BlogPost, slug: string) {
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) {
    notFound();
  }

  const schema = generateSchema(post, params.slug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#A2D2FF] to-[#FF7E5F] py-16">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="rounded-3xl bg-white/10 p-10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-[var(--heading)]">{post.title}</h1>
          <p className="mt-2 text-lg text-white/80">{post.description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <article className="mt-10 prose prose-invert max-w-none text-white">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <script type="application/ld+json">
            {JSON.stringify(schema, null, 2)}
          </script>
        </div>
      </div>
    </main>
  );
}
