/// <reference types="vitest" />
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Site config
import { siteConfig } from "./src/core/config/siteConfig";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return (
          html
            // Basic meta tags
            .replace(/<!-- SITE_NAME -->/g, siteConfig.name)
            .replace(/<!-- SITE_TAGLINE -->/g, siteConfig.tagline)
            .replace(/<!-- SITE_DESCRIPTION -->/g, siteConfig.description)

            // Contact information
            .replace(/<!-- CONTACT_EMAIL -->/g, siteConfig.contact.email)
            .replace(/<!-- CONTACT_PHONE -->/g, siteConfig.contact.phone)
            .replace(/<!-- CONTACT_ADDRESS -->/g, siteConfig.contact.address)

            // Open Graph and Twitter Tags
            .replace(/<!-- SITE_NAME -->/g, siteConfig.name)
            .replace(/<!-- SITE_DESCRIPTION -->/g, siteConfig.description)

            // Social Links
            .replace(/<!-- SOCIAL_LINKEDIN -->/g, siteConfig.social.linkedin)
            .replace(/<!-- SOCIAL_TWITTER -->/g, siteConfig.social.twitter)
            .replace(/<!-- SOCIAL_FACEBOOK -->/g, siteConfig.social.facebook)
        );
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
