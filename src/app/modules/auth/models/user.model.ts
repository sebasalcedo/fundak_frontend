export class User{
  constructor(
    public uid: string,
    public nombre: string,
    public last_name: string,
    public phone: string,
    public email:string,
    public password?: string,
    public img?: string,
    public rol?: string,


  ){}
}
