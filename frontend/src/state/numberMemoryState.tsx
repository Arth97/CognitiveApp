
import create from 'zustand'
/* 
interface PointsStore {
  points: number | null;
  setPoints: (info: number) => void;
  incrementPoints: (info: number) => void;
  resetPoints: () => void;
}

const usePointsStore = create<PointsStore>((set) => ({
  points: 0,
  setPoints: () => set((state) => ({ points: state.points })),
  incrementPoints: () => set((state) => ({ points: state.points+1 })),
  resetPoints: () => set({ points: 0 }),
}));
 */
/* reprogramarlo todo porque eres macaco y esta mal, toma de ejemplo userInfo */

interface NumberStore {
  userNumber: string | null;
  setUserNumber: (input: string) => void;
  clearUserNumber: () => void;

  randomNumber: number | null;
  setRandomNumber: (input: number) => void;
  clearRandomNumber: () => void;

  level: number | null;
  incrementLevel: (info: number) => void;
  resetLevel: () => void;
}

const useNumberStore = create<NumberStore>((set) => ({
  userNumber: '',
  setUserNumber: (input) => set({ userNumber: input }),
  clearUserNumber: () => set((state) => ({ state, userNumber: '' })),

  randomNumber: 0,
  setRandomNumber: (input) => set(({ randomNumber: input })),
  clearRandomNumber: () => set((state) => ({ state, randomNumber: 0 })),

  level: 1,
  incrementLevel: () => set((state) => ({ level: state.level+1 })),
  resetLevel: () => set({ level: 1 })
}));


interface PageStatusStore {
  isGameStarted: boolean | null;
  setIsGameStarted: (state) => void;
  
  showResults: boolean | null;
  setShowResults: (state) => void;

  timeOutEnded: boolean | null;
  setTimeOutEnded: (state) => void;

  showAnswer: boolean | null;
  setShowAnswer: (state) => void;
}

const usePageStatusStore = create<PageStatusStore>((set) => ({
  isGameStarted: false,
  setIsGameStarted: (state) => set({ isGameStarted: state }),
  
  showResults: false,
  setShowResults: (state) => set(({ showResults: state})),

  timeOutEnded: false,
  setTimeOutEnded: (state) => set({ timeOutEnded: state}),

  showAnswer: false,
  setShowAnswer: (state) => set({ showAnswer: state}),
}));


export {
  useNumberStore,
  usePageStatusStore
}