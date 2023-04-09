import { Injectable } from '@angular/core';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage, ref } from '@angular/fire/storage'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat';
import { FileUpload } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePathFile = '/RelatedDocuments';
  private basePathAvatar = '/Avatar'
  private avatarUrl = "";
  fileUrl: Array<string> = new Array;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  pushFileToStorage(fileUpload: File, fileType: string): Observable<number> {
    let basePath = '/RelatedDocuments';
    let filePath = `${basePath}/${localStorage.getItem("userInfor.userID")}/${fileUpload.name}`;
    if (fileType === "avatar") {
      basePath = '/Avatar'
      filePath = `${basePath}/ava-${localStorage.getItem("userInfor.userID")}`;
    }
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(async() => {
        await storageRef.getDownloadURL().subscribe(downloadURL => {
          if (fileType === "avatar") {
            this.setAvatarUrl(downloadURL)
          }
          else {
            this.fileUrl.push(downloadURL)
            console.log("this is url: " + this.getFileUrl())
          }
          this.db.list(basePath).push(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  setFileUrl(url: any) {
    this.fileUrl.push(url)
    console.log("this is url: " + url)
  }

  setAvatarUrl(url: string) {
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

  getAvatarURL(){
    const filePath = `${this.basePathAvatar}/ava-${localStorage.getItem("userID")}`
    const storage = getStorage();
    const starsRef = ref(storage, filePath);
    console.log(starsRef)
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

  getDefaultUserAvatar(){
    return this.storage.ref(`Avatar/ava-default_pfp.png`).getDownloadURL();
  }

}
