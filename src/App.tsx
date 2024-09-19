import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SnakeQuizGame from './components/snake-quiz-game'
import { GamifiedQuizComponent } from './components/gamified-quiz'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route Component={SnakeQuizGame} path='/'/>
      <Route Component={GamifiedQuizComponent} path='/game'/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
