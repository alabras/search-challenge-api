import express from 'express'
//import dotenv from 'dotenv'

/*if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}*/

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/test', (req, res) => {
  res.send('Hello Word')
})
//app.use('/api', routerBenefits)

app.listen(5000)
