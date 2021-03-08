import { UserInterface } from "./user-interface";

export class UserModel {

  nombre: UserInterface['nombre'];
  apellido: UserInterface['apellido'];
  doctoIdent: UserInterface['doctoIdent'];
  email: UserInterface['email'];
  clave: UserInterface['clave'];
  cia: UserInterface['cia'];

  constructor(){
    this.nombre = '';
    this.apellido = '';
    this.doctoIdent = '';
    this.email = '';
    this.clave = '';
    this.cia = '10';
  }

}
