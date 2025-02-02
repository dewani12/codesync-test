import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
  };
  const joinRoom = () => {
    if (!roomId) {
      alert("Please enter a room ID");
      return;
    }
    navigate(`/editor/${roomId}`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">CodeSync</h1>
      <button
        onClick={createNewRoom}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 cursor-pointer"
      >
        Create New Room
      </button>
      <p className="mb-2">Join Existing Room</p>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="px-4 py-2 border rounded mb-4 ext-white focus:outline-none"
      />
      <button
        onClick={joinRoom}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Join Room
      </button>
    </div>
  );
}

export default Home;
