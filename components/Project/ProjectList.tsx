import { useState } from 'react'

import {
  useToast,
  SimpleGrid,
  Box,
  Flex,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/core'

import { HiOutlinePencil } from 'react-icons/hi'

import useProjectModal from '../../hooks/useProjectModal'

import {
  useListProjectsQuery,
  useFindProjectLazyQuery,
} from '../../graphql/.generated'

const ProjectList: React.FC = () => {
  const [loadingProjectId, setLoadingProjectId] = useState(null)

  const toast = useToast()

  const { onOpen: openModal } = useProjectModal()

  const { data: listProjectsData } = useListProjectsQuery()

  const [findProject] = useFindProjectLazyQuery({
    fetchPolicy: 'network-only',

    onCompleted({ project_by_pk }) {
      setLoadingProjectId(null)

      openModal(project_by_pk)
    },

    onError(error) {
      setLoadingProjectId(null)

      toast({
        title: 'Whoops!',
        description: error.message,
        status: 'error',
        duration: 2500,
        isClosable: true,
      })
    },
  })

  const onEdit = async (id: number) => {
    setLoadingProjectId(id)

    findProject({ variables: { id } })
  }

  return (
    <SimpleGrid columns={1} spacing={4}>
      {listProjectsData?.project.map((project) => (
        <Box
          key={project.id}
          padding={4}
          border={'1px solid'}
          borderColor={'gray.100'}
          borderRadius={'md'}
        >
          <Flex alignItems={'center'}>
            <Box flexGrow={1}>
              <Heading size={'md'}>{project.title}</Heading>
              <Text>{project.description}</Text>
            </Box>

            <IconButton
              aria-label={'Edit Project'}
              icon={<HiOutlinePencil />}
              variant={'ghost'}
              isLoading={loadingProjectId === project.id}
              onClick={() => onEdit(project.id)}
            />
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ProjectList
