import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.auth.autorizar().subscribe({
      next: () => {
        this.router.navigateByUrl('/publicaciones');
      },
      error: () => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
