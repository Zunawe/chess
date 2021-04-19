/* eslint-disable import/first */
// Webpack hot module replacement
module.hot?.accept()

import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'

import { App } from './App'
import { ContextProvider } from './context'

ReactDOM.render(
  <>
    <Helmet>
      <title>Chess</title>
    </Helmet>
    <ContextProvider>
      <App />
    </ContextProvider>
  </>
  ,
  document.getElementById('root')
)
