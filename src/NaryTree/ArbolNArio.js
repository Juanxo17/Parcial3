import { Nodo } from "./Nodo";

export class ArbolNArio {
    constructor() {
        this.raiz = null;
    }

    agregarRaiz(valor) {
        this.raiz = new Nodo(valor);
        return this.raiz;
    }
    buscarNodo(valor, nodoInicial = this.raiz) {
        if (!nodoInicial) return null;
        
        console.log('Buscando nodo:', valor, 'nodo actual:', nodoInicial.valor);
        
        if (nodoInicial.valor.nombre === valor) {
            console.log('¡Nodo encontrado!');
            return nodoInicial;
        }
        
        

        for (let hijo of nodoInicial.hijos) {
            const resultado = this.buscarNodo(valor, hijo);
            if (resultado) return resultado;
        }
        
        return null;
    }
      
    agregarHijo(valorPadre, nuevoValor) {
        console.log('Agregando hijo:', valorPadre, nuevoValor);
        
        const nodoPadre = this.buscarNodo(valorPadre);
        console.log('Nodo padre encontrado:', nodoPadre);
        
        if (nodoPadre) {
            const nuevoNodo = new Nodo(nuevoValor);
            nodoPadre.agregarHijo(nuevoNodo);
            console.log('Hijo agregado exitosamente');
            return nuevoNodo;
        } else {
            console.error('No se encontró el nodo padre:', valorPadre);
            return null;
        }
    }
    editarNodo(valorAntiguo, nuevoNombre) {
        console.log('Editando nodo:', valorAntiguo, 'Nuevo nombre:', nuevoNombre);
        
        const nodo = this.buscarNodo(valorAntiguo);
        if (nodo) {
            nodo.valor.nombre = nuevoNombre;
            console.log('Nodo editado exitosamente');
            return true;
        } else {
            console.error('No se encontró el nodo para editar:', valorAntiguo);
            return false;
        }
    }
    

    calcularAltura(nodo = this.raiz) {
        if (!nodo) return 0;
        
        if (nodo.hijos.length === 0) {
            return 1;
        }
        
        let alturaMaxima = 0;
        for (let hijo of nodo.hijos) {
            const alturaHijo = this.calcularAltura(hijo);
            if (alturaHijo > alturaMaxima) {
                alturaMaxima = alturaHijo;
            }
        }
        
        return alturaMaxima + 1;
    }
    
    contarNodos(nodo = this.raiz) {
        if (!nodo) return 0;
        
        let contador = 1;
        
        for (let hijo of nodo.hijos) {
            contador += this.contarNodos(hijo);
        }
        
        console.log('Conteo total de nodos:', contador);
        return contador;
    }

    
    dfs(nodo = this.raiz) {
        if (!nodo) return [];
        
        let resultado = [nodo.valor];
        
        for (let hijo of nodo.hijos) {
            resultado = resultado.concat(this.dfs(hijo));
        }
        
        return resultado;
    }

    
    bfs() {
        if (!this.raiz) return [];
        
        const cola = [this.raiz];
        const resultado = [];
        
        while (cola.length > 0) {
            const actual = cola.shift();
            resultado.push(actual.valor);
            
            for (let hijo of actual.hijos) {
                cola.push(hijo);
            }
        }
        
        return resultado;
    }    
    obtenerDatosD3(nodo = this.raiz) {
        if (!nodo) return null;
        
        const resultado = {
            name: nodo.valor.nombre,
            children: []
        };
        
        for (let hijo of nodo.hijos) {
            resultado.children.push(this.obtenerDatosD3(hijo));
        }
        
        return resultado;
    }
}
