import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

declare const bootstrap:any;

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  courses:any[] = [];
  form = { id: null as number|null, name:'', institution:'', duration:'', diplomaPath:'', description:'' };
  modalRef:any = null;

  ngOnInit(){ this.load(); }

  load(){
    this.api.getCourses().subscribe({
      next: d => this.courses = d || [],
      error: e => console.error('Error cargando cursos', e)
    });
  }

  openCreate(){
    if(!this.auth.loggedIn()) return;
    this.form = { id:null, name:'', institution:'', duration:'', diplomaPath:'', description:'' };
    this.openModal();
  }

  openEdit(c:any){
    if(!this.auth.loggedIn()) return;
    this.form = { id:c.id, name:c.name, institution:c.institution, duration:c.duration, diplomaPath:c.diplomaPath, description:c.description };
    this.openModal();
  }

  save(f:NgForm){
    if(f.invalid || !this.auth.loggedIn()) return;
    const payload = { name:this.form.name.trim(), institution:this.form.institution.trim(), duration:this.form.duration.trim(), diplomaPath:this.form.diplomaPath.trim(), description:this.form.description.trim() };
    const obs = this.form.id ? this.api.updateCourse(this.form.id, payload) : this.api.addCourse(payload);
    obs.subscribe({
      next: _ => { this.load(); this.modalRef?.hide(); },
      error: e => console.error('Error guardando curso', e)
    });
  }

  del(id:number){
    if(!this.auth.loggedIn()) return;
    if(confirm('¿Eliminar curso?')){
      this.api.deleteCourse(id).subscribe({
        next: _ => this.load(),
        error: e => console.error('Error eliminando curso', e)
      });
    }
  }

  private openModal(){
    const el = document.getElementById('courseModal');
    this.modalRef = new bootstrap.Modal(el, { backdrop:'static' });
    this.modalRef.show();
  }
}
