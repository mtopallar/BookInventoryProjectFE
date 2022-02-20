import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UserDetailsDto } from '../models/userDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageEncryptDecryptHelperService {

  constructor() { }

  private secretKey:string = "Mur@ Soft"

  hashAndSetAuthenticatedUserToLocalStorage(key:string, value:UserDetailsDto){
    let stringify = JSON.stringify(value)
    let encrypted = CryptoJS.AES.encrypt(stringify, this.secretKey)    
    localStorage.setItem(key, encrypted.toString())
  }

  getAuthenticatedUserAndDehashFromLocalStorage(key:string):UserDetailsDto{    
    let getData = localStorage.getItem(key) 
    if (!getData) {
      return null
    }   
    let decryptedData = CryptoJS.AES.decrypt(getData, this.secretKey).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData) as UserDetailsDto
  }
}
