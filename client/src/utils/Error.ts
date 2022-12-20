import * as D from 'io-ts/Decoder'

export class ApiRejectionError extends Error {
  public type = 'ApiRejectionError' as const
  constructor(public error: unknown) {
    super()
  }
}

export class ApiFailureStatusError extends Error {
  public type = 'ApiFailureStatusError' as const
  constructor(public status: number, public body: string) {
    super()
  }
}

export class ApiResponseValidationError extends Error {
  public type = 'ApiResponseValidationError' as const
  constructor(public error: D.DecodeError) {
    super()
  }
}
