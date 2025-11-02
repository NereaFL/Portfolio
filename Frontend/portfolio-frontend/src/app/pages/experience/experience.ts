import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

declare const bootstrap:any;

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  experiences:any[] = [];
  form = { id: null as number|null, jobTitle:'', company:'', startDate:'', endDate:'', description:'' };
  modalRef:any = null;

  ngOnInit(){ this.load(); }

  load(){
    this.api.getExperience().subscribe({
      next: d => this.experiences = d || [],
      error: e => console.error('Error cargando experiencias', e)
    });
  }

  openCreate(){
    if(!this.auth.loggedIn()) return;
    this.form = { id:null, jobTitle:'', company:'', startDate:'', endDate:'', description:'' };
    this.openModal();
  }

  openEdit(x:any){
    if(!this.auth.loggedIn()) return;
    this.form = { id:x.id, jobTitle:x.jobTitle, company:x.company, startDate:x.startDate, endDate:x.endDate, description:x.description };
    this.openModal();
  }

  save(f:NgForm){
    if(f.invalid || !this.auth.loggedIn()) return;
    const payload = { jobTitle:this.form.jobTitle.trim(), company:this.form.company.trim(), startDate:this.form.startDate.trim(), endDate:this.form.endDate.trim(), description:this.form.description.trim() };
    const obs = this.form.id ? this.api.updateExperience(this.form.id, payload) : this.api.addExperience(payload);
    obs.subscribe({
      next: _ => { this.load(); this.modalRef?.hide(); },
      error: e => console.error('Error guardando experiencia', e)
    });
  }

  del(id:number){
    if(!this.auth.loggedIn()) return;
    if(confirm('¿Eliminar experiencia?')){
      this.api.deleteExperience(id).subscribe({
        next: _ => this.load(),
        error: e => console.error('Error eliminando experiencia', e)
      });
    }
  }

  private openModal(){
    const el = document.getElementById('experienceModal');
    this.modalRef = new bootstrap.Modal(el, { backdrop:'static' });
    this.modalRef.show();
  }
}
