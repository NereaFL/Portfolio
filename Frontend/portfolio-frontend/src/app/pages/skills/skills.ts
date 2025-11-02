import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

declare const bootstrap:any;

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.html'
})
export class Skills implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  skills:any[] = [];
  modalRef:any = null;
  form = { id: null as number|null, name:'', level:'MEDIUM' };

  ngOnInit(){ this.load(); }
  load(){ this.api.getSkills().subscribe({ next:d=> this.skills = d || [] }); }

  openCreate(){
    if (!this.auth.loggedIn()) return;
    this.form = {id:null, name:'', level:'MEDIUM'};
    this.openModal();
  }
  openEdit(s:any){
    if (!this.auth.loggedIn()) return;
    this.form = { id:s.id, name:s.name, level:s.level };
    this.openModal();
  }
  save(f:NgForm){
    if (f.invalid || !this.auth.loggedIn()) return;
    const payload = { name: this.form.name.trim(), level: this.form.level };
    const obs = this.form.id ? this.api.updateSkill(this.form.id, payload) : this.api.addSkill(payload);
    obs.subscribe({ next: ()=> { this.load(); this.modalRef?.hide(); } });
  }
  del(id:number){
    if (!this.auth.loggedIn()) return;
    if (confirm('¿Eliminar habilidad?')){
      this.api.deleteSkill(id).subscribe({ next: ()=> this.load() });
    }
  }
  openModal(){
    const el = document.getElementById('skillModal');
    this.modalRef = new bootstrap.Modal(el, {backdrop:'static'});
    this.modalRef.show();
  }
}
