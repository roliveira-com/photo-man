export default class FotoService {

  constructor (resource){
    this._resource = resource('v1/fotos{/id}')
  }

  lista(){
    return this._resource
                .query()
                .then(res => res.json())
  }

  cadastra(imagem){
    return this._resource
                .save(imagem)
  }

  deleta(id){
    return this._resource
                .delete({ id: id })
  }

}