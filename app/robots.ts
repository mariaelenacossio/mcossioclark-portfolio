import type { MetadataRoute } from 'next'

/**
 * /robots.txt generator.
 *
 * Allow all crawlers. Point to the sitemap so search engines can
 * discover every case study URL on first crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
      },
    ],
    sitemap: 'https://www.mariaelena-cossioclark.com/sitemap.xml',
    host:    'https://www.mariaelena-cossioclark.com',
  }
}
