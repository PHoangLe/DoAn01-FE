export class User {
  userEmail: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  userRole: string;
  isLock: boolean;

  getUser(user : any){
    this.userEmail = user.userEmail
    this.userFirstName = user.firstName
    this.userLastName = user.lastName
    this.userAvatar = user.photoUrl
  }

}
