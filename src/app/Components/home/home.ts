import { Component } from '@angular/core';
import { Slider } from '../slider/slider';

@Component({
  selector: 'app-home',
  imports: [Slider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
