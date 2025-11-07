import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>List Item</h2>
    </section>
  `,
  styles: [`
  `]
})
export class ListItemComponent {
}
