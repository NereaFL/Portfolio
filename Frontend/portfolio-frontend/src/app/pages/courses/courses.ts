import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

declare const bootstrap: any;

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

  courses: any[] = [];
  form = {
    id: null as number | null,
    name: '',
    institution: '',
    duration: '',
    description: '',
    diplomaPath: ''
  };
  selectedFile: File | null = null;
  modalRef: any = null;

  ngOnInit() {
    this.load();
  }

  // ───────────────────────────────
  // 📚 CARGAR CURSOS
  // ───────────────────────────────
  load() {
    this.api.getCourses().subscribe({
      next: d => {
        // ⚙️ Corrige las rutas de diploma
        this.courses = (d || []).map(c => ({
          ...c,
          diplomaPath: this.fixPath(c.diplomaPath)
        }));
      },
      error: e => console.error('Error cargando cursos', e)
    });
  }

  // 🧩 Corrige ruta de diploma para apuntar al backend
private fixPath(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  // ✅ Ahora los diplomas están servidos desde el backend
  if (path.startsWith('/diplomas/')) {
    return `http://localhost:8080${path}`;
  }
  return path;
}


  // ───────────────────────────────
  // 🟢 CREAR
  // ───────────────────────────────
  openCreate() {
    if (!this.auth.loggedIn()) return;
    this.form = { id: null, name: '', institution: '', duration: '', description: '', diplomaPath: '' };
    this.selectedFile = null;
    this.openModal();
  }

  // ───────────────────────────────
  // ✏️ EDITAR
  // ───────────────────────────────
  openEdit(c: any) {
    if (!this.auth.loggedIn()) return;
    this.form = {
      id: c.id,
      name: c.name,
      institution: c.institution,
      duration: c.duration,
      description: c.description,
      diplomaPath: c.diplomaPath || ''
    };
    this.selectedFile = null;
    this.openModal();
  }

  // ───────────────────────────────
  // 📤 GUARDAR (crear o editar)
  // ───────────────────────────────
  save(f: NgForm) {
    if (f.invalid || !this.auth.loggedIn()) return;

    const formData = new FormData();
    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            name: this.form.name.trim(),
            institution: this.form.institution.trim(),
            duration: this.form.duration.trim(),
            description: this.form.description.trim()
          })
        ],
        { type: 'application/json' }
      )
    );

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const obs = this.form.id
      ? this.api.updateCourse(this.form.id, formData)
      : this.api.addCourse(formData);

    obs.subscribe({
      next: () => {
        this.load();
        this.modalRef?.hide();
      },
      error: e => console.error('Error guardando curso', e)
    });
  }

  // ───────────────────────────────
  // 🗑️ ELIMINAR
  // ───────────────────────────────
  del(id: number) {
    if (!this.auth.loggedIn()) return;
    if (confirm('¿Eliminar curso?')) {
      this.api.deleteCourse(id).subscribe({
        next: () => this.load(),
        error: e => console.error('Error eliminando curso', e)
      });
    }
  }

  // ───────────────────────────────
  // 📁 SELECCIONAR ARCHIVO
  // ───────────────────────────────
  onFileSelected(event: any) {
    this.selectedFile = event.target.files?.[0] || null;
  }

  // ───────────────────────────────
  // 🔹 MODAL HELPERS
  // ───────────────────────────────
  private openModal() {
    const el = document.getElementById('courseModal');
    if (!el) return;
    this.modalRef = new bootstrap.Modal(el, { backdrop: 'static' });
    this.modalRef.show();
  }
}
