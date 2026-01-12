import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Header } from './core/components/header/header';
import { Footer } from "./core/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('flowform');
}
