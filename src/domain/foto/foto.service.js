export default class FotoService {

  constructor (resource){
    this._resource = resource('v1/fotos{/id}')
  }

  lista(){
    return this._resource
                .query()
                .then(res => res.json(), err => {
                  console.log(err);
                  throw new Error('Não foi possĩvel obter lista')
                })
  }

  cadastra(imagem){

    if(imagem._id){
      return this._resource
                  .update({ id : imagem._id }, imagem)
    }else {
      return this._resource
                  .save(imagem)
    }

  }

  deleta(id){
    return this._resource
                .delete({ id: id })
                .then(null, err =>{
                  console.log(err);
                  throw new Error('Não foi possível deletar a imagem')
                })
  }

  buscaPorId(id){
    return this._resource
                .get({ id })
                .then(res => res.json(), err => {
                  console.log(err);
                  throw new Error('Não foi possĩvel deletar a imagem')
                })
  }

}