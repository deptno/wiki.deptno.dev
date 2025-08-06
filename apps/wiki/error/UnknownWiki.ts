export class UnknownWiki extends Error {
  constructor(wiki: string) {
    super(`Unknown wiki: ${wiki}`)
    this.name = 'UnknownWiki'
  }
}
