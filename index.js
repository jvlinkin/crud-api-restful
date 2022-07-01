require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')
//forma de ler json/middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Rotas da API

//endpoint inicial
app.get('/', (req,res) =>{
    res.json({
        msg: 'Oi Express!'
    })
})


//person

//Chamando a rota para dentro de personRoutes
const personRoutes = require('./routes/personRoutes')
//Passando como middleware a rota, e a variável que está importando a rota.
app.use('/person', personRoutes)




//CONECTAR USANDO PROMISSES 
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
mongoose.connect(
    `mongodb+srv://${db_user}:${db_password}@api-restful.t9yxmza.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log('Conectado ao MongoDB.')
    app.listen(4000)
}).catch((err) =>{
    console.log('erro')

})
