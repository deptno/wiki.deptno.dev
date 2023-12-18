export const config = [
  {
    name: 'public',
    dir: 'public-wiki',
    diaryDir: 'diary',
    private: false,
  }
]

export type Wiki = {
  name: string
  dir: string
  diaryDir: string
  private?: Boolean
}
