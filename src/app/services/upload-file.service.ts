import { Injectable } from '@angular/core';
import { provideStorage, getStorage, ref } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ShelterService } from './shelter.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePathFile = '/RelatedDocuments';
  private basePathAvatar = '/Avatar'
  private basePathLogo = "/Logo"
  private avatarUrl = "";
  fileUrl: string[] = new Array;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private shelterService: ShelterService,
    private authService: AuthService) { }

  async pushFileToStorage(fileUpload: File, fileType: string): Promise<any> {
    let basePath = '/RelatedDocuments';
    let filePath = `${basePath}/${this.authService.getDataFromCookie("userID")}/${fileUpload.name}`;
    if (fileType === "avatar") {
      basePath = '/Avatar'
      filePath = `${basePath}/ava-${this.authService.getDataFromCookie("userID")}`;
    }
    else if (fileType === "logo") {
      basePath = '/Avatar'
      filePath = `${basePath}/logo-${this.authService.getDataFromCookie("userID")}`;
    }
    else if (fileType === "pet" || fileType === "petImgs") {
      basePath = '/Pet'
      filePath = `${basePath}/shelter-${this.authService.getDataFromCookie("userID")}/${fileUpload.name}`;
    }
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    const promise = new Promise<void>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          await storageRef.getDownloadURL().subscribe(downloadURL => {
            if (fileType !== "document" && fileType !== "petImgs") {
              this.avatarUrl = (downloadURL)
            }
            else {
              this.fileUrl.push(downloadURL)
            }
            this.db.list(basePath).push(fileUpload);
            resolve();
          });
        })
      ).subscribe()
    });
    return promise
  }

  async deleteFile(fileName: string) {
    let fileRef = this.storage.refFromURL(fileName)
    let shelterID = await this.shelterService.getShelterIDByUserID();
    // let filePath = `Pet/shelter-${shelterID}/${fileName}`;
    // let fileRef = this.storage.ref(filePath);

    fileRef.delete().subscribe(() => {
      console.log('File deleted successfully');
    }, error => {
      console.log('Error deleting file:', error);
    });
  }

  setFileUrl(url: any) {
    this.fileUrl.push(url)
  }

  setAvatarUrl(url: string) {
    console.log(url)
    this.avatarUrl = url
  }

  getFiles(numberItems: number): AngularFireList<File> {
    return this.db.list(this.basePathFile, ref =>
      ref.limitToLast(numberItems));
  }

  getAvatar(numberItems: number): AngularFireList<File> {
    return this.db.list(this.basePathAvatar, ref =>
      ref.limitToLast(numberItems));
  }

  getAvatarURL() {
    const filePath = `${this.basePathAvatar}/ava-${localStorage.getItem("userID")}`
    const storage = getStorage();
    const starsRef = ref(storage, filePath);
  }

  public getFileUrl(): Array<string> {
    return this.fileUrl
  }

  public getAvatarUrl(): string {
    return this.avatarUrl
  }

  getAvatarImageUrl(avatarLink: string) {
    return this.storage.ref(`Avatar/ava-${avatarLink}`).getDownloadURL();
  }

  getLogoImageUrl(avatarLink: string) {
    return this.storage.ref(`Avatar/logo-${avatarLink}`).getDownloadURL();
  }

  getPetImageUrl(avatarLink: string) {
    const shelterID = this.shelterService.getShelterIDByUserID();
    return this.storage.ref(`Pet/shelter-${shelterID}/${avatarLink}`).getDownloadURL();
  }

  getDefaultUserAvatar() {
    return this.storage.ref(`Avatar/ava-default_pfp.png`).getDownloadURL();
  }

}
