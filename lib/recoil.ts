import { atom } from 'recoil'

export const projectModalState = atom({
  key: 'projectModalState',
  default: { project: null, isOpen: false },
})
