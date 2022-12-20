import { useNavigate } from 'react-router-dom'
import { mediaUrl } from '../../../../api/Media'
import { Card } from '../../../../components/containers/Card'
import { Col } from '../../../../components/containers/Col'
import { Row } from '../../../../components/containers/Row'
import { PhoneIcon } from '../../../../components/icons/PhoneIcon'
import { PlaceIcon } from '../../../../components/icons/PlaceIcon'
import { Avatar } from '../../../../components/image/Avatar'
import { Text } from '../../../../components/text/Text'
import { Student } from '../../../../models/Student'
import { colors } from '../../../../theme'

export const ListItem = (props: Student) => {
  const navigate = useNavigate()

  return (
    <Card
      style={{ margin: 8 }}
      onClick={() => navigate(`/students/${props.id}`)}
    >
      <Row style={{ padding: 4, alignItems: 'center' }}>
        <Avatar
          alt="imagem"
          size={80}
          style={{ padding: 4 }}
          src={
            props.imageId
              ? `${mediaUrl}/${props.imageId}`
              : '../user-placeholder.png'
          }
        />
        <Col style={{ flex: 1 }}>
          <Text style={{ fontWeight: 700, padding: 4 }}>
            {props.name || '-'}
          </Text>
          <Row style={{ alignItems: 'center', padding: 4 }}>
            <PhoneIcon height={24} width={24} fill={colors.gray[400]} />
            <Text style={{ flex: 1, paddingLeft: 8 }}>
              {props.phone || '-'}
            </Text>
          </Row>
          <Row style={{ alignItems: 'center', padding: 4 }}>
            <PlaceIcon height={24} width={24} fill={colors.gray[400]} />
            <Text style={{ flex: 1, paddingLeft: 8 }}>
              {props.address || '-'}
            </Text>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
