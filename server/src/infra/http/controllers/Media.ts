import cuid from 'cuid'
import { Router } from 'express'
import { MediaStorage } from 'src/domain/services/MediaStorage'
import { HttpStatus } from '../utils'

export const MediaController = (deps: { MediaStorage: MediaStorage }) =>
  Router()
    .get('/:id', async (req, res) => {
      const result = await deps.MediaStorage.read(req.params.id)
      if (result.success) {
        if (result.value) {
          result.value.pipe(res)
          result.value.on('error', e => {
            console.error(e)
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
          })
        } else {
          res.sendStatus(HttpStatus.NOT_FOUND)
        }
      } else {
        console.error(result.error)
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    })
    .post('/', async (req, res) => {
      const id = cuid()
      const result = await deps.MediaStorage.write({
        id,
        stream: req,
        contentType: req.headers['content-type'],
        contentLength: +(req.headers['content-length'] || ''),
      })
      if (result.success) {
        res.json({ id })
      } else {
        console.error(result.error)
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    })
