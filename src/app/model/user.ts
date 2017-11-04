export class User {
    constructor(id,name,photo) {
        this.photoURL = photo;
        this.email = name;
        this.uid = id;
    }
    public photoURL: string;
    public uid: string;
    public email: string;

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