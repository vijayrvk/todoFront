import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  simpleCrypto = new SimpleCrypto('vijay');

  constructor(private _location: Location, public router: Router) {
  }

  storeText = (key, value) => {

    sessionStorage.setItem(key, this.encryptData(value));
  };

  storeJson = (key, value) => {
    sessionStorage.setItem(key, this.encryptData(JSON.stringify(value)));
  };

  getText = (key) => {
    if (!this.checkUserDataExist()) {
      this.router.navigateByUrl('/login');
    }
    return this.decryptData(sessionStorage.getItem(key));
  };

  getJson = (key) => {
    if (!this.checkUserDataExist()) {
      this.router.navigateByUrl('/login');
    }
    return JSON.parse(this.decryptData(sessionStorage.getItem(key)) + '');
  };

  encryptData = (data) => {
    try {
      return this.simpleCrypto.encrypt(data);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }

  };

  decryptData = (data) => {
    try {
      return this.simpleCrypto.decrypt(data);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
  };

  backClicked = () => {
    this._location.back();
  };

  isObject(item) {
    return (typeof item === 'object' && !Array.isArray(item) && item !== null);
  }

  checkNull(data) {
    if (!data || typeof data == undefined) {
      return true;
    }
    return false;
  }

  checkUserDataExist() {
    if (sessionStorage.getItem('userId') === null ||
      sessionStorage.getItem('token') === null ||
      sessionStorage.getItem('name') === null
    ) {
      return false;
    }

    return true;
  }

  enableFromValidation(form) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({onlySelf: true});
    })
  }
}
