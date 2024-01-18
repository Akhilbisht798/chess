import useSocket from "./socket/useSocket"
import Game from "./chess/Game";
import Rooms from "./rooms/rooms";
import { useRoom } from "./state/fenState";

function App() {
  const { room } = useRoom();
  useSocket();
  
  return (
    <div className="min-h-full">
      <div className="text-3xl font-bold underline text-center">This is  Chess</div>
      {
        room !== ''?
          <Game/> :
          <Rooms />
      }
    </div>
  )
}

export default App
