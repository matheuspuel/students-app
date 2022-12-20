
Example application that registers students' data.

## Preview

The application is hosted on the following link: 
https://students-app-production.up.railway.app/.

## Run locally

First you have to set the environment variables:

Create a file named ".env" in the server directory and write the variables for your environment
(you can use the file ".env.example" as a reference);

You must provide the following variables to connect to a MySQL database:
```
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=123456
MYSQLDATABASE=students-app
```

You must provide the following variable to save uploaded images locally in the file system:
```
MEDIA_DIRECTORY=C:\projects\students-app\server\dev-media
```

or provide the following variables to upload images to the cloud:
```
AWSS3_BUCKET=my-bucket
AWSS3_REGION=sa-east-1
AWSS3_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXX
AWSS3_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Then build the client, build the server and run the built app. You can do it all by running:

```
cd client
npm install
npm run build
cd ../server
npm install
npm run build
npm run prod:windows
```

Finally, open the app in the browser: http://localhost:8080/.

## Develop

To develop the server application,
first set the environment variables as described above,
then run:
```
npm start
```
from the server directory.

To develop the client application run:
```
npm start
```
from the client directory.

## Test

To run unit tests run:
```
npm run test
```
or
```
npm run test:watch
```
from the server directory.
