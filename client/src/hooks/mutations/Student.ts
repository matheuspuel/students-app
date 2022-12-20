import * as StudentApi from '../../api/Student'
import { makeMutationHook } from './utils'

export const useStudentInsertMutation = makeMutationHook(StudentApi.insert)

export const useStudentUpdateMutation = makeMutationHook(StudentApi.update)

export const useStudentDeleteByIdMutation = makeMutationHook(
  StudentApi.deleteById,
)
