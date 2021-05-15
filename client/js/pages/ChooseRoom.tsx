import React, { FC, useState } from 'react'

import { Button, TextInput } from '../components'
import { useHistory } from 'react-router-dom'

export const ChooseRoom: FC = () => {
  const [roomCode, setRoomCode] = useState('')
  const history = useHistory()

  return (
    <div id='chooseContainer'>
      <h1>Enter a room code:</h1>
      <div>
        <TextInput onChange={setRoomCode} value={roomCode} />
        <Button onClick={() => history.push('/room/' + roomCode)}>Join</Button>
      </div>
    </div>
  )
}
