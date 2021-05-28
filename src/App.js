import React from 'react'
import List from './component/PriceList.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route exact path='/' component={List} />
      </Router>
    )
  }
}

export default App
