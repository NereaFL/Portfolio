import { Component, AfterViewInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements AfterViewInit {
  auth = inject(AuthService);

  ngAfterViewInit(): void {
    // 🔹 Inicializa manualmente los dropdowns
    const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdowns.forEach(dd => new bootstrap.Dropdown(dd));

    // 🔹 Inicializa el collapse (menú hamburguesa)
    const navbarCollapse = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    if (!navbarCollapse || !toggler) return;

    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    // 🔸 Al hacer clic en el toggler:
    toggler.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide(); // si está abierto, se cierra
      } else {
        bsCollapse.show(); // si está cerrado, se abre
      }
    });

    // 🔸 Cierra el menú automáticamente al pulsar un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  logout() {
    this.auth.clear();
    window.location.href = '/';
  }
}
