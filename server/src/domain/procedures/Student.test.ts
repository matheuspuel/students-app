import * as D from 'io-ts/Decoder'
import { StudentRepositoryMock } from 'src/mocks/repositories/Student'
import { DatabaseDecodingError, ResourceNotFoundError } from 'src/utils/Error'
import { failure, success } from 'src/utils/Result'
import * as StudentProcedures from './Student'

const examples = [
  {
    name: 'name0',
    phone: 'phone0',
    address: 'address0',
    imageId: 'imageId0',
  },
  {
    name: 'name1',
    phone: 'phone1',
    address: 'address1',
    imageId: 'imageId1',
  },
  {
    name: 'name2',
    phone: 'phone2',
    address: 'address2',
    imageId: 'imageId2',
  },
] as const

type Dependencies = Parameters<
  typeof StudentProcedures[keyof typeof StudentProcedures]
>[0]

const getDependencies = (): Dependencies => ({
  Repositories: { Student: StudentRepositoryMock() },
})

describe('Student', () => {
  it('should create a student', async () => {
    // ARRANGE
    const deps = getDependencies()

    // ACT
    await StudentProcedures.insert(deps)(examples[0])

    // ASSERT
    const result = await StudentProcedures.getAll(deps)()
    expect(result).toEqual(success([{ ...examples[0], id: 1 }]))
  })

  it('should update a student', async () => {
    const deps = getDependencies()
    await StudentProcedures.insert(deps)(examples[0])

    await StudentProcedures.update(deps)({ ...examples[1], id: 1 })

    const result = await StudentProcedures.getAll(deps)()
    expect(result).toEqual(success([{ ...examples[1], id: 1 }]))
  })

  it('should list students', async () => {
    const deps = getDependencies()
    await StudentProcedures.insert(deps)(examples[0])
    await StudentProcedures.insert(deps)(examples[1])
    await StudentProcedures.insert(deps)(examples[2])

    const result = await StudentProcedures.getAll(deps)()

    expect(result).toEqual(
      success([
        { ...examples[0], id: 1 },
        { ...examples[1], id: 2 },
        { ...examples[2], id: 3 },
      ]),
    )
  })

  it('should get student by id', async () => {
    const deps = getDependencies()
    await StudentProcedures.insert(deps)(examples[0])
    await StudentProcedures.insert(deps)(examples[1])
    await StudentProcedures.insert(deps)(examples[2])

    const result = await StudentProcedures.getById(deps)(2)

    expect(result).toEqual(success({ ...examples[1], id: 2 }))
  })

  it('should delete student by id', async () => {
    const deps = getDependencies()
    await StudentProcedures.insert(deps)(examples[0])
    await StudentProcedures.insert(deps)(examples[1])
    await StudentProcedures.insert(deps)(examples[2])

    await StudentProcedures.deleteById(deps)(2)

    const result = await StudentProcedures.getAll(deps)()
    expect(result).toEqual(
      success([
        { ...examples[0], id: 1 },
        { ...examples[2], id: 3 },
      ]),
    )
  })

  it('should fail to get student by inexistent id', async () => {
    const deps = getDependencies()

    const result = await StudentProcedures.getById(deps)(1)

    expect(result).toEqual(failure(new ResourceNotFoundError()))
  })

  it('should fail if database operation fails', async () => {
    const mockError = new DatabaseDecodingError(D.error(null, ''))
    const deps: Parameters<typeof StudentProcedures['getById']>[0] = {
      Repositories: {
        Student: {
          ...StudentRepositoryMock(),
          getById: async _id => failure(mockError),
        },
      },
    }

    const result = await StudentProcedures.getById(deps)(1)

    expect(result).toEqual(failure(mockError))
  })
})
