import * as D from 'io-ts/Decoder'

export const ignoreDecoder: D.Decoder<unknown, void> = {
  decode: () => D.success(undefined),
}
