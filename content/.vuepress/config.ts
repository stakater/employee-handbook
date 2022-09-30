import { defineUserConfig } from '@vuepress/cli';
import { defaultTheme } from '@vuepress/theme-default';
import { searchPlugin } from '@vuepress/plugin-search';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { head, navbarEn, sidebarEn } from './configs';
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { clipboardPlugin } from 'vuepress-plugin-clipboard';
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { seoPlugin } from "vuepress-plugin-seo2";

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,

  shouldPrefetch: false,
  
  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Stakater Handbook',
      // Added empty string to override the default value
      description: ' ',
    },
  },

  // configure default theme
  theme: defaultTheme({
    logo: '/favicon.svg',
    docsDir: 'content',

    repo: "stakater/employee-handbook",
    editLink: true,
    editLinkText: "Help us improve this page!",

    lastUpdated: false,
    contributors: false,
    colorModeSwitch: true,
    colorMode: "auto",

    // theme-level locales config
    locales: {
      '/': {
        // navbar
        navbar: navbarEn,
        // sidebar
        sidebar: sidebarEn,
      },
    },

    themePlugins: {
      git: false,
      mediumZoom: false,
      activeHeaderLinks: true,
      backToTop: true,
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    googleAnalyticsPlugin({
      id: 'G-TTH1YYW5TX',
    }),
    photoSwipePlugin({
      delay: 0,
      options: {
        loop: false,
        preload: [3,3],
        preloaderDelay: 0,
      }
    }),
    clipboardPlugin({
      staticIcon: true,
      delay: 0,
      backgroundTransitionColor: "var(#000000)"
    }),
    pwaPlugin({
      skipWaiting: false,
      cleanupOutdatedCaches: true,
      offlineGoogleAnalytics: true,
    }),
    pwaPopupPlugin({
      locales: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
      }
    }),
    seoPlugin({
      hostname: 'stakater',
      fallBackImage: '/stakater.svg',
      autoDescription: true,
    })
  ],
})
