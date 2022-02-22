import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelperService {

  constructor() { }

  private secretKey:string = "Mur@ Soft"

  setToLocalStorageWithEncryption(key:string, value:string){
    let encrypted = CryptoJS.AES.encrypt(value, this.secretKey)    
    localStorage.setItem(key, encrypted.toString())
  }

  getFromLocalStorageWithDecryption(key:string) {
    let tryGetItem = localStorage.getItem(key)
    if (tryGetItem) {
      let decryptedData = CryptoJS.AES.decrypt(tryGetItem, this.secretKey).toString(CryptoJS.enc.Utf8)
      return decryptedData
    }
    return null
  }
   
}

 // hashAndSetAuthenticatedUserToLocalStorage(key:string, value:UserDetailsDto){
  //   let stringify = JSON.stringify(value)
  //   let encrypted = CryptoJS.AES.encrypt(stringify, this.secretKey)    
  //   localStorage.setItem(key, encrypted.toString())
  // }

  // getAuthenticatedUserAndDehashFromLocalStorage(key:string):UserDetailsDto{    
  //   let getData = localStorage.getItem(key) 
  //   if (!getData) {
  //     return null
  //   }   
  //   let decryptedData = CryptoJS.AES.decrypt(getData, this.secretKey).toString(CryptoJS.enc.Utf8)
  //   return JSON.parse(decryptedData) as UserDetailsDto
  // }
