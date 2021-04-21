import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Multiplayer } from './pages'

export const App: FC = () => {
  return (
    <Switch>
      <Route path='/room/:roomCode'>
        <Multiplayer />
      </Route>
      {/* <Route path='/'>
        <Multiplayer />
      </Route> */}
    </Switch>
  )
}
