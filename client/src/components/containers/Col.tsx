import { ComponentProps } from 'react'
import { Row } from './Row'

/**
 * Renders elements vertically
 */
export const Col = (props: ComponentProps<typeof Row>) => (
  <Row
    {...props}
    style={{
      flexDirection: 'column',
      ...props.style,
    }}
  />
)
