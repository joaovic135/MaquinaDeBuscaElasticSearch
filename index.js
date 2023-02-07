const express = require('express')
const elasticService = require('./elastic')

const INDEX_KEY = 'petrobras'

const app = express()

app.use(express.json())

app.get('/search', async (req, res)=>{
  const { q } = req.query

  const results = await elasticService.search(INDEX_KEY, q)
    .catch((err)=>{
      console.log("[Error] ", err.message)
    })

  if(!results){
    return res.status(400).json({
      message: 'Cant find documents',
    })
  }

  return res.status(200).json({
    data: results
  })

})


// async function run () {

//   await client.index({
//     index: INDEX_KEY,
//     document: {
//       character: 'Tyrion Lannister',
//       quote: 'A mind needs books like a sword needs a whetstone.'
//     }
//   })

//   // here we are forcing an index refresh, otherwise we will not
//   // get any result in the consequent search
//   await client.indices.refresh({ index: INDEX_KEY })
// }

// await run().catch(console.log)


app.listen(3000, ()=>{
  console.log("Serviço de busca iniciado na porta 3000")
})
