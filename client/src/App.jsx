import useSocket from "./socket/useSocket"
import Game from "./chess/Game";
import Rooms from "./rooms/rooms";

function App() {
  useSocket();
  
  return (
    <div className="min-h-full">
      <Rooms />
      <div className="text-3xl font-bold underline">This is  Chess</div>
      <Game />
    </div>
  )
}

export default App
