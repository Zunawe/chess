export const toCoords = (f: number, r: number): number => {
  if (!validCoords(f, r)) {
    throw new Error(`Coordinates out of bounds: [${f}, ${r}]`)
  }
  return f + (8 * r)
}

export const validCoords = (...args: number[]): boolean => args.every((n) => n >= 0 && n <= 7)

export const getFile = (c: number): number => {
  return c % 8
}

export const getRank = (c: number): number => {
  return Math.floor(c / 8)
}

export const encodeFile = (f: number): string => {
  return String.fromCharCode(f + 97)
}

export const encodeRank = (r: number): string => {
  return String.fromCharCode(r + 49)
}

export const encodeCoords = (...args: number[]): string => {
  const f = args[1] === undefined ? getFile(args[0]) : args[0]
  const r = args[1] === undefined ? getRank(args[0]) : args[1]

  return encodeFile(f) + encodeRank(r)
}

export const decodeFile = (f: string): number => {
  return f.charCodeAt(0) - 97
}

export const decodeRank = (r: string): number => {
  return r.charCodeAt(0) - 49
}

export const decodeCoords = (c: string): number => {
  return toCoords(decodeFile(c[0]), decodeRank(c[1]))
}
