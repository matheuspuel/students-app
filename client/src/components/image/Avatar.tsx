import { ComponentProps } from 'react'
import { Image } from './Image'

/**
 * Profile image
 */
export const Avatar = (
  props: ComponentProps<typeof Image> & { size: number | string },
) => (
  <Image
    {...props}
    style={{
      width: props.size,
      height: props.size,
      objectFit: 'cover',
      borderRadius: '100%',
      ...props.style,
    }}
  />
)
