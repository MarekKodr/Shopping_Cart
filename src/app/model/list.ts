export class List {
    public name: string;
    public picture: string;
    public admin: string;
    public note: string;

    constructor(name?: string, picture?: string, admin?: string, note?: string) {
        this.name = name;
        this.picture = picture;
        this.admin = admin;
        this.note = note;
    }
}