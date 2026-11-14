// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import playformCompress from "@playform/compress";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";

const site = process.env.SITE_URL
// System routes excluded from sitemap.
const excludedRoutes = [
  "/admin",
  "/draft",
  "/preview",
  "/api",
];

/**
 * @param {string} pathname
 * @returns {boolean}
 */
function isExcludedPath(pathname) {
  return excludedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// ====== ОСНОВНАЯ КОНФИГУРАЦИЯ ======
export default defineConfig({
  site,
  vite: {plugins: [tailwindcss()]},

  integrations: [// ====== 1. SITEMAP ======
    ...(site ?
      [sitemap({
        filter: (page) => {
          const pathname = new URL(page).pathname;
          return !isExcludedPath(pathname);
        },

        changefreq: ChangeFreqEnum.WEEKLY,
        priority: 0.7,

        serialize: (item) => {
          const pathname = new URL(item.url).pathname;
          if (pathname === "/") {
                item.priority = 1.0;
                item.changefreq = ChangeFreqEnum.DAILY;
          }

          return item;
        },
      })] : []
    ), 
    alpinejs(),
    
    // ====== COMPRESS  ======
    // Must be the last integration.
    playformCompress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
          minifyCSS: false,
          minifyJS: false,
          removeComments: false,
          collapseWhitespace: true,
        },
      },
      Image: true,
      JavaScript: {
        terser: {
          mangle: false,
        },
      },
      JSON: true,
      SVG: true,
      Exclude: [/\.min\.(js|css)$/, /service-worker\.js$/, /\.map$/],
      Logger: 1,
    })
  ],
});