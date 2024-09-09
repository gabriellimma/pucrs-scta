import {
  validate
} from "bycontract"

/**
 * Classe PlanoDeVoo que representa um plano de voo genérico.
 */
class PlanoDeVoo {

  static id = 1
  id
  matriculaPiloto
  idAerovia
  data
  horario
  altitude
  slots
  cancelado

  /**
   * construtor da classe Plano de Voo
   * @param {String} matriculaPiloto 
   * @param {String} idAerovia 
   * @param {String} data 
   * @param {String} hora 
   * @param {String} horario 
   * @param {Number} altitude 
   * @param {Array<Number>} slots 
   * @param {Boolean} cancelado 
   */
  constructor(matriculaPiloto, idAerovia, data, horario, altitude, slots, cancelado) {
    validate(arguments,
      ["String", "String", "String", "String", "Number", "Array.<Number>", "Boolean"])
    this.matriculaPiloto = matriculaPiloto
    this.idAerovia = idAerovia
    this.data = data
    this.horario = horario
    this.altitude = altitude
    this.slots = slots
    this.cancelado = cancelado
    this.id = PlanoDeVoo.id++
  }

  /**
   * Método que retorna um objeto com os dados do plano de voo.
   * @returns {PlanoDeVoo} 
   */
  toString() {
    return {
      id: this.id,
      matriculaPiloto: this.matriculaPiloto,
      idAerovia: this.idAerovia,
      data: this.data,
      horario: this.horario,
      altitude: this.altitude,
      slots: this.slots,
      cancelado: this.cancelado
    }
  }
}



// Exporta a classe PlanoDeVoo para ser usada em outras classes
export { PlanoDeVoo }