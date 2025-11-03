import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  // ⚙️ Cambia el puerto si tu backend usa otro distinto
  base = 'http://localhost:8080/api';

  // ✅ Método que añade el token a las peticiones protegidas
  authHeader() {
    const token = this.auth.getToken();
    const headers = token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : new HttpHeaders();
    return { headers };
  }

  // ───────────────────────────────
  // 🧍 PERSONA
  // ───────────────────────────────
  getPerson(): Observable<any> {
    return this.http.get(`${this.base}/person`);
  }

  updatePerson(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.base}/person/admin/${id}`, payload, this.authHeader());
  }


  // ───────────────────────────────
  // 💼 EXPERIENCIA
  // ───────────────────────────────
  getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/experience`);
  }

  addExperience(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/experience/admin`, payload, this.authHeader());
  }

  updateExperience(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/experience/admin/${id}`, payload, this.authHeader());
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.base}/experience/admin/${id}`, this.authHeader());
  }

  // ───────────────────────────────
  // 🎓 EDUCACIÓN
  // ───────────────────────────────
  getEducation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/education`);
  }

  addEducation(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/education/admin`, payload, this.authHeader());
  }

  updateEducation(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/education/admin/${id}`, payload, this.authHeader());
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.base}/education/admin/${id}`, this.authHeader());
  }

  // ───────────────────────────────
  // 📚 CURSOS
  // ───────────────────────────────
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/courses`);
  }

  addCourse(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/courses/admin`, payload, this.authHeader());
  }

  updateCourse(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/courses/admin/${id}`, payload, this.authHeader());
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.base}/courses/admin/${id}`, this.authHeader());
  }

  // ───────────────────────────────
  // 🧠 SKILLS
  // ───────────────────────────────
  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/skills`);
  }

  addSkill(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/skills/admin`, payload, this.authHeader());
  }

  updateSkill(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/skills/admin/${id}`, payload, this.authHeader());
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${this.base}/skills/admin/${id}`, this.authHeader());
  }

  // ───────────────────────────────
  // 🔐 LOGIN
  // ───────────────────────────────
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, credentials);
  }
}
