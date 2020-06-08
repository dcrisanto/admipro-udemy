import { Hospital } from './hospital.model';
import { User } from './user.model';

export class Medic {
    constructor(
      public name: string,
      public img?: string,
      public _id?: string,
      public _idHospital?: string,
      public usuario?: User,
      public hospital?: Hospital
    ) 
    {}
}