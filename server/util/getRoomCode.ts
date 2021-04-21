import { Socket } from 'socket.io'

export const getRoomCode = (socket: Socket): string | undefined => {
  return [...socket.rooms].filter((r) => r !== socket.id)[0]
}
