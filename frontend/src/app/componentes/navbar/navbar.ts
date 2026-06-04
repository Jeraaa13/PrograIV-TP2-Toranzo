import { Component, Host } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  dropdownAbierto = signal(false);

  toggleDropdown() {
    this.dropdownAbierto.update((v) => !v);
  }
}
