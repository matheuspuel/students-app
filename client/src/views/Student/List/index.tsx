import { useNavigate } from 'react-router-dom'
import { Col } from '../../../components/containers/Col'
import { Row } from '../../../components/containers/Row'
import { WithHeader } from '../../../components/containers/WithHeader'
import { Button } from '../../../components/form/Button'
import { ErrorFeedback } from '../../../components/placeholders/ErrorFeedback'
import { Loading } from '../../../components/placeholders/Loading'
import { Text } from '../../../components/text/Text'
import { useStudentGetAllQuery } from '../../../hooks/queries/Student'
import { colors } from '../../../theme'
import { ListItem } from './components/ListItem'

export const StudentListView = () => {
  const navigate = useNavigate()
  const studentsQuery = useStudentGetAllQuery()

  return (
    <WithHeader title="Alunos">
      {!studentsQuery.loaded ? (
        <Loading />
      ) : !studentsQuery.success ? (
        <ErrorFeedback />
      ) : (
        <Col
          style={{
            alignSelf: 'center',
            alignItems: 'stretch',
            width: '100%',
            maxWidth: 800,
          }}
        >
          {studentsQuery.value.length === 0 ? (
            <Text
              style={{
                marginBlock: 80,
                textAlign: 'center',
                color: colors.grayText,
              }}
            >
              Nenhum aluno cadastrado
            </Text>
          ) : (
            studentsQuery.value.map(props => (
              <ListItem key={props.id} {...props} />
            ))
          )}
          <Row style={{ justifyContent: 'center' }}>
            <Button
              style={{ margin: 8, width: 100 }}
              onClick={() => navigate('/')}
            >
              Voltar
            </Button>
            <Button
              style={{ margin: 8, width: 100 }}
              onClick={() => navigate('/students/new')}
            >
              Novo
            </Button>
          </Row>
        </Col>
      )}
    </WithHeader>
  )
}
