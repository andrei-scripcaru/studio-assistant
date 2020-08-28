import { SimpleGrid, Box } from '@chakra-ui/core'

import { useListProjectsQuery } from '../../graphql/.generated'

const ProjectList: React.FC = () => {
  const { loading, error, data } = useListProjectsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! ${error.message}</div>

  return (
    <SimpleGrid columns={1} spacing={10}>
      {data.project.map((project) => (
        <Box key={project.id}>{project.title}</Box>
      ))}
    </SimpleGrid>
  )
}

export default ProjectList
