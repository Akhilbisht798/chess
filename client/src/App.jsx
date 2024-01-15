import ChessGame from "./chess/chess"
import useSocket from "./socket/useSocket"

function App() {
  useSocket();
  
  return (
    <div className="min-h-full">
      <div className="text-3xl font-bold underline">This is  Chess</div>
      <ChessGame />
    </div>
  )
}

export default App
