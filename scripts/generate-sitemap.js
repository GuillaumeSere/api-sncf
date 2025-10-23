/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const SITE_URL = process.env.SITE_URL || 'https://api-sncf.vercel.app/';

const readJson = (filePath) => {
  const abs = path.resolve(filePath);
  const content = fs.readFileSync(abs, 'utf8');
  return JSON.parse(content);
};

const escapeXml = (unsafe) =>
  String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildUrl = (pathname) => {
  const trimmedBase = SITE_URL.replace(/\/$/, '');
  const prefixedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${trimmedBase}${prefixedPath}`;
};

const main = () => {
  const gares = readJson(path.join(__dirname, '..', 'src', 'gares.json'));

  const urls = new Set();

  // Static routes
  urls.add(buildUrl('/'));
  urls.add(buildUrl('/toutes-les-gares'));

  // Dynamic city routes and station subroutes (based on data)
  Object.keys(gares).forEach((city) => {
    urls.add(buildUrl(`/${encodeURIComponent(city)}`));
    const stations = gares[city] || {};
    Object.values(stations).forEach((code) => {
      // Matches ":city/:codeStation" route
      urls.add(buildUrl(`/${encodeURIComponent(city)}/${encodeURIComponent(code)}`));
    });
  });

  const now = new Date().toISOString();

  const allUrls = Array.from(urls).sort();
  const MAX_URLS_PER_SITEMAP = 45000; // sous la limite 50k

  const publicDir = path.join(__dirname, '..', 'public');

  const writeSitemapChunk = (chunkUrls, index) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      chunkUrls
        .map((loc) =>
          `  <url>\n` +
          `    <loc>${escapeXml(loc)}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `    <changefreq>hourly</changefreq>\n` +
          `    <priority>0.8</priority>\n` +
          `  </url>`
        )
        .join('\n') +
      `\n</urlset>\n`;

    const filename = `sitemap-${index}.xml`;
    fs.writeFileSync(path.join(publicDir, filename), xml, 'utf8');
    return filename;
  };

  const chunkFilenames = [];
  for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_SITEMAP) {
    const chunk = allUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
    const filename = writeSitemapChunk(chunk, chunkFilenames.length + 1);
    chunkFilenames.push(filename);
  }

  if (chunkFilenames.length === 1) {
    // Renommer/écrire aussi sous sitemap.xml pour compat
    const single = fs.readFileSync(path.join(publicDir, chunkFilenames[0]), 'utf8');
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), single, 'utf8');
    console.log(`Sitemap généré: ${path.join(publicDir, 'sitemap.xml')}`);
  }

  // Générer un index
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    chunkFilenames
      .map((name) =>
        `  <sitemap>\n` +
        `    <loc>${escapeXml(buildUrl(`/${name}`))}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `  </sitemap>`
      )
      .join('\n') +
    `\n</sitemapindex>\n`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml, 'utf8');
  // Pour compat: pointer aussi sitemap.xml vers l'index si plusieurs chunks
  if (chunkFilenames.length > 1) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf8');
  }
  console.log(`Sitemap index généré: ${path.join(publicDir, 'sitemap-index.xml')}`);
};

main();


