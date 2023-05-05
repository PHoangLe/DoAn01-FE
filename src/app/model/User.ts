export class User {
  private _userID: string;
  private _userEmail: string;
  private _userFirstName: string;
  private _userLastName: string;
  private _phoneNumber: string;
  private _userAvatar: string;
  private _userRoles: string[];
  private _isLocked: boolean;
  private _isEnabled: boolean;
  private _isDeleted: boolean;

  constructor(
    userID: string,
    userEmail: string,
    userFirstName: string,
    userLastName: string,
    phoneNumber: string,
    userAvatar: string,
    userRoles: string[],
    isLocked: boolean,
    isEnabled: boolean,
    isDeleted: boolean
  ) {
    this._userID = userID;
    this._userEmail = userEmail;
    this._userFirstName = userFirstName;
    this._userLastName = userLastName;
    this._phoneNumber = phoneNumber;
    this._userAvatar = userAvatar;
    this._userRoles = userRoles;
    this._isLocked = isLocked;
    this._isEnabled = isEnabled;
    this._isDeleted = isDeleted;
  }

  get userID(): string {
    return this._userID;
  }
  set userID(value: string) {
    this._userID = value;
  }

  // Getter and Setter for userEmail
  get userEmail(): string {
    return this._userEmail;
  }
  set userEmail(value: string) {
    this._userEmail = value;
  }

  // Getter and Setter for userFirstName
  get userFirstName(): string {
    return this._userFirstName;
  }
  set userFirstName(value: string) {
    this._userFirstName = value;
  }

  // Getter and Setter for userLastName
  get userLastName(): string {
    return this._userLastName;
  }
  set userLastName(value: string) {
    this._userLastName = value;
  }

  // Getter and Setter for phoneNumber
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  // Getter and Setter for userAvatar
  get userAvatar(): string {
    return this._userAvatar;
  }
  set userAvatar(value: string) {
    this._userAvatar = value;
  }

  // Getter and Setter for userRoles
  get userRoles(): string[] {
    return this._userRoles;
  }
  set userRoles(value: string[]) {
    this._userRoles = value;
  }

  // Getter and Setter for isLocked
  get isLocked(): boolean {
    return this._isLocked;
  }
  set isLocked(value: boolean) {
    this._isLocked = value;
  }

  // Getter and Setter for isEnabled
  get isEnabled(): boolean {
    return this._isEnabled;
  }
  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  // Getter and Setter for isDeleted
  get isDeleted(): boolean {
    return this._isDeleted;
  }
  set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

}
