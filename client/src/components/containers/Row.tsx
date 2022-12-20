/**
 * Renders elements horizontally
 */
export const Row = (props: JSX.IntrinsicElements['div']) => (
  <div
    {...props}
    style={{
      display: 'flex',
      alignItems: 'stretch',
      ...props.style,
    }}
  />
)
