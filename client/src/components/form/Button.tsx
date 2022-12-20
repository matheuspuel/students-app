import { colors } from '../../theme'

export const Button = (props: JSX.IntrinsicElements['button']) => (
  <button
    {...props}
    style={{
      backgroundColor: colors.primary[500],
      borderWidth: 3,
      borderRadius: 6,
      borderColor: colors.primary[400],
      padding: 8,
      color: colors.lightText,
      fontWeight: 'bold',
      ...props.style,
    }}
  />
)
