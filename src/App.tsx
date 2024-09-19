import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import SnakeQuizGame from './components/snake-quiz-game'
import { GamifiedQuizComponent } from './components/gamified-quiz'
import { TreasureHuntQuizComponent } from './components/treasure-hunt-quiz'
import { TimeAttackQuizComponent } from './components/time-attack-quiz'
import { KbcQuiz } from './components/kbc-quiz'
import { WordSearch } from './components/word-search'

function AppBar() {
  return (
    <nav className="bg-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Quiz Games</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-purple-200">Snake Quiz</Link>
          <Link to="/game" className="text-white hover:text-purple-200">Gamified Quiz</Link>
          <Link to="/treasure-hunt" className="text-white hover:text-purple-200">Treasure Hunt</Link>
          <Link to="/time-attack" className="text-white hover:text-purple-200">Time Attack</Link>
          <Link to="/kbc" className="text-white hover:text-purple-200">KBC</Link>
          <Link to="/word-search" className="text-white hover:text-purple-200">Word Search</Link>
        </div>
      </div>
    </nav>
  )
}
function App() {

  return (
    <BrowserRouter>
      <AppBar />
    <Routes>
        <Route Component={SnakeQuizGame} path='/' />
        <Route Component={KbcQuiz} path='/kbc' />
        <Route Component={GamifiedQuizComponent} path='/game' />
        <Route Component={TreasureHuntQuizComponent} path='/treasure-hunt' />
        <Route Component={TimeAttackQuizComponent} path='/time-attack' />
        <Route Component={WordSearch} path='/word-search' />
    </Routes>
    </BrowserRouter>
  )
}

export default App
