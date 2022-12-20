import { ReactNode } from 'react'
import { colors } from '../../theme'
import { Col } from '../containers/Col'
import { Row } from '../containers/Row'
import { Text } from '../text/Text'

export const WithHeader = (props: { children: ReactNode; title: string }) => {
  return (
    <Col style={{ flex: 1 }}>
      <Row
        style={{
          justifyContent: 'center',
          padding: 16,
          backgroundColor: colors.primary[500],
        }}
      >
        <Text style={{ fontSize: 24, color: colors.lightText }}>
          {props.title}
        </Text>
      </Row>
      {props.children}
    </Col>
  )
}
