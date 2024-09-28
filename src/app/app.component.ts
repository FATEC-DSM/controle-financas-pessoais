import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTesteComponent } from "./components/component-teste/component-teste.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentTesteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'controle-financas-pessoais';
}
