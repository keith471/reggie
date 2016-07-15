import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import routes from './components/routes'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
)
