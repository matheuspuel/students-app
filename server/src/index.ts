import { envVars } from './envVars'

import cors from 'cors'
import express from 'express'
import path from 'path'
import { initiateDb } from './infra/db/initiate'
import { StudentRepositoryDB } from './infra/db/repositories/Student'
import { MediaController } from './infra/http/controllers/Media'
import { StudentController } from './infra/http/controllers/Student'
import { AwsS3MediaStorage } from './infra/services/MediaStorage/AwsS3'
import { FileSystemMediaStorage } from './infra/services/MediaStorage/FileSystem'

const app = express()
const port = process.env.PORT || 8080
const clientDir = path.join(__dirname, '..', '..', '..', 'client', 'build')

app.use(cors())
app.use(express.json())
app.use(express.static(clientDir))

app.use((req, res, next) => {
  const now = new Date()
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  console.info(`${time} ${req.method} ${req.url}`)
  next()
})

/**
 * Dependencies that need to be injected to run the app
 */
type AppDependencies = Parameters<typeof StudentController>[0] &
  Parameters<typeof MediaController>[0]

const deps: AppDependencies = {
  Repositories: { Student: StudentRepositoryDB },
  MediaStorage:
    'MEDIA_DIRECTORY' in envVars
      ? FileSystemMediaStorage({ directoryPath: envVars.MEDIA_DIRECTORY })
      : AwsS3MediaStorage({
          bucket: envVars.AWSS3_BUCKET,
          region: envVars.AWSS3_REGION,
          accessKeyId: envVars.AWSS3_ACCESS_KEY_ID,
          secretAccessKey: envVars.AWSS3_SECRET_ACCESS_KEY,
        }),
}

app.use('/api/students', StudentController(deps))
app.use('/api/media/images', MediaController(deps))

app.get('/*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'))
})

initiateDb().then(r => {
  if (r.success) {
    app.listen(port, () => {
      console.log(`Server listening on the port ${port}`)
    })
  } else {
    console.error('Could not initialize database schema')
    throw r.error
  }
})
