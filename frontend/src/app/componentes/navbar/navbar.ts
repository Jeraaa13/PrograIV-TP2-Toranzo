import { Component, Host, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { signal } from '@angular/core';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(Auth);
  dropdownAbierto = signal(false);

  toggleDropdown() {
    this.dropdownAbierto.update((v) => !v);
  }
}
