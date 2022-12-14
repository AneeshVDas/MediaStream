import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.backendApi + '/api';

  constructor(private http: HttpClient) { }

  signup(payload: any): Observable<any> {
    const tempUrl = this.url + "/signup";
    return this.http.post(tempUrl, payload);
  }

  signin(email: string, password: string): Observable<any> {
    const tempUrl = this.url + "/signin";
    return this.http.post(tempUrl, { email, password });
  }

  logout(): void {
    if (window.localStorage && localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if (window.localStorage && localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    return
  }

  isSignedIn(): any {

    console.log(JSON.parse(JSON.stringify((localStorage.getItem('token')))));

    if (window.localStorage && localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return false;
  }

  isSubscribed(): any {
    if (window.localStorage && localStorage.getItem('user')) {
      let user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
      if (user.subscription_plan) {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }

  isAdmin(): any {
    if (window.localStorage && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      //return user.role === 1 ? JSON.parse(JSON.stringify(localStorage.getItem('token'))) : false;
      return user.role === 1 ? JSON.parse(localStorage.getItem('token')) : false;
    }
    return false
  }
}
