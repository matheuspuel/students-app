import { Result } from 'src/utils/Result'
import stream from 'stream'

/**
 * Inserts and retrieves media files from some storage
 */
export interface MediaStorage {
  read: (id: string) => Promise<Result<unknown, stream.Readable | null>>
  write: (args: {
    id: string
    stream: stream.Readable
    contentType?: string
    contentLength?: number
  }) => Promise<Result<unknown, void>>
}
