import { validate } from "bycontract";

class Piloto {

  // Propriedades
  matricula
  nome
  habilitacaoAtiva = false
  // Criada uma propriedade estática para armazenar os pilotos cadastrados
  static pilotosCadastrados = []

  // Método construtor
  constructor(matricula, nome, habilitacaoAtiva) {
    validate(arguments, ["string", "string", "boolean"]);
    this.matricula = matricula;
    this.nome = nome;
    this.habilitacaoAtiva = habilitacaoAtiva;
    Piloto.pilotosCadastrados.push(this);
  }

  // Método toString da classe para retornar os dados do piloto
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

// Exporta a classe Piloto para ser usada em outras classes
export { Piloto };