export const config = [
  {
    dir: 'public-wiki',
    diaryDir: 'diary',
    private: false,
  }
]

export type Wiki = {
  dir: string
  diaryDir: string
  private?: Boolean
}
