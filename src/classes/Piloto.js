import { validate } from "bycontract";

class Piloto {

  // Propriedades
  matricula
  nome
  habilitacaoAtiva = false
  static pilotosCadastrados = []

  // Método construtor
  // Criei uma propriedade estática para armazenar os pilotos cadastrados
  constructor(matricula, nome, habilitacaoAtiva) {
    validate(arguments, ["string", "string", "boolean"]);
    this.matricula = matricula;
    this.nome = nome;
    this.habilitacaoAtiva = habilitacaoAtiva;
    Piloto.pilotosCadastrados.push(this);
  }

  // Método toString da classepara retornar os dados do piloto
  toString() {
    return {
      matricula: this.matricula,
      nome: this.nome,
      habilitacaoAtiva: this.habilitacaoAtiva
    };
  }

  // Método estático para retornar todos os pilotos cadastrados
  static todos() {
    return Piloto.pilotosCadastrados;
  }

}

export { Piloto };