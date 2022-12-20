import * as D from 'io-ts/Decoder'
import { serverUrl } from '../constants'
import { Student, StudentDecoder, StudentInput } from '../models/Student'
import { endpoint } from '../utils/api'
import { ignoreDecoder } from '../utils/Decoder'

const studentsUrl = `${serverUrl}/api/students`

export const getAll = (_: void) =>
  endpoint({
    method: 'GET',
    url: `${studentsUrl}`,
    decoder: D.array(StudentDecoder),
  })

export const getById = (id: number) =>
  endpoint({
    method: 'GET',
    url: `${studentsUrl}/${id}`,
    decoder: StudentDecoder,
  })

export const insert = (data: StudentInput) =>
  endpoint({
    method: 'POST',
    url: `${studentsUrl}`,
    body: data,
    decoder: ignoreDecoder,
  })

export const update = ({ id, ...data }: Student) =>
  endpoint({
    method: 'PUT',
    url: `${studentsUrl}/${id}`,
    body: data,
    decoder: ignoreDecoder,
  })

export const deleteById = (id: number) =>
  endpoint({
    method: 'DELETE',
    url: `${studentsUrl}/${id}`,
    decoder: ignoreDecoder,
  })
