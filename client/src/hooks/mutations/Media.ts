import * as MediaApi from '../../api/Media'
import { makeMutationHook } from './utils'

export const useMediaUploadMutation = makeMutationHook(MediaApi.upload)
