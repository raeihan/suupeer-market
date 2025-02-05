import { create } from "zustand";

export const useCounter = create((set) => ({
    count: 0,
    btnMinus: () => set((state) => ({count: state.count - 1})),
    btnPlus: () => set((state) => ({count: state.count + 1})),
}))