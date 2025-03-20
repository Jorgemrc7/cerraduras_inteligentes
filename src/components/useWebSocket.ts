import { useState, useEffect } from "react";

export const useWebSocket = (isOpen: boolean, setHuella: (huella: string) => void) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (isOpen) {
      const socket = new WebSocket("ws://localhost:3000/api/ws");

      socket.onmessage = (event) => {
        setHuella(event.data);
      };

      setWs(socket);
      return () => socket.close();
    }
  }, [isOpen]);

  const sendCommand = (command: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(command);
    }
  };

  return { sendCommand };
};
