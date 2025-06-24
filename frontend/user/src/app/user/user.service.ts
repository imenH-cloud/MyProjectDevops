// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://15.237.111.121:3000/user'; // Adjust to your API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, user);
  }

  updateUser(id: number, user: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteMultipleUsers(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMultipleUser`, { ids });
  }
}
