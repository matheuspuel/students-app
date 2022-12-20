import { ComponentProps } from 'react'
import { Col } from './Col'

/**
 * Renders elements in the center of available space
 */
export const Center = (props: ComponentProps<typeof Col>) => (
  <Col
    {...props}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...props.style,
    }}
  />
)
