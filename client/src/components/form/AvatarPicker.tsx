import { useRef } from 'react'
import { colors } from '../../theme'
import { Col } from '../containers/Col'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { Avatar } from '../image/Avatar'

/**
 * Let choose a profile image
 */
export const AvatarPicker = (props: {
  alt: string
  src: string
  size: string | number
  onChange: (file: File | null) => void
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null)

  return (
    <Col style={{ alignItems: 'center' }}>
      <Col style={{ position: 'relative' }}>
        <Avatar
          alt={props.alt}
          size={props.size}
          style={{ alignSelf: 'center' }}
          src={props.src}
          onClick={() => imageInputRef.current?.click()}
        />

        <Col
          style={{
            backgroundColor: colors.error[500],
            borderRadius: '100%',
            padding: 12,
            width: 28,
            height: 28,
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          onClick={() => props.onChange(null)}
        >
          <DeleteIcon fill={colors.white} width={28} height={28} />
        </Col>

        <Col
          style={{
            backgroundColor: colors.primary[500],
            borderRadius: '100%',
            padding: 12,
            width: 28,
            height: 28,
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
          onClick={() => imageInputRef.current?.click()}
        >
          <EditIcon fill={colors.white} width={28} height={28} />
        </Col>

        <input
          ref={imageInputRef}
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={e =>
            e.target.files?.[0] && props.onChange(e.target.files[0])
          }
          style={{ display: 'none' }}
        />
      </Col>
    </Col>
  )
}
