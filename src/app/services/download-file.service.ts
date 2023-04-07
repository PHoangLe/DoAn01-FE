import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  private basePathAvatar = '/Avatar'

constructor() { }

getAvatar(){
  const filePath = `${this.basePathAvatar}/ava-${localStorage.getItem("userInfor.userID")}`
  const storage = getStorage();
  const starsRef = ref(storage, filePath);

  getDownloadURL(starsRef).then((url) => {

  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
    }
  });
}

}
