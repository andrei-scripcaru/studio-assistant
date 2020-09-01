import { useRecoilState } from 'recoil'

import { projectModalState } from '../lib/recoil'

import { Maybe, Project } from '../graphql/.generated'

const useProjectModal = (): {
  project?: Maybe<
    { __typename?: 'project' } & Pick<Project, 'id' | 'title' | 'description'>
  >
  isOpen: boolean
  onOpen(
    project?: Maybe<
      { __typename?: 'project' } & Pick<Project, 'id' | 'title' | 'description'>
    >
  ): void
  onClose(): void
} => {
  const [currentState, setCurrentState] = useRecoilState(projectModalState)

  return {
    ...currentState,

    onOpen: (project) => setCurrentState({ project, isOpen: true }),
    onClose: () => setCurrentState({ project: null, isOpen: false }),
  }
}

export default useProjectModal
