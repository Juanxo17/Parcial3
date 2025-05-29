export class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.hijos = [];
    }

    agregarHijo(nodo) {
        this.hijos.push(nodo);
        return nodo;
    }
}
