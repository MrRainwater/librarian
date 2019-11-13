import * as got from 'got'
import * as metascraper from 'metascraper'
import * as author from 'metascraper-author'
import * as date from 'metascraper-date'
import * as description from 'metascraper-description'
import * as image from 'metascraper-image'
import * as logo from 'metascraper-logo'
import * as title from 'metascraper-title'
import * as urlScraper from 'metascraper-url'

const scraper = metascraper([
  title(),
  description(),
  image(),
  logo(),
  urlScraper(),
  author(),
  date()
])

export interface IMetadata {
  title?: string
  description?: string
  img?: string
  logo?: string
  url?: string
  author?: string
  date?: string
}

export async function getMetadata(
  targetUrl: string
): Promise<Partial<IMetadata>> {
  const { body: html, url } = await got(targetUrl)
  const metadata = await scraper({ html, url })
  metadata.img = metadata.image
  return metadata
}
