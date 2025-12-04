import express, { Request, Response } from 'express'
import config from './confiq'

const app = express();
const port = config.port;

// middleware
app.use(express.json())





app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
