import { useNavigate } from 'react-router-dom'
import { Center } from '../components/containers/Center'
import { Row } from '../components/containers/Row'
import { WithHeader } from '../components/containers/WithHeader'
import { Button } from '../components/form/Button'
import { GithubIcon } from '../components/icons/GithubIcon'
import { LinkedinIcon } from '../components/icons/LinkedinIcon'
import { Text } from '../components/text/Text'

export const AboutView = () => {
  const navigate = useNavigate()

  return (
    <WithHeader title="Sobre">
      <Center>
        <Text style={{ fontWeight: 600 }}>Desenvolvido por Matheus Puel</Text>
        <Row>
          <a
            style={{ padding: 16 }}
            target="_blank"
            href="https://www.github.com/matheuspuel"
            rel="noreferrer"
          >
            <GithubIcon height={56} width={56} />
          </a>
          <a
            style={{ padding: 16 }}
            target="_blank"
            href="https://www.linkedin.com/in/matheus-michalski-puel-9b66aa138"
            rel="noreferrer"
          >
            <LinkedinIcon height={56} width={56} />
          </a>
        </Row>
        <Button style={{ width: 100 }} onClick={() => navigate('/')}>
          Voltar
        </Button>
      </Center>
    </WithHeader>
  )
}
