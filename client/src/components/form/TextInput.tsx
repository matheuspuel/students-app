import { colors } from '../../theme'

export const TextInput = (props: {
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
}) => {
  return (
    <input
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      autoFocus={props.autoFocus}
      style={{
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.black,
        fontSize: 16,
        alignSelf: 'stretch',
      }}
    />
  )
}
