import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import * as D from 'io-ts/Decoder'
import { nonEmptyString, optional } from './utils/Decoder'

/**
 * Verifies if some required environment variable is missing
 */
const decoder = D.intersect(
  D.struct({
    MYSQLHOST: nonEmptyString,
    MYSQLPORT: optional(D.string),
    MYSQLUSER: optional(D.string),
    MYSQLPASSWORD: optional(D.string),
    MYSQLDATABASE: nonEmptyString,
  }),
)(
  D.union(
    D.struct({
      MEDIA_DIRECTORY: nonEmptyString,
    }),
    D.struct({
      AWSS3_BUCKET: nonEmptyString,
      AWSS3_REGION: nonEmptyString,
      AWSS3_ACCESS_KEY_ID: nonEmptyString,
      AWSS3_SECRET_ACCESS_KEY: nonEmptyString,
    }),
  ),
)

const validation = decoder.decode(process.env)
if (validation._tag === 'Left') {
  throw new Error('Invalid environment variables:\n' + D.draw(validation.left))
}
export const envVars = validation.right
