
export class User {
    public photoURL: string;
    public uid: string;
    public email: string;
    public password: string;
    
    constructor(id? : string, name? : string, photo?: any) {
        this.photoURL = photo;
        this.email = name;
        this.uid = id;
    }
    
    public setNull() {
        this.photoURL = '';
        this.email = '';
        this.uid = '';
    }

    public setUser(uid, email, photoURL) {
        this.uid = uid;
        this.email = email;
        this.photoURL = photoURL;
    }
}