// Creando una clase para manejar las propiedades
export class User {
  // A partir de la propiedad imagen y el resto son opcionales
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public img?: string,
    public rol?: string,
    public google?: boolean,
    public _id?: string

  ) {}
  
}