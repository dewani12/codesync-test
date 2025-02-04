import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import initSocket from "../utils/socket";
import Terminal from "../components/Terminal";
import FileStructureView from "../components/FileStructureView";
import { useSocket } from "../contexts/SocketContext";

function EditorPage() {
  const editorRef = useRef(null);
  const { roomId } = useParams();
  const { socketRef, isSocketInitialized, setIsSocketInitialized, clients, setClients } = useSocket();

  useEffect(() => {
    const init = async () => {
      socketRef.current = initSocket();
      socketRef.current.emit("join", roomId);

      socketRef.current.on("join", (clients) => {
        setClients(clients);
      });

      socketRef.current.on("userDisconnected", (socketId) => {
        console.log(`Socket ${socketId} disconnected`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
      setIsSocketInitialized(true);
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);
 

  if (!isSocketInitialized) {
    return <div>Loading......</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/3 bg-[#212429] h-screen">
          <FileStructureView />
        </div>
        <div className="w-2/3">
          <Editor editorRef={editorRef} roomId={roomId} />
        </div>
      </div>
      <div className="w-1/3 bg-[#212429] py-4">
        <Terminal editorRef={editorRef} socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
}

export default EditorPage;
