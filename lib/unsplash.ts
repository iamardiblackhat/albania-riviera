export async function fetchUnsplashImage(query: string): Promise<string> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) {
    console.warn(`No UNSPLASH_ACCESS_KEY — using fallback for: ${query}`)
    return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` },
  })

  if (!res.ok) {
    console.warn(`Unsplash fetch failed for "${query}": ${res.status}`)
    return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`
  }

  const data = await res.json()
  const photo = data.results?.[0]
  if (!photo) {
    console.warn(`No results for "${query}"`)
    return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`
  }

  return photo.urls.regular as string
}
