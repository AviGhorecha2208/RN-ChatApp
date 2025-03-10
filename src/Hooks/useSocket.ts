/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../Interfaces/Network';

export interface SocketMessageEvent {
  id: string;
  text: string;
  username: string;
  roomId: string;
  timestamp: string;
}

export const useSocket = (roomId: number, username: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isIntentionalDisconnectRef = useRef(false);
  const maxReconnectAttempts = 5;
  const wsUrl = `wss://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
  const socketRef = useRef<WebSocket>(new WebSocket(wsUrl)).current;

  useEffect(() => {
    console.log('Initiating WebSocket connection');
    try {
      connect();
    } catch (error) {
      console.log('Error initiating WebSocket connection:', error);
    }
    return () => {
      disconnect();
    };
  }, []);

  const connect = useCallback(() => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.log('Maximum reconnection attempts reached');
      return;
    }
    try {
      console.log('WebSocket connection established');
      socketRef.onopen = () => {
        return new Promise((resolve, reject) => {
          try {
            console.log('Socket connected successfully');
            setIsConnected(true);
            reconnectAttemptsRef.current = 0;
            isIntentionalDisconnectRef.current = false;
            resolve(true);
          } catch (error) {
            console.log('Error connecting to WebSocket:', error);
            reject(error);
          }
        });
      };
      socketRef.onclose = () => {
        return new Promise((resolve, reject) => {
          console.log('Socket disconnected:');
          try {
            if (
              !isIntentionalDisconnectRef.current &&
              reconnectAttemptsRef.current < maxReconnectAttempts
            ) {
              reconnectAttemptsRef.current++;
              const delay = 10000;
              console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`);
              reconnectTimeoutRef.current = setTimeout(connect, delay);
            } else if (isIntentionalDisconnectRef.current) {
              console.log('Intentional disconnect detected, skipping reconnect');
            } else {
              console.log('Max reconnect attempts reached, stopping');
            }
            resolve(true);
          } catch (error) {
            console.log('Error setting isConnected to false:', error);
            reject(error);
          }
        });
      };

      socketRef.onerror = () => {
        console.error('WebSocket Error:');
        setIsConnected(false);
      };

      socketRef.onmessage = (event) => {
        return new Promise((resolve, reject) => {
          try {
            const data = event.data;
            console.log('Received message:', data);

            if (data.event === 'ping') {
              console.log('Received ping from server');
              return;
            }

            if (data.event === 'message') {
              setMessages((prev) => {
                if (prev.some((msg) => msg.id === data.message.id)) {
                  return prev;
                }
                return [...prev, data.message];
              });
            }

            resolve(data);
          } catch (error) {
            console.error('Error parsing message:', error);
            reject(error);
          }
        });
      };

      // socketRef.addEventListener('message', (event) => {
      //   console.log('Received message:', event.data);
      // });
    } catch (error) {
      console.log('Failed to establish WebSocket connection:', error);
      setIsConnected(false);
    }
  }, [roomId, username]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting WebSocket');
    isIntentionalDisconnectRef.current = true;
    return new Promise((resolve, reject) => {
      try {
        if (socketRef) {
          socketRef.close();
        }
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
        setIsConnected(false);
        setMessages([]);
        reconnectAttemptsRef.current = 0;
        resolve(true);
      } catch (error) {
        console.log('Error closing WebSocket:', error);
        reject(error);
      }
    });
  }, [roomId, username]);

  const sendMessage = (text: string) => {
    console.log('sendMessage', text);
    console.log('socketRef', socketRef);
    console.log('isConnected', isConnected);
    console.log('roomId', roomId);
    console.log('username', username);
    console.log('wsUrl', wsUrl);
    console.log('socketRef.readyState', socketRef.readyState);
    console.log('socketRef.send', socketRef.send);
    if (socketRef?.readyState === WebSocket.OPEN) {
      const message = {
        event: 'message',
        content: text,
        username,
        room_id: roomId,
      };
      socketRef?.send(JSON.stringify(message));
      console.log('Sent message:', message);
    } else {
      console.warn('Cannot send message: WebSocket is not connected');
    }
  };

  const reconnect = useCallback(() => {
    console.log('reconnecting');
    disconnect().then(() => {
      connect();
    });
  }, [roomId, username]);

  return {
    isConnected,
    messages,
    sendMessage,
    disconnect,
    reconnect,
  };
};
