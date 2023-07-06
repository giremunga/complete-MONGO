const {MongoClient} = require('mongodb')

let dbConnection
let URI = 'mongodb+srv://giremunga:munga2005@cluster0.ykt9ret.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) =>{
        MongoClient.connect(URI)
        
        
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb:() => dbConnection
}