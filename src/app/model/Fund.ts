export class Fund {
  private _fundID: string;
  private _fundName: string;
  private _fundCover: string;
  private _fundDescription: string;
  private _valuePerDonationPackage: number;
  private _fundType: string;
  private _fundBalance: number;

  constructor(fundID: string = "", fundName: string = "", fundCover: string = "", fundDescription: string = "", valuePerDonationPackage: number = 0, fundType: string = "", fundBalance: number = 0) {
    this._fundID = fundID;
    this._fundName = fundName;
    this._fundCover = fundCover;
    this._fundDescription = fundDescription;
    this._valuePerDonationPackage = valuePerDonationPackage;
    this._fundType = fundType;
    this._fundBalance = fundBalance;
  }

  public copyFund(fund: Fund) {
    this._fundID = fund.fundID;
    this._fundName = fund.fundName;
    this._fundCover = fund.fundCover;
    this._fundDescription = fund.fundDescription;
    this._valuePerDonationPackage = fund.valuePerDonationPackage;
    this._fundType = fund.fundType;
    this._fundBalance = fund.fundBalance;
  }



  get fundID(): string {
    return this._fundID;
  }

  set fundID(fundID: string) {
    this._fundID = fundID;
  }

  get fundName(): string {
    return this._fundName;
  }

  set fundName(fundName: string) {
    this._fundName = fundName;
  }

  get fundCover(): string {
    return this._fundCover;
  }

  set fundCover(fundCover: string) {
    this._fundCover = fundCover;
  }

  get fundDescription(): string {
    return this._fundDescription;
  }

  set fundDescription(fundDescription: string) {
    this._fundDescription = fundDescription;
  }

  get valuePerDonationPackage(): number {
    return this._valuePerDonationPackage;
  }

  set valuePerDonationPackage(valuePerDonationPackage: number) {
    this._valuePerDonationPackage = valuePerDonationPackage;
  }

  get fundType(): string {
    return this._fundType;
  }

  set fundType(fundType: string) {
    this._fundType = fundType;
  }

  get fundBalance(): number {
    return this._fundBalance;
  }

  set fundBalance(fundBalance: number) {
    this._fundBalance = fundBalance;
  }
}
