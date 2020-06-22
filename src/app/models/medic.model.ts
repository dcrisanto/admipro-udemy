import { User } from './user.model';

export class Medic {
    constructor(
      public name: string,
      public img?: string,
      public _id?: string,
      public hospital?: string,
      public usuario?: string
    ) 
    {}
}