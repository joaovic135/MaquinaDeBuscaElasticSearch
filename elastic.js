const { Client } = require('@elastic/elasticsearch')
const es = new Client({
  node: 'http://localhost:9200',
})

class ElasticService {


  async index(index, id, doc) {
      await es
          .index({
              index,
              id: id.toString(),
              document: {
                  doc,
              },
          })
          .catch((err) => {
              console.log(`[Error] Cant index document: ${err}`)
              throw new Error('Cant index document')
          })
      await this.es.indices.refresh({ index })
  }

  async search(index, query) {
      const results = []

      const response = await es
          .search({
              index,
              query: {
                  match: { doc: query },
              },
          })
          .catch((err) => {
              console.log(err)
          })

      const hits = response['hits']['hits']

      hits.forEach(({ _id, _score }) => {
          results.push({
              id: parseInt(_id),
              score: _score,
          })
      })

      return results
  }
}

module.exports = new ElasticService() 


