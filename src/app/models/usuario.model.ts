import { environment } from "src/environments/environment";

const base_url = environment.base_url;

environment
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public role?: 'ADMIN_ROLE'| 'USER_ROLE',
        public uid?: string,
    ) { }

    get imagenUrl() {
        if( this.img ){
            return `${base_url}/uploads/usuarios/${ this.img }`;
        } else {
            return `${base_url}/uploads/usuarios/no-image`;
        }

        return ''
    }

}