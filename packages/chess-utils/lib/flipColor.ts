import { Color } from '.'

export const flipColor = (color: Color): Color => {
  return color === 'W' ? 'B' : 'W'
}
