import * as D from 'io-ts/Decoder'
import { serverUrl } from '../constants'
import { endpoint } from '../utils/api'

export const mediaUrl = `${serverUrl}/api/media/images`

export const upload = (file: File) =>
  endpoint({
    method: 'POST',
    url: `${mediaUrl}`,
    body: file,
    decoder: D.struct({ id: D.string }),
  })
