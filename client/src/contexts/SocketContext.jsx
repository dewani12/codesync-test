import { useContext, createContext, useEffect, useRef, useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [clients, setClients] = useState([]);
    const [isSocketInitialized, setIsSocketInitialized] = useState(false);
    return (
        <SocketContext.Provider value={{ socketRef, clients, setClients, isSocketInitialized, setIsSocketInitialized }}>
            {children}
        </SocketContext.Provider>
    )
};

export const useSocket = () => {
    return useContext(SocketContext);
};