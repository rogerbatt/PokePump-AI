import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification and compression
    minify: 'terser',
    // Reduce chunk size warning limit for performance budget
    chunkSizeWarningLimit: 200,
    // Enable source map for debugging but keep it external
    sourcemap: false,
    rollupOptions: {
      // Aggressive tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        // More granular chunking for better caching
        manualChunks: (id) => {
          // React and React DOM - separate for better caching
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-router') && !id.includes('react-i18next')) {
            return 'react';
          }
          // Router - separate chunk for navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // Animation library - split further
          if (id.includes('motion') || id.includes('framer-motion')) {
            return 'animations';
          }
          // Internationalization
          if (id.includes('i18next')) {
            return 'i18n';
          }
          // UI Libraries
          if (id.includes('@radix-ui')) {
            return 'ui-radix';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Query library
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          // Utilities - smaller chunk
          if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      // External dependencies that should not be bundled
      external: () => {
        // Keep all dependencies internal for now, but this could be used
        // to externalize large libraries if using CDN
        return false;
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset handling
    assetsInlineLimit: 2048, // Inline assets smaller than 2KB
  },
  // Optimize dev server
  server: {
    // Enable compression in dev mode
    middlewareMode: false,
  },
  // Enable experimental features for better optimization
  esbuild: {
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Enable advanced minification
    legalComments: 'none',
    // Target modern browsers for smaller output
    target: 'es2022',
    // Enable more aggressive minification
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  // Additional optimization options
  define: {
    // Remove development-only code
    __DEV__: process.env.NODE_ENV === 'development'
  }
});
