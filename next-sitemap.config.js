/** @type {import('next-sitemap').IConfig} */
export default {
    siteUrl: 'https://funcircleapp.com',
    generateRobotsTxt: true, // Generate robots.txt file
    exclude: ['/admin/*', '/dashboard/*'], // Exclude private routes
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://funcircleapp.com/sitemap-events.xml', // If you have additional sitemaps
      ],
    },
    // Optional: Change the output directory of the generated files
    outDir: 'public',
  }