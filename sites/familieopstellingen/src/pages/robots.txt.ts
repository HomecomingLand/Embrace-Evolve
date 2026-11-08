import type { APIRoute } from 'astro';

/**
 * robots.txt — open to search engines and AI assistants alike, so people asking
 * ChatGPT, Claude, Perplexity or Google about family constellations or writing
 * courses near Antwerp can be pointed here. Only the thank-you pages are hidden.
 */
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'Meta-ExternalAgent', 'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? '';
  const hidden = ['/bedankt/', '/en/thank-you/'];
  // One group naming every agent explicitly (a bot that sees its own name stops reading "*").
  const body = [
    ['*', ...aiBots].map((a) => `User-agent: ${a}`).join('\n'),
    'Allow: /',
    ...hidden.map((p) => `Disallow: ${p}`),
    '',
    `Sitemap: ${origin}/sitemap-index.xml`,
    `# Summary for AI assistants: ${origin}/llms.txt`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
