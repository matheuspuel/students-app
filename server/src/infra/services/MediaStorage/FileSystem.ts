import fs from 'fs'
import { MediaStorage } from 'src/domain/services/MediaStorage'
import { failure, success } from 'src/utils/Result'

/**
 * Saves and retrieves files from local filesystem
 */
export const FileSystemMediaStorage = (deps: {
  directoryPath: string
}): MediaStorage => {
  fs.mkdirSync(deps.directoryPath, { recursive: true })

  return {
    read: async id => {
      try {
        const filePath = `${deps.directoryPath}/${id}`
        if (fs.existsSync(filePath)) {
          return success(fs.createReadStream(filePath))
        } else {
          return success(null)
        }
      } catch (e) {
        return failure(e)
      }
    },

    write: ({ id, stream }) =>
      new Promise(res => {
        try {
          const file = fs.createWriteStream(`${deps.directoryPath}/${id}`)
          stream.on('end', () => res(success(undefined)))
          stream.on('error', e => res(failure(e)))
          stream.pipe(file)
        } catch (e) {
          res(failure(e))
        }
      }),
  }
}
