import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import useOnlineGameContext from '../context/useOnlineGameContext';

const { VITE_SERVER_URL } = import.meta.env;

function useSocket() {
  const { socket, setSocket } = useOnlineGameContext();
  const render = useRef(0);
  useEffect(() => {
    if (render.current === 0) setSocket(io(VITE_SERVER_URL));
    return () => {
      render.current += 1;
    };
  }, [setSocket]);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connected');
    });

    socket?.on('disconnect', () => {
      console.log('disconnect');
    });

    socket?.on('game-error', ({ msg }) => {
      toast.error(msg);
    });

    return () => {
      socket?.disconnect();
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('game-error');
    };
  }, [socket]);
}

export default useSocket;