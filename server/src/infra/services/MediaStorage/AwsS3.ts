import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import * as D from 'io-ts/Decoder'
import { MediaStorage } from 'src/domain/services/MediaStorage'
import { failure, success } from 'src/utils/Result'
import stream from 'stream'

/**
 * Uploads and downloads files from AWS S3
 */
export const AwsS3MediaStorage = (deps: {
  bucket: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}): MediaStorage => {
  const s3 = new S3Client({
    region: deps.region,
    credentials: {
      accessKeyId: deps.accessKeyId,
      secretAccessKey: deps.secretAccessKey,
    },
  })
  const bucket = deps.bucket

  return {
    read: id =>
      s3
        .send(new GetObjectCommand({ Bucket: bucket, Key: id }))
        .then(r => r.Body as stream.Readable)
        .then(success)
        .catch(e =>
          D.struct({
            $metadata: D.struct({ httpStatusCode: D.literal(403, 404) }),
          }).decode(e)._tag === 'Right'
            ? success(null)
            : failure(e),
        ),

    write: ({ id, stream, contentLength, contentType }) =>
      s3
        .send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: id,
            Body: stream,
            ContentType: contentType,
            ContentLength: contentLength,
          }),
        )
        .then(() => undefined)
        .then(success)
        .catch(failure),
  }
}
