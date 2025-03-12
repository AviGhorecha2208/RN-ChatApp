import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../Interfaces/Network';

export interface SocketMessageEvent {
  id: string;
  text: string;
  username: string;
  roomId: string;
  timestamp: string;
}

const MAX_RECONNECT_ATTEMPTS = 5;

export const useSocket = (roomId: number, username: string) => {
  const wsUrl = `ws://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [gotError, setGotError] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const cleanupSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
    setMessages([]);
    reconnectAttemptsRef.current = 0;
  }, []);

  const connect = useCallback(() => {
    cleanupSocket();

    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log('Max reconnection attempts reached');
      return;
    }

    console.log(`Connecting to ${wsUrl}`);
    socketRef.current = new WebSocket(wsUrl);
    const socket = socketRef.current;

    socket.onopen = () => {
      console.log(`Connected to room ${roomId}`);
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
    };

    socket.onclose = (event) => {
      console.log(`Closed for room ${roomId}. Code: ${event.code}, Reason: ${event.reason}`);
      setIsConnected(false);
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttemptsRef.current++;
        const delay = reconnectAttemptsRef.current * 1000;
        console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`);
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      }
    };

    socket.onerror = (error) => {
      console.error(`Error for room ${roomId}:`, JSON.stringify(error));
      setIsConnected(false);
      setGotError(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'ping') return;
        if (data.event === 'message') {
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === data.message.id)) return prev;
            return [...prev, data.message];
          });
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  }, [wsUrl, roomId, cleanupSocket]);

  const sendMessage = useCallback(
    (text: string) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket not connected');
        return false;
      }
      try {
        const message = { event: 'message', content: text, username, room_id: roomId };
        socketRef.current.send(JSON.stringify(message));
        console.log('Sent:', message);
        return message;
      } catch (error) {
        console.error('Send error:', error);
        return false;
      }
    },
    [roomId, username],
  );

  useEffect(() => {
    connect();
    return cleanupSocket;
  }, [roomId, connect, cleanupSocket]);

  return {
    isConnected,
    gotError,
    messages,
    sendMessage,
    disconnect: cleanupSocket,
    connect,
  };
};
