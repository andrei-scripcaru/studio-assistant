import { useRecoilState } from 'recoil'

import { projectModalState } from '../lib/recoil'

const useProjectModal = (): {
  currentState: { id?: number; isOpen: boolean }
  onOpen(projectId?: number): void
  onClose(): void
} => {
  const [currentState, setCurrentState] = useRecoilState(projectModalState)

  return {
    currentState,
    onOpen: (projectId) => setCurrentState({ id: projectId, isOpen: true }),
    onClose: () => setCurrentState({ id: null, isOpen: false }),
  }
}

export default useProjectModal
