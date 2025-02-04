import { io } from "socket.io-client";

const initSocket = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    transports: ["websocket", "polling"],
    timeout: 10000,
  };
  return io("http://localhost:3000", options);
};

export default initSocket;
