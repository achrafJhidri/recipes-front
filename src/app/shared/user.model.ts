export class User {
    constructor(
        public email : string,
        public id : string ,
        private _token : string ,
        private _tokenExpirationDate : Date ,
        public roles : string[]
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }else 
        return this._token;
    }

    isAdmin() : boolean {
        return this.roles.findIndex(role => role === "ADMIN") != -1
    }
}