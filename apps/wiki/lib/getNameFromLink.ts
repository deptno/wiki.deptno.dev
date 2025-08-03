// String.prototype.replace 의 콜백으로 사용
//
export const getNameFromLink = (_match: string, $1: string) => {
  return $1
    .split('|')[0]
}
