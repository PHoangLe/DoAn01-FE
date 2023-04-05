export class User {
  userID: string;
  userEmail: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  userRole: string;
  isLock: boolean;

  getUser(user : any){
    this.userID = user.userID
    this.userEmail = user.userEmail
    this.userFirstName = user.firstName
    this.userLastName = user.lastName
    this.userAvatar = user.photoUrl
  }

}
