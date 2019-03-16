import * as metascraper from 'metascraper'
import * as author from 'metascraper-author'
import * as date from 'metascraper-date'
import * as description from 'metascraper-description'
import * as image from 'metascraper-image'
import * as logo from 'metascraper-logo'
import * as title from 'metascraper-title'
import * as url from 'metascraper-url'
import * as got from 'got'

const scraper = metascraper([
  title(),
  description(),
  image(),
  logo(),
  url(),
  author(),
  date()
])

interface Metadata {
  title: string
  description: string
  image: string
  logo: string
  url: string
  author: string
  date: string
}

export default async function getMetadata(
  targetUrl: string
): Promise<Partial<Metadata>> {
  const { body: html, url } = await got(targetUrl)
  const metadata = await scraper({ html, url })
  return metadata
}
