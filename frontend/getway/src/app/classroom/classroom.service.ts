import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom, CreateClassroomDto, UpdateClassroomDto } from './classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'http://15.237.111.121:3000/classroom';

  constructor(private http: HttpClient) { }

  create(createClassroomDto: CreateClassroomDto): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, createClassroomDto);
  }

  findAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  findOne(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${id}`);
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto): Observable<Classroom> {
    return this.http.patch<Classroom>(`${this.apiUrl}/${id}`, updateClassroomDto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
