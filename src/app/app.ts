import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
}
