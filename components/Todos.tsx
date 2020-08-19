import { gql, useQuery } from '@apollo/client'

const GET_TODOS = gql`
  query GetTodos {
    todos {
      title
      user {
        name
      }
    }
  }
`

const Todos: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! ${error.message}</div>

  return <div>{data.todos.map((todo) => `This is a todo: ${todo.title}`)}</div>
}

export default Todos
