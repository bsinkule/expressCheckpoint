const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const data = require('./data.json')

function findById(id) {
    for (let i=0; i<data.length; i++) {
        if (data[i].id === +id) {
            return data[i]
        }
    }
    return null
}

app.use(cors())

app.get('/', (req, res, next) => {
    res.json({ data })
})

app.get('/:id', (req, res, next) => {
    const item = findById(req.params.id)
    if (!item) {
        res.status(404).json({
                error: {
                    message: 'No record found!'
                } 
            })
        return
    }
    res.json({ data: item })   
})

const listener = () => console.log('Listening on port ' + port)
app.listen(port, listener)