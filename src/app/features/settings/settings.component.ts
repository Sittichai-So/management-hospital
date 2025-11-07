import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- <section class="settings">
      <h2>⚙️ System Settings</h2>
      <p>Adjust preferences and configurations.</p>

      <div class="setting-item" *ngFor="let setting of settings">
        <label>
          <span>{{ setting.label }}</span>
          <input
            type="checkbox"
            [(ngModel)]="setting.enabled"
          />
        </label>
      </div>

      <button (click)="saveSettings()">Save Changes</button>
    </section> -->
  `,
  styles: [`
    .settings { padding: 1rem; }
    .setting-item {
      margin: 10px 0;
      background: #f5f6fa;
      padding: 8px;
      border-radius: 6px;
    }
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      margin-top: 1rem;
      background: #6c5ce7;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
  `]
})
export class SettingsComponent {
  settings = [
    { label: 'Enable Notifications', enabled: true },
    { label: 'Dark Mode', enabled: false },
    { label: 'Auto Backup', enabled: true },
  ];

  saveSettings() {
    alert('Settings saved!');
  }
}
