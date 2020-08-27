import { useListProjectsQuery } from '../../graphql/.generated'

const ProjectList: React.FC = () => {
  const { loading, error, data } = useListProjectsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! ${error.message}</div>

  return (
    <>{data.project.map((project) => `This is a project: ${project.title}`)}</>
  )
}

export default ProjectList
