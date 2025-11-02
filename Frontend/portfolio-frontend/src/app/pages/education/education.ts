import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit {
  items: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getEducation().subscribe({
      next: (d: any[]) => this.items = d,
      error: (e) => console.error(e)
    });
  }
}
