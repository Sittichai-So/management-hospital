import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <header class="dashboard-header">
        <h1>🏥 Hospital Management Dashboard</h1>
        <p>สรุปข้อมูลระบบบริหารจัดการประจำเดือน</p>
      </header>

      <div class="summary-cards">
        <div class="summary-card">
          <h3>จำนวนผู้ป่วยทั้งหมด</h3>
          <p class="number">1,284</p>
          <span class="trend up">▲ +12% จากเดือนก่อน</span>
        </div>
        <div class="summary-card">
          <h3>รายได้รวม (บาท)</h3>
          <p class="number">฿842,000</p>
          <span class="trend up">▲ +8.3%</span>
        </div>
        <div class="summary-card">
          <h3>แพทย์ในระบบ</h3>
          <p class="number">42</p>
          <span class="trend stable">— คงที่</span>
        </div>
        <div class="summary-card">
          <h3>อัตราครองเตียง</h3>
          <p class="number">76%</p>
          <span class="trend down">▼ -3%</span>
        </div>
      </div>

      <div class="chart-grid">
        <div class="chart-card">
          <h3>จำนวนผู้ป่วยรายเดือน</h3>
          <canvas id="patientsPerMonth"></canvas>
        </div>

        <div class="chart-card">
          <h3>รายได้รวมต่อเดือน</h3>
          <canvas id="revenueTrend"></canvas>
        </div>

        <div class="chart-card">
          <h3>สัดส่วนผู้ป่วยตามเพศ</h3>
          <canvas id="genderRatio"></canvas>
        </div>

        <div class="chart-card">
          <h3>แผนกยอดนิยม</h3>
          <canvas id="departmentUsage"></canvas>
        </div>
      </div>

      <div class="table-section">
        <h3>รายการผู้ป่วยล่าสุด</h3>
        <table>
          <thead style="background-color: rgba(0, 0, 0, 0.2) !important;">
            <tr>
              <th>รหัส</th>
              <th>ชื่อ-สกุล</th>
              <th>เพศ</th>
              <th>อายุ</th>
              <th>แผนก</th>
              <th>วันที่เข้ารับบริการ</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let patient of recentPatients">
              <td>{{ patient.id }}</td>
              <td>{{ patient.name }}</td>
              <td>{{ patient.gender }}</td>
              <td>{{ patient.age }}</td>
              <td>{{ patient.department }}</td>
              <td>{{ patient.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      font-family: 'Segoe UI', sans-serif;
      background: #f4f6f9;
      color: #333;
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-weight: 600;
      margin-bottom: 0.3rem;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    .summary-card {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    .summary-card h3 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .summary-card .number {
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .trend {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .trend.up { color: #28a745; }
    .trend.down { color: #dc3545; }
    .trend.stable { color: #6c757d; }

    .chart-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .chart-card {
      background: #fff;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .chart-card h3 {
      text-align: center;
      margin-bottom: 0.8rem;
      color: #555;
    }

    .table-section {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th, td {
      padding: 0.75rem;
      text-align: center;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #555;
    }

    tr:hover {
      background-color: #f1f3f5;
    }
  `]
})
export class DashboardComponent implements OnInit {
  recentPatients = [
    { id: 'P001', name: 'สมชาย ใจดี', gender: 'ชาย', age: 34, department: 'อายุรกรรม', date: '2025-11-05' },
    { id: 'P002', name: 'วิไลพร ศรีสุข', gender: 'หญิง', age: 28, department: 'สูติกรรม', date: '2025-11-05' },
    { id: 'P003', name: 'อดิศร มณีโชติ', gender: 'ชาย', age: 41, department: 'ศัลยกรรม', date: '2025-11-04' },
    { id: 'P004', name: 'พัชรี คงคา', gender: 'หญิง', age: 36, department: 'กุมารเวช', date: '2025-11-03' },
    { id: 'P005', name: 'จักรพงศ์ ทองดี', gender: 'ชาย', age: 52, department: 'อายุรกรรม', date: '2025-11-02' },
  ];

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts() {
    new Chart('patientsPerMonth', {
      type: 'bar',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.'],
        datasets: [{
          label: 'จำนวนผู้ป่วย',
          data: [320, 400, 380, 460, 510, 620, 580],
          backgroundColor: '#007bff'
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    new Chart('revenueTrend', {
      type: 'line',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.'],
        datasets: [{
          label: 'รายได้ (บาท)',
          data: [420000, 510000, 480000, 530000, 590000, 670000, 640000],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40,167,69,0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    new Chart('genderRatio', {
      type: 'pie',
      data: {
        labels: ['ชาย', 'หญิง', 'อื่น ๆ'],
        datasets: [{
          data: [45, 50, 5],
          backgroundColor: ['#007bff', '#ff6384', '#ffcd56']
        }]
      },
      options: { responsive: true }
    });

    new Chart('departmentUsage', {
      type: 'doughnut',
      data: {
        labels: ['อายุรกรรม', 'กุมารเวช', 'ศัลยกรรม', 'สูติกรรม', 'ทันตกรรม'],
        datasets: [{
          data: [35, 20, 18, 15, 12],
          backgroundColor: ['#36a2eb', '#ff9f40', '#4bc0c0', '#9966ff', '#ff6384']
        }]
      },
      options: { responsive: true }
    });
  }
}
