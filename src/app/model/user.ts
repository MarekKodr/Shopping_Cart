
export class User {
    public foto: string;
    public uid: string;
    public email: string;
    public password: string;
    
    constructor(id? : string, name? : string, foto?: any) {
        this.foto = foto;
        this.email = name;
        this.uid = id;
    }
    
    public setNull() {
        this.foto = '';
        this.email = '';
        this.uid = '';
    }

    public setUser(uid, email, foto) {
        this.uid = uid;
        this.email = email;
        this.foto = foto;
    }
}