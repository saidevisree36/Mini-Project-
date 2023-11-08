import UserDetails from './components/UserDetails'
import './App.css'

const arrayList = [
  {
    id: 0,
    name: 'UserDetail',
  },
  {
    id: 1,
    name: 'SelectPlan',
  },
  {
    id: 2,
    name: 'AddOneOption',
  },
]

const App = () => <UserDetails arrayListItems={arrayList} />

export default App
