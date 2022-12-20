import { ComponentProps } from 'react'
import { colors } from '../../theme'
import { Col } from './Col'
import { Row } from './Row'

export const Card = (props: ComponentProps<typeof Row>) => {
  return (
    <Col
      {...props}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        boxShadow: '2px 2px 4px 1px rgba(20,20,20,0.3)',
        ...props.style,
      }}
    />
  )
}
