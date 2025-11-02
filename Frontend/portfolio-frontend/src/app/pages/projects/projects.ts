import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html'
})
export class Projects {
  projects: any[] = []; // vacío de momento

  // Si quieres, puedes simular un loading:
  // ngOnInit(){ setTimeout(()=> this.projects = [], 300); }
}
