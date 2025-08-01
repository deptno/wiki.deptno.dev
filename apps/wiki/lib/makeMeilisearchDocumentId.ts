export function makeMeilisearchDocumentId(source: string): string {
  const key = source
    .toLowerCase()
    .slice(0, -3)

  return Buffer.from(key).toString('hex')
}
