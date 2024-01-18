import { io } from 'socket.io-client';

const serverSite = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
const socket = io(serverSite);

export default socket;