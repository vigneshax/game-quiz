import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const words = ["INNOVATION", "LEADERSHIP", "PLANETS", "HISTORY", "TEAMWORK"]
const gridSize = 15

export function WordSearch() {
  const [grid, setGrid] = useState<string[][]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([])

  useEffect(() => {
    generateGrid()
  }, [])

  const generateGrid = () => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill("''"))
    
    words.forEach(word => {
      let placed = false
      while (!placed) {
        const direction = Math.floor(Math.random() * 3)
        const row = Math.floor(Math.random() * gridSize)
        const col = Math.floor(Math.random() * gridSize)
        
        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction)
          placed = true
        }
      }
    })
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === "''") {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
        }
      }
    }
    
    setGrid(newGrid)
    setFoundWords([])
    setSelectedCells([])
  }

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const dx = [0, 1, 1][direction]
    const dy = [1, 0, 1][direction]
    
    if (row + word.length * dx > gridSize || col + word.length * dy > gridSize) return false
    
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i * dx][col + i * dy] !== "''" && grid[row + i * dx][col + i * dy] !== word[i]) {
        return false
      }
    }
    
    return true
  }

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const dx = [0, 1, 1][direction]
    const dy = [1, 0, 1][direction]
    
    for (let i = 0; i < word.length; i++) {
      grid[row + i * dx][col + i * dy] = word[i]
    }
  }

  const handleCellClick = (row: number, col: number) => {
    const newSelectedCells = [...selectedCells]
    const index = newSelectedCells.findIndex(([r, c]) => r === row && c === col)
    
    if (index === -1) {
      newSelectedCells.push([row, col])
    } else {
      newSelectedCells.splice(index, 1)
    }
    
    setSelectedCells(newSelectedCells)
    checkForWord(newSelectedCells)
  }

  const checkForWord = (cells: [number, number][]) => {
    const word = cells.map(([row, col]) => grid[row][col]).join("''")
    const reversedWord = word.split("''").reverse().join("''")
    
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word])
      setSelectedCells([])
    } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, reversedWord])
      setSelectedCells([])
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Quiz: Word Search</h1>
      <div className="grid grid-cols-15 gap-1 p-4 bg-gray-100 rounded-lg">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 flex items-center justify-center font-bold text-lg rounded
                ${selectedCells.some(([r, c]) => r === rowIndex && c === colIndex) ? "bg-blue-300" : "bg-white"}
              `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {words.map(word => (
          <div
            key={word}
            className={`px-3 py-1 rounded ${foundWords.includes(word) ? "bg-green-300" : "bg-gray-200"}`}
          >
            {word}
          </div>
        ))}
      </div>
      <Button onClick={generateGrid}>New Puzzle</Button>
    </div>
  )
}