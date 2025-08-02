export function makeMeilisearchDocumentId(filepath: string): string {
  const key = filepath
    .toLowerCase()
    .slice(0, -3)

  return Buffer.from(key).toString('hex')
}
