import { atom } from 'recoil'

export const projectModalState = atom({
  key: 'projectModalState',
  default: { id: null, isOpen: false },
})
