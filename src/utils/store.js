import {create } from 'zustand';

const useStore = create((set) => ({
    setShowSplash: (show) => set({ showSplash: show }),
    showSplash: true,
}));

export default useStore;