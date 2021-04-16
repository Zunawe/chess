export class Coordinates {
  file: number
  rank: number

  constructor (file: number, rank: number)
  constructor (name: string)

  constructor (...args: any[]) {
    if (args.length === 1) {
      const name: string = args[0]
      this.file = name.charCodeAt(0) - 97
      this.rank = Number.parseInt(name[1]) - 1
    } else if (args.length === 2) {
      this.file = args[0]
      this.rank = args[1]
    } else {
      throw new Error('Wrong number of arguments to Coordinate constructor')
    }
  }

  toString (): string {
    return `${String.fromCharCode(this.file + 97)}${this.rank + 1}`
  }
}

export const coordinatesEqual = (a: Coordinates, b: Coordinates): boolean => {
  return a.rank === b.rank &&
    a.file === b.file
}
