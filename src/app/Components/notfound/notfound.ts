import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {}
