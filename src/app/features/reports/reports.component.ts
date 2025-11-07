import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- <section class="reports">
      <h2>📈 Reports</h2>
      <p>Generate and view system reports.</p>

      <div class="report-card" *ngFor="let report of reports">
        <h3>{{ report.title }}</h3>
        <p>{{ report.description }}</p>
        <button (click)="viewReport(report)">View Report</button>
      </div>
    </section> -->
  `,
  styles: [`
    .reports { padding: 1rem; }
    .report-card {
      background: #f1f2f6;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    button {
      background: #00b894;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
    }
  `]
})
export class ReportsComponent {
  reports = [
    { title: 'User Activity', description: 'Summary of user login and actions.' },
    { title: 'System Logs', description: 'Logs of system operations and events.' },
    { title: 'Monthly Summary', description: 'Overview of data and usage trends.' },
  ];

  viewReport(report: any) {
    alert(`Opening: ${report.title}`);
  }
}
