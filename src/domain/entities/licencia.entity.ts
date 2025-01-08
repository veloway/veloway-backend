// Importar despues entidad Conductor

export class Licencia {
    constructor(
        private categoria: string,
        private fechaVenc: Date,
        private numero: number
        //Agregar atributo idConductor de tipo Conductor
    ) {}

    //Agregar operaciones que tambien me permitan acceder al conductor asociado a la licencia

    // Getters
    
    public getCategoria(): string{
        return this.categoria;
    }

    public getFechaVenc(): Date{
        return this.fechaVenc;
    }

    public getNumero(): number{
        return this.numero;
    }

    //Hacer get de idConductor

    //Setters

    public setCategoria(categoria: string): void{
        this.categoria = categoria;
    }

    public setFechaVenc(fechaVenc: Date): void{
        this.fechaVenc = fechaVenc;
    }
}

