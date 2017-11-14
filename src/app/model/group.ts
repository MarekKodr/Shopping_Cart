export class Group {
    
    public name: string;
    // public gid: string;
    public picture: string;
    public admin: string;
    public note: string;

    constructor(name?: string, gid?: string, picture?: string, admin?: string, note?: string) {
        this.name = name;
        // this.gid = gid;
        this.picture = picture;
        this.admin   = admin;
    }
}