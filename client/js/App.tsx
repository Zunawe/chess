import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Multiplayer, ChooseRoom } from './pages'

export const App: FC = () => {
  return (
    <Switch>
      <Route path='/room/:roomCode'>
        <Multiplayer />
      </Route>
      <Route path='/'>
        <ChooseRoom />
      </Route>
    </Switch>
  )
}
