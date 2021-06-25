import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/test', (req, res) => {
  res.send('Hello Word')
})

app.listen(5000)
