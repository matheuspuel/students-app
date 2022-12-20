import { Router } from 'express'
import * as D from 'io-ts/Decoder'
import { StudentInputDecoder } from 'src/domain/models/Student'
import * as StudentProcedures from 'src/domain/procedures/Student'
import { route } from 'src/infra/http/utils'
import { numberFromStringDecoder } from 'src/utils/Decoder'

type Dependencies = Parameters<
  typeof StudentProcedures[keyof typeof StudentProcedures]
>[0]

// Controllers validate received data and call the domain procedures to calculate the response

export const StudentController = (deps: Dependencies) =>
  Router()
    .get(
      '/',
      route(D.UnknownRecord)(() => StudentProcedures.getAll(deps)()),
    )
    .get(
      '/:id(\\d+)',
      route(
        D.struct({
          params: D.struct({ id: numberFromStringDecoder }),
        }),
      )(({ params }) => StudentProcedures.getById(deps)(params.id)),
    )
    .post(
      '/',
      route(
        D.struct({
          body: StudentInputDecoder,
        }),
      )(({ body }) => StudentProcedures.insert(deps)(body)),
    )
    .put(
      '/:id(\\d+)',
      route(
        D.struct({
          params: D.struct({ id: numberFromStringDecoder }),
          body: StudentInputDecoder,
        }),
      )(({ body, params }) =>
        StudentProcedures.update(deps)({ ...body, id: params.id }),
      ),
    )
    .delete(
      '/:id(\\d+)',
      route(
        D.struct({
          params: D.struct({ id: numberFromStringDecoder }),
        }),
      )(({ params }) => StudentProcedures.deleteById(deps)(params.id)),
    )
