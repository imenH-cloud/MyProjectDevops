import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  id?: number;
  name: string;
  email: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://15.237.111.121:3000/teachers'; // Update if your backend URL is different

  constructor(private http: HttpClient) {}

  // Create a new teacher
  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.baseUrl}`, teacher);
  }

  // Get all teachers with pagination
  findAll(page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  // Get one teacher by ID
  findOne(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  // Update a teacher by ID
  update(id: number, teacher: Partial<Teacher>): Observable<Teacher> {
    return this.http.patch<Teacher>(`${this.baseUrl}/${id}`, teacher);
  }

  // Delete a teacher by ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  search(query: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/search`, {
      params: new HttpParams().set('query', query)
    });
  }
}
