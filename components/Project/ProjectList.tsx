import {
  SimpleGrid,
  Box,
  Flex,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/core'

import { HiOutlinePencil } from 'react-icons/hi'

import useProjectModal from '../../hooks/useProjectModal'

import { useListProjectsQuery } from '../../graphql/.generated'

const ProjectList: React.FC = () => {
  const { onOpen: openModal } = useProjectModal()

  const { loading, error, data } = useListProjectsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! ${error.message}</div>

  return (
    <SimpleGrid columns={1} spacing={4}>
      {data.project.map((project) => (
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
              onClick={() => openModal(project.id)}
            />
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ProjectList
