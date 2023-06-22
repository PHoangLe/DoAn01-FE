export class Pet {
  private _animalID: string;
  private _animalName: string;
  private _shelterID: string;
  private _animalAge: string;
  private _animalGender: boolean;
  private _animalWeight: number;
  private _animalBreed: string;
  private _animalSpecie: string;
  private _animalColor: string;
  private _animalImg: string;
  private _animalStatus: string;
  private _vaccinated: boolean;
  private _deWormed: boolean;
  private _sterilized: boolean;
  private _friendly: boolean;
  private _othersImg: string[];
  private _onlineAdopters: any[];
  private _adopted: boolean;
  private _isDelete: boolean;

  constructor(
    animalID = '',
    animalName = '',
    shelterID = '',
    animalAge = '',
    animalGender = false,
    animalWeight = 0,
    animalBreed = '',
    animalSpecie = '',
    animalColor = '',
    animalImg = '',
    animalStatus = '',
    vaccinated = false,
    deWormed = false,
    sterilized = false,
    friendly = false,
    othersImg = [],
    onlineAdopters = [],
    adopted = false,
    isDelete = false
  ) {
    this._animalID = animalID;
    this._animalName = animalName;
    this._shelterID = shelterID;
    this._animalAge = animalAge;
    this._animalGender = animalGender;
    this._animalWeight = animalWeight;
    this._animalBreed = animalBreed;
    this._animalSpecie = animalSpecie;
    this._animalColor = animalColor;
    this._animalImg = animalImg;
    this._animalStatus = animalStatus;
    this._vaccinated = vaccinated;
    this._deWormed = deWormed;
    this._sterilized = sterilized;
    this._friendly = friendly;
    this._othersImg = othersImg;
    this._adopted = adopted;
    this._onlineAdopters = onlineAdopters;
    this._isDelete = isDelete;
  }


  get isDelete(): boolean {
    return this._isDelete;
  }

  get animalID(): string {
    return this._animalID;
  }

  get animalName(): string {
    return this._animalName;
  }

  set animalName(animalName: string) {
    this._animalName = animalName;
  }

  get shelterID(): string {
    return this._shelterID;
  }
  get animalAge(): string {
    return this._animalAge;
  }
  set shelterID(shelterID: string) {
    this._shelterID = shelterID;
  }

  set isDelete(isDelete: boolean) {
    this._isDelete = isDelete;
  }

  set animalAge(animalAge: string) {
    this._animalAge = animalAge;
  }

  get animalGender(): boolean {
    return this._animalGender;
  }

  set animalGender(animalGender: boolean) {
    this._animalGender = animalGender;
  }

  get animalWeight(): number {
    return this._animalWeight;
  }

  set animalWeight(animalWeight: number) {
    this._animalWeight = animalWeight;
  }

  get animalBreed(): string {
    return this._animalBreed;
  }

  set animalBreed(animalBreed: string) {
    this._animalBreed = animalBreed;
  }

  get animalSpecie(): string {
    return this._animalSpecie;
  }

  set animalSpecie(animalSpecie: string) {
    this._animalSpecie = animalSpecie;
  }

  get animalColor(): string {
    return this._animalColor;
  }

  set animalColor(animalColor: string) {
    this._animalColor = animalColor;
  }

  get animalImg(): string {
    return this._animalImg;
  }

  set animalImg(animalImg: string) {
    this._animalImg = animalImg;
  }

  get animalStatus(): string {
    return this._animalStatus;
  }

  set animalStatus(animalStatus: string) {
    this._animalStatus = animalStatus;
  }

  get vaccinated(): boolean {
    return this._vaccinated;
  }

  set vaccinated(vaccinated: boolean) {
    this._vaccinated = vaccinated;
  }

  get deWormed(): boolean {
    return this._deWormed;
  }

  set deWormed(deWormed: boolean) {
    this._deWormed = deWormed;
  }

  get sterilized(): boolean {
    return this._sterilized;
  }

  set sterilized(sterilized: boolean) {
    this._sterilized = sterilized;
  }

  get friendly(): boolean {
    return this._friendly;
  }

  set friendly(friendly: boolean) {
    this._friendly = friendly;
  }

  get othersImg(): string[] {
    return this._othersImg;
  }

  set othersImg(othersImg: string[]) {
    this._othersImg = othersImg;
  }

  get onlineAdopters(): string[] {
    return this._onlineAdopters;
  }

  set onlineAdopters(onlineAdopters: string[]) {
    this._onlineAdopters = [...onlineAdopters];
  }

  get adopted(): boolean {
    return this._adopted;
  }

  set adopted(adopted: boolean) {
    this._adopted = adopted;
  }
}
