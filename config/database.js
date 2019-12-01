const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/node_rest_api'

mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

mongoose.Promise = global.Promise

module.exports = mongoose

/* 
  Outra form de conexão com o mongodb (sem usar o mongoose)

  const { MongoClient } = require('mongodb')
  
  const config = {
    url: 'mongodb://localhost/node_rest_api'
  }
  
  module.exports = () => new Promise((resolve, reject) => {
    MongoClient
      .connect(config.url, { useNewUrlParser: true }, (err, mongoConnnection) => {
        err
        ? reject(err)
        : resolve({
            client: mongoConnnection.db(config.dbName),
            closeConnectionFn: () => setTimeout(() => {
              mongoConnnection.close()
            }, 1000),
            
            mongoConnnection
        })
      })
  })
Inconssistências: 
Problema: Todos os usuários tem permissão para Editar e Mover as páginas
Solução: Retirar o usuário anônimo das permissões.

Editar o titulo dos ADM e colocar o SIGA na frente.




select * from i_prestacaotecnica where fkinstrumentolegal = 50106

select * from i_instrumentolegal where codigosiga = 3849 and anopedido = 2018

begin
update i_prestacaotecnica set status = 3 where pkprestacaotecnica = 101415
commit 

_____________

Microserviços com Message Broker
Todos os serviços se comunica com o message broker que pode ser o kafka
onde quando um serviço conclui sua operação, por exemplo serviço de usuário cadastro etc, envia-se uma mensagem para message broker, que pode
fazer um broadcast comunicando a todos os serviços interessado em ouvir a mensagem do serviço de usuário

event source - reconstruir o banco em caso de perda


status antigo do parcial é criado 0

  // Em outro arquivo




*/