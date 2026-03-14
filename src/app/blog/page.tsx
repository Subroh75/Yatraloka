'use client';

import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 'welcome-to-yatraloka',
      title: 'Welcome to Yatraloka: Your Travel Planning HQ',
      excerpt:
        'Get started with our latest deals, travel tips, and curated destination guides.',
    },
    {
      id: 'top-5-hidden-gems',
      title: 'Top 5 Hidden Gems for Your Next Escape',
      excerpt:
        'Discover underrated destinations that deliver unforgettable experiences.',
    },
    {
      id: 'how-to-find-cheap-flights',
      title: 'How to Find Cheap Flights (Without the Stress)',
      excerpt:
        'Learn simple tricks that help you score better fares and travel smarter.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="rounded-3xl bg-white/10 p-10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-white">Yatraloka Blog</h1>
          <p className="mt-2 max-w-2xl text-lg text-white/80">
            Inspiration, tips, and travel guides to help you book smarter and explore
            further.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white/90 p-6 shadow-lg border border-white/20 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-gray-600">{post.excerpt}</p>
                <Link
                  href={`#${post.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-white/20 p-6 text-white/90">
            <h3 className="text-lg font-semibold">Start writing:</h3>
            <p className="mt-2 text-sm">
              Add new posts in the <code className="rounded bg-white/20 px-1 py-0.5">
                src/app/blog
              </code>{' '}
              folder. Each post can be a new page or a markdown file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
