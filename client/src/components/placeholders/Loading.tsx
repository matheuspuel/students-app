import { ClipLoader } from 'react-spinners'
import { Center } from '../containers/Center'

export const Loading = () => {
  return (
    <Center>
      <ClipLoader loading={true} />
    </Center>
  )
}
