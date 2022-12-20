import { useNavigate } from 'react-router-dom'
import { Center } from '../components/containers/Center'
import { WithHeader } from '../components/containers/WithHeader'
import { Button } from '../components/form/Button'

export const MenuView = () => {
  const navigate = useNavigate()

  return (
    <WithHeader title="Cadastro de alunos">
      <Center>
        <Button
          style={{ margin: 8, width: 200 }}
          onClick={() => navigate('/students')}
        >
          Alunos
        </Button>
        <Button
          style={{ margin: 8, width: 200 }}
          onClick={() => navigate('/about')}
        >
          Sobre
        </Button>
      </Center>
    </WithHeader>
  )
}
