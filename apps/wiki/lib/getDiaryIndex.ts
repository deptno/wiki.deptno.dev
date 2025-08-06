export function getDiaryIndex(params: Params) {
  const { items, item } = params
  const index = items.findIndex((f) => f === item)

  if (index !== -1) {
    return index
  }

  items.push(item)
  items.sort()

  return items.findIndex((f) => f === item)
}

type Params = {
  items: string[]
  item: string
}
