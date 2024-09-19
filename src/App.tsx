import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import SnakeQuizGame from './components/snake-quiz-game'
import { TreasureHuntQuizComponent } from './components/treasure-hunt-quiz'
import { TimeAttackQuizComponent } from './components/time-attack-quiz'
import { KbcQuiz } from './components/kbc-quiz'
import QuizGame  from './components/quiz-game'
import { DetectiveQuizComponent } from './components/detective-quiz'

function AppBar() {
  return (
    <nav className="bg-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Quiz Games</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-purple-200">Snake Quiz</Link>
          <Link to="/wordhunt" className="text-white hover:text-purple-200">Word Hunt</Link>
          <Link to="/treasure-hunt" className="text-white hover:text-purple-200">Treasure Hunt</Link>
          <Link to="/time-attack" className="text-white hover:text-purple-200">Time Attack</Link>
          <Link to="/kbc" className="text-white hover:text-purple-200">KBC</Link>
          <Link to="/detective" className="text-white hover:text-purple-200">Detective</Link>
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
        <Route Component={DetectiveQuizComponent} path='/detective' />
        <Route Component={QuizGame} path='/wordhunt' />
        <Route Component={KbcQuiz} path='/kbc' />
        <Route Component={TreasureHuntQuizComponent} path='/treasure-hunt' />
        <Route Component={TimeAttackQuizComponent} path='/time-attack' />
    </Routes>
    </BrowserRouter>
  )
}

export default App
