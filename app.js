const express = require('express')
const {connectToDb, getDb} = require('./db')
const { ObjectId } = require('mongodb')
//init app &middleware


const app = express()
app.use(express.json())
//db connection
let db

connectToDb((err) =>{
    if(!err){
        app.listen(3000, () =>{
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})



//routes
app.get('/books' , (req, res) => {

    const page = req.query.p || 0
    const booksPerPage = 2
    let books = []
    
    db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book=> books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error: 'could not fetch the documents'})
    })

    app.get ('/books/:id' , (req,res) =>{
        if (ObjectId.isValid(req.params.id)){
            db.collection('books')
        .findone({_id: new ObjectId(req.params.id)})
        .then(doc =>{
            res.status(200).json(doc)
            .catch(()=>{
                res.status(500).json({eror : 'could not fetch the documents'})
            })
        })
        } else{
            res.status(500).json({eror : 'not valid id'})
        }
        
    })


    app.post('/books',(req,res)=>{
       const book = req.body 

       db.collection('books')
       .insertOne(book)
       .then(result => {
        res.status(201).json(result)
        .catch((err) => {
            res.status(500).json({err : ' could not create a new document'})
        })
       })
    })
        
     
})