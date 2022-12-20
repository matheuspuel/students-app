import * as D from 'io-ts/Decoder'

export type Student = {
  id: number
  name: string
  address: string
  phone: string
  imageId: string | null
}

export type StudentInput = Omit<Student, 'id'>

export const StudentDecoder: D.Decoder<unknown, Student> = D.struct({
  id: D.number,
  name: D.string,
  address: D.string,
  phone: D.string,
  imageId: D.nullable(D.string),
})

export const StudentInputDecoder: D.Decoder<unknown, StudentInput> = D.struct({
  name: D.string,
  address: D.string,
  phone: D.string,
  imageId: D.nullable(D.string),
})
