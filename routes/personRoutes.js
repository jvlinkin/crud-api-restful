const router = require('express').Router()
const Person = require('../models/Person')

//ROTAS DA API

//POST - criação de dados.
router.post('/', async (req,res) =>{

    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({msg: 'O campo nome não pode vir vazio!'})
    }

    if(!salary){
        res.status(422).json({msg: 'O campo salary não pode vir vazio!'})
    }

    if(approved != false && approved != true){
        res.status(422).json({msg: 'O campo approved precisa ser um valor booleano!'})
    }

    const person = {
        name,
        salary,
        approved
    }

    try{
        await Person.create(person)
        //The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.
        res.status(201).json({msg:'Usuário criado com sucesso.'})


    } catch(error){
        //Erro 500 - Server error.
        res.status(500).json({error: error})
    }



})


router.get('/', async (req,res) =>{

    try {
        const people = await Person.find()

        res.status(200).json({people})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Rota GET dinâmica.
router.get('/:id', async (req,res) =>{
    

    const id = req.params.id

    try{
        const people = await Person.findOne({_id: id})

        if(!people){
            res.status(422).json({msg: 'O usuário não foi encontrado.'})
            return
        }else{
            res.status(200).json(people)
        }
        
    } catch(error){
        res.status(500).json({error: error})
        return
    }
})

//UPDATE - Atualização de dados (PUT, PATCH)

//PUT-  Espera o objeto completo para atualizar, porém, as vezes queremos atualizar somente um campo, então usamos o PATCH.

router.patch('/:id', async (req,res) =>{
    const id = req.params.id
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)
        
        // console.log(updatedPerson)
        //O matchedCount é uma propriedade que diz se ouve aluma alteração ou não no registro. (Podemos ver ela dando um console.log na variável.)
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({msg: 'O usuário não foi encontrado.'})
            return
        }
        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }


    
})


router.delete('/:id', async (req,res) =>{

    const id = req.params.id
    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(404).json({msg: 'Usuário não encontrado'})
        return
    }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({msg:'Usuário deletado com sucesso.'})
        return
    } catch(error){
        res.status(500).json({error: error})
    }

    res.status(200).json({msg:'Usuário deletado com sucesso.'})




    
})


//Exportar para importar na index dentro de const personRoutes = require('./routes/personRoutes')
module.exports = router
