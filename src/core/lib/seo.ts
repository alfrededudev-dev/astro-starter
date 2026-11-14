
export interface SeoOptions {
  // Basic
  title?: string
  titleTemplate?: string
  titleDefault?: string
  description?: string
  lang?: string

  // Indexing
  noIndex?: boolean
  noFollow?: boolean
  noArchive?: boolean
  noCache?: boolean
  robotsExtras?: string

  // URLs
  canonical?: string | null

  // Default social image
  image?: string
  imageAlt?: string

  // Open Graph
  openGraph?: {
    title?: string
    description?: string
    type?: "website" | "article" | string
    image?: string
    imageAlt?: string
    imageWidth?: number
    imageHeight?: number
    imageType?: string
    locale?: string
    localeAlternate?: string[]
    siteName?: string
  }

  // Twitter / X
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player"
    title?: string
    description?: string
    image?: string
    imageAlt?: string
    site?: string
    creator?: string
  }

  // Blog / news articles
  article?: {
    publishedTime?: string
    modifiedTime?: string
    expirationTime?: string
    authors?: string[]
    section?: string
    tags?: string[]
  }

  // Multilingual SEO
  languageAlternates?: {
    href: string
    hrefLang: string
  }[]

  // Schema.org
  jsonLd?:
    | Record<string, unknown>
    | Record<string, unknown>[]
}
