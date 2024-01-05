import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

app.listen(5000, () => {
  console.log('hello on http://localhost:5000')
})
