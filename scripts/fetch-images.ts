import { fetchUnsplashImage } from '../lib/unsplash'
import { writeFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: join(process.cwd(), '.env.local') })

const queries: Record<string, string> = {
  hero: 'saranda albania coast aerial',
  'blue-eye': 'blue eye albania spring water turquoise',
  riviera: 'albanian riviera ionian sea coast',
  gjirokaster: 'gjirokaster stone city albania',
  butrint: 'butrint ruins albania archaeological',
  atv: 'atv quad bike mountains trail',
  boats: 'speedboat ionian sea clear water',
  horseback: 'horseback riding mountains trail',
  ksamil: 'ksamil beach albania islands',
  food: 'albanian seafood grilled fish mediterranean',
  wedding: 'outdoor wedding celebration elegant',
}

async function run() {
  console.log('Fetching images from Unsplash...')
  const result: Record<string, string> = {}

  for (const [key, query] of Object.entries(queries)) {
    console.log(`  Fetching: ${key} (${query})`)
    result[key] = await fetchUnsplashImage(query)
    // Rate limit: 50 req/hr on free tier
    await new Promise((r) => setTimeout(r, 300))
  }

  const outputPath = join(process.cwd(), 'data', 'images.json')
  writeFileSync(outputPath, JSON.stringify(result, null, 2))
  console.log(`Done. Written to ${outputPath}`)
}

run().catch(console.error)
