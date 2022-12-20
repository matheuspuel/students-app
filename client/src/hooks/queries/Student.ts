import * as StudentApi from '../../api/Student'
import { makeQueryHook } from './utils'

export const useStudentGetAllQuery = makeQueryHook(StudentApi.getAll)

export const useStudentGetByIdQuery = makeQueryHook(StudentApi.getById)
