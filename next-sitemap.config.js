/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fssai.magicscale.in", 
  generateRobotsTxt: true, 
  sitemapSize: 5000, 
  changefreq: "daily", 
  priority: 0.7, 
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
