import { Chess } from 'chess.js';
import { create } from 'zustand';

export const useFen = create((set) => ({
    fen: new Chess().fen(),
    changeFen: (fen) => set(() => ({ fen: fen }))
}));

export const useRoom = create((set) => ({
    room: '',
    changeRoom: (room) => set(() => ({ room: room }))
}));

export const useColor = create((set) => ({
    color: '',
    changeColor: (color) => set(() => ({color: color}))
}))