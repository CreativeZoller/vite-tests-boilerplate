import { create } from 'zustand'

interface UserStore {
  userName: string
  num: number
  changeName: () => void
  changeNum: () => void
}

console.log("%cTurboconsole Message", "color: orange");

export const useUserStore = create<UserStore>((set) => ({
  userName: 'denver',
  num: 0,
  changeName: () => set({ userName: 'dinosaur' }),
  changeNum: () => set((state) => ({ num: state.num + 1 })),
}))
