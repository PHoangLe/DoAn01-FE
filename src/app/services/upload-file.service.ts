import { Injectable } from '@angular/core';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage } from '@angular/fire/storage'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePathFile = '/RelatedDocuments';
  private basePathAvatar = '/Avatar'
  private avatarUrl = "";
  fileUrl: Array<string> = []

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  pushFileToStorage(fileUpload: File, fileType: string): Observable<number> {
    let basePath = '/RelatedDocuments';
    if (fileType === "avatar") {
      basePath = '/Avatar'
    }
    const filePath = `${basePath}/${fileUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if (fileType === "avatar") {
            this.setAvatarUrl(downloadURL)
          }
          else {
            this.setFileUrl(downloadURL)
          }
          this.db.list(basePath).push(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  setFileUrl(url: any) {
    this.fileUrl.push(url)
  }

  setAvatarUrl(url: string) {
    this.avatarUrl = url
  }

  getFileUrl(): Array<string> {
    return this.fileUrl
  }

  getAvatarUrl(): string {
    return this.avatarUrl
  }

}
