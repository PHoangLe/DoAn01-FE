export class Shelter {
  private _shelterID : string;
  private _userID: string;
  private _shelterName : string;
  private _representativeFacebookLink : string;
  private _representativeEmailAddress : string;
  private _unitNoAndStreet : string;
  private _ward : string;
  private _district : string;
  private _city : string;
  private _shelterPhoneNo : string;
  private _relatedDocuments : string[];

  constructor(
    shelterID: string,
    userID: string,
    shelterName: string,
    representativeFacebookLink: string,
    representativeEmailAddress: string,
    unitNoAndStreet: string,
    ward: string,
    district: string,
    city: string,
    shelterPhoneNo: string,
    relatedDocuments: string[]
  ) {
    this._shelterID = shelterID;
    this._userID = userID;
    this._shelterName = shelterName;
    this._representativeFacebookLink = representativeFacebookLink;
    this._representativeEmailAddress = representativeEmailAddress;
    this._unitNoAndStreet = unitNoAndStreet;
    this._ward = ward;
    this._district = district;
    this._city = city;
    this._shelterPhoneNo = shelterPhoneNo;
    this._relatedDocuments = relatedDocuments;
  }

  get shelterID(): string {
    return this._shelterID;
  }

  set shelterID(value: string) {
    this._shelterID = value;
  }

  get userID(): string {
    return this._userID;
  }

  set userID(value: string) {
    this._userID = value;
  }

  get shelterName(): string {
    return this._shelterName;
  }

  set shelterName(value: string) {
    this._shelterName = value;
  }

  get representativeFacebookLink(): string {
    return this._representativeFacebookLink;
  }

  set representativeFacebookLink(value: string) {
    this._representativeFacebookLink = value;
  }

  get representativeEmailAddress(): string {
    return this._representativeEmailAddress;
  }

  set representativeEmailAddress(value: string) {
    this._representativeEmailAddress = value;
  }

  get unitNoAndStreet(): string {
    return this._unitNoAndStreet;
  }

  set unitNoAndStreet(value: string) {
    this._unitNoAndStreet = value;
  }

  get ward(): string {
    return this._ward;
  }

  set ward(value: string) {
    this._ward = value;
  }

  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get shelterPhoneNo(): string {
    return this._shelterPhoneNo;
  }

  set shelterPhoneNo(value: string) {
    this._shelterPhoneNo = value;
  }

  get relatedDocuments(): string[] {
    return this._relatedDocuments;
  }

  set relatedDocuments(value: string[]) {
    this._relatedDocuments = value;
  }
}
