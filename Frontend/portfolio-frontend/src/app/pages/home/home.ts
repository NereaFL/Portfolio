import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  person: any = null;
  education: any[] = [];

  // ====== MODAL EDUCACIÓN ======
  modalRef: any = null;
  isEditingEdu = false;  // <- clave: nombre correcto y consistente
  eduForm = {
    id: null as number | null,
    title: '',
    institution: '',
    startYear: null as number | null,
    endYear: null as number | null,
    type: '',
    notes: ''
  };

  // ====== MODAL PERSONA ======
  modalPersonRef: any = null;
  personForm = {
    id: null as number | null,
    fullName: '',
    title: '',
    aboutMe: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: ''
  };

  ngOnInit(): void {
    this.loadPerson();
    this.loadEducation();
  }

  // ---------- PERSON ----------
  loadPerson() {
    this.api.getPerson().subscribe({
      next: (d) => {
        this.person = Array.isArray(d) ? d[0] : d;
        this.personForm = {
          id: this.person?.id ?? null,
          fullName: this.person?.fullName ?? '',
          title: this.person?.title ?? '',
          aboutMe: this.person?.aboutMe ?? '',
          email: this.person?.email ?? '',
          phone: this.person?.phone ?? '',
          location: this.person?.location ?? '',
          linkedin: this.person?.linkedin ?? '',
          github: this.person?.github ?? ''
        };
      },
      error: (e) => console.error('Error cargando persona', e.status, e.message, e.error)
    });
  }

  openEditPerson() {
    if (!this.auth.loggedIn()) return;
    const el = document.getElementById('personModal');
    if (!el) return;
    this.modalPersonRef = new bootstrap.Modal(el, { backdrop: 'static' });
    this.modalPersonRef.show();
  }

  savePerson(f: NgForm) {
    if (!this.auth.loggedIn() || f.invalid || !this.personForm.id) return;

    const payload = {
      fullName: this.personForm.fullName.trim(),
      title: this.personForm.title.trim(),
      aboutMe: this.personForm.aboutMe.trim(),
      email: this.personForm.email.trim(),
      phone: this.personForm.phone.trim(),
      location: this.personForm.location.trim(),
      linkedin: this.personForm.linkedin.trim(),
      github: this.personForm.github.trim()
    };

    this.api.updatePerson(this.personForm.id).subscribe({
      next: (res) => {
        this.person = res;
        this.modalPersonRef?.hide();
      },
      error: (e) => console.error('Error actualizando persona', e.status, e.message, e.error)
    });
  }

  // ---------- EDUCATION ----------
  loadEducation() {
    this.api.getEducation().subscribe({
      next: (d) => this.education = d || [],
      error: (e) => console.error('Error cargando educación', e.status, e.message, e.error)
    });
  }

  openCreateEdu() {
    if (!this.auth.loggedIn()) return;
    this.isEditingEdu = false;
    this.eduForm = { id: null, title: '', institution: '', startYear: null, endYear: null, type: '', notes: '' };
    this.openEduModal();
  }

  openEditEdu(ed: any) {
    if (!this.auth.loggedIn()) return;
    this.isEditingEdu = true;
    this.eduForm = {
      id: ed.id ?? null,
      title: ed.title ?? '',
      institution: ed.institution ?? '',
      startYear: ed.startYear ?? null,
      endYear: ed.endYear ?? null,
      type: ed.type ?? '',
      notes: ed.notes ?? ''
    };
    this.openEduModal();
  }

  saveEdu(form: NgForm) {
    if (!form.valid || !this.auth.loggedIn()) return;

    const payload = {
      title: this.eduForm.title.trim(),
      institution: this.eduForm.institution.trim(),
      startYear: this.eduForm.startYear,
      endYear: this.eduForm.endYear,
      type: this.eduForm.type.trim(),
      notes: (this.eduForm.notes || '').trim()
    };

    if (this.isEditingEdu && this.eduForm.id != null) {
      this.api.updateEducation(this.eduForm.id, payload).subscribe({
        next: (res) => {
          this.education = this.education.map(e => e.id === this.eduForm.id ? res : e);
          this.modalRef?.hide();
        },
        error: (e) => console.error('Error actualizando educación', e.status, e.message, e.error)
      });
    } else {
      this.api.addEducation(payload).subscribe({
        next: (res) => {
          this.education = [res, ...this.education];
          this.modalRef?.hide();
        },
        error: (e) => console.error('Error creando educación', e.status, e.message, e.error)
      });
    }
  }

  deleteEdu(id: number) {
    if (!this.auth.loggedIn()) return;
    if (confirm('¿Eliminar este registro de educación?')) {
      this.api.deleteEducation(id).subscribe({
        next: () => this.education = this.education.filter(e => e.id !== id),
        error: (e) => console.error('Error eliminando educación', e.status, e.message, e.error)
      });
    }
  }

  // ---------- HELPERS MODALES ----------
  openEduModal() {
    const el = document.getElementById('eduModal');
    if (!el) return;
    this.modalRef = new bootstrap.Modal(el, { backdrop: 'static' });
    this.modalRef.show();
  }

  closeModal() {
    this.modalRef?.hide();
    this.modalPersonRef?.hide();
  }
}
