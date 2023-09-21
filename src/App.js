import {Switch, Route} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'

import LoginRoute from './components/LoginRoute'

import BooksShelvesRoute from './components/BooksShelvesRoute'

import BooksDetails from './components/BooksDetails'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/shelf" component={BooksShelvesRoute} />
    <ProtectedRoute exact path="/books/:id" component={BooksDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
