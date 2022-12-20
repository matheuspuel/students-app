import { useNavigate } from 'react-router-dom'
import { Center } from '../containers/Center'
import { Col } from '../containers/Col'
import { Button } from '../form/Button'
import { Text } from '../text/Text'

export const ErrorFeedback = () => {
  const navigate = useNavigate()

  return (
    <Center>
      <Col>
        <Text style={{ padding: 8, textAlign: 'center' }}>
          Não foi possível buscar os dados.
        </Text>
        <Text style={{ padding: 8, textAlign: 'center' }}>
          Verifique sua conexão com a internet e tente novamente.
        </Text>
        <Button onClick={() => navigate('./..')}>Voltar</Button>
      </Col>
    </Center>
  )
}
