import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  updateUserCvId(userId: string, cvId: string) {
    return this.http.put(this.baseUrl, {
      userId,
      cv: cvId
    });
  }

  updateUserProfileImage(userId: string, profileImage: string) {
    return this.http.put(this.baseUrl, {
      userId,
      profileImage
    });
  }
}
