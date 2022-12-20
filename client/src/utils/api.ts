import * as D from 'io-ts/Decoder'
import {
  ApiFailureStatusError,
  ApiRejectionError,
  ApiResponseValidationError,
} from '../utils/Error'
import { failure, Result, success } from '../utils/Result'

/**
 * Wrapper around fetch to make it easy to define an endpoint.
 */
export const endpoint = <A>(args: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  body?: unknown
  decoder: D.Decoder<unknown, A>
}): Promise<
  Result<
    ApiRejectionError | ApiFailureStatusError | ApiResponseValidationError,
    A
  >
> =>
  fetch(args.url, {
    method: args.method,
    body:
      args.body === undefined
        ? undefined
        : args.body instanceof File
        ? args.body
        : JSON.stringify(args.body),
    headers:
      args.body === undefined || args.body instanceof File
        ? undefined
        : { 'Content-Type': 'application/json' },
  }).then(
    r =>
      r.ok
        ? r.json().then(
            (v: unknown) => {
              const decoded = args.decoder.decode(v)
              if (decoded._tag === 'Right') {
                return success(decoded.right)
              } else {
                return failure(new ApiResponseValidationError(decoded.left))
              }
            },
            (e: unknown) => {
              const decoded = args.decoder.decode(undefined)
              if (decoded._tag === 'Right') {
                return success(decoded.right)
              } else {
                return failure(new ApiRejectionError(e))
              }
            },
          )
        : r
            .text()
            .catch(() => '')
            .then(t => failure(new ApiFailureStatusError(r.status, t))),
    (e: unknown) => failure(new ApiRejectionError(e)),
  )
