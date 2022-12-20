import { Col } from '../containers/Col'
import { Text } from '../text/Text'
import { TextInput } from './TextInput'

export const FormField = (props: {
  title: string
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
}) => (
  <Col style={{ padding: 4, margin: 4 }}>
    <Text style={{ fontSize: 14, fontWeight: 600 }}>{props.title}</Text>
    <TextInput
      value={props.value}
      onChange={props.onChange}
      autoFocus={props.autoFocus}
    />
  </Col>
)
