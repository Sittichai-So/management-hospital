import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="dashboard">
    <div class="header">
      <h2>ภาพรวมข้อมูลผู้ป่วยและรายได้</h2>
      <div class="toolbar">
      <select [(ngModel)]="selectedPeriod" (change)="onPeriodChange()">
        <option value="day">รายวัน</option>
        <option value="week">รายสัปดาห์</option>
        <option value="month">รายเดือน</option>
      </select>
      </div>
    </div>

    <div class="summary-cards">
      <div class="summary-card" style="background-color: #F6F7FB;color: #383838ff">
        <p>ลูกค้าใหม่</p>
        <h5 class="number">127</h5>
        <span class="trend up">▲ +12% จากเดือนก่อน</span>
      </div>
      <div class="summary-card" style="background-color: #235597;color: #fff">
        <p>จำนวนผู้ป่วยทั้งหมด</p>
        <h5 class="number">1,284</h5>
        <span class="trend up">▲ +12% จากเดือนก่อน</span>
      </div>
      <div class="summary-card" style="background-color: #C6C7F8;color: #383838ff">
        <p>รายได้รวม (บาท)</p>
        <h5 class="number">฿842,000</h5>
        <span class="trend up">▲ +8.3%</span>
      </div>
      <div class="summary-card" style="background-color: #BAEDBD;color: #383838ff">
        <p>แพทย์ในระบบ</p>
        <h5 class="number">42</h5>
        <span class="trend stable">— คงที่</span>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-box">
        <p>ยอดการรักษา</p>
        <canvas id="treatmentChart"></canvas>
      </div>

      <div class="chart-box">
        <p>การรักษายอดนิยม</p>
        <canvas id="popularTreatmentChart"></canvas>
      </div>

      <div class="chart-box">
        <p>ช่องทางการขาย</p>
        <canvas id="salesChannelChart"></canvas>
      </div>

      <div class="chart-box wide">
        <p>รายได้แยกตามประเภทผู้ป่วย</p>
        <canvas id="revenueChart"></canvas>
      </div>

      <div class="chart-box">
        <p>สัดส่วนรายได้</p>
        <canvas id="incomePieChart"></canvas>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      font-family: "Segoe UI", sans-serif;
      background: #f9fafc;
      min-height: 100vh;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .summary-card {
      padding: 1.5rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s ease;
    }
    .summary-card:hover {
      transform: translateY(-5px);
    }
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 1.5rem;
    }
    .chart-box {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .chart-box p {
      font-size: 16px;
      margin-bottom: 1rem;
      text-align: center;
      color: #333;
    }
    .chart-box.wide {
      grid-column: span 2;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    input, select {
      padding: 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.9rem;
      background: #fff;
    }
  `]
})
export class DashboardComponent implements OnInit {
  selectedPeriod: string = 'month';
  revenueChart!: Chart;
  treatmentChart!: Chart;
  popularTreatmentChart!: Chart;
  incomePieChart!: Chart;
  salesChannelChart!: Chart;

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts() {
    this.createRevenueChart();
    this.createTreatmentChart();
    this.createPopularTreatmentChart();
    this.createSalesChannelChart();
    this.createIncomePieChart();
  }

  onPeriodChange() {
    this.updateAllCharts();
  }

  updateAllCharts() {
    this.revenueChart.data = this.getRevenueData(this.selectedPeriod);
    this.treatmentChart.data = this.getTreatmentData(this.selectedPeriod);
    this.popularTreatmentChart.data = this.getPopularTreatmentData(this.selectedPeriod);
    this.salesChannelChart.data = this.getSalesChannelData(this.selectedPeriod);
    this.incomePieChart.data = this.getIncomePieData(this.selectedPeriod);

    this.revenueChart.update();
    this.treatmentChart.update();
    this.popularTreatmentChart.update();
    this.salesChannelChart.update();
    this.incomePieChart.update();
  }

  createRevenueChart() {
    this.revenueChart = new Chart('revenueChart', {
      type: 'line',
      data: this.getRevenueData(this.selectedPeriod),
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  getRevenueData(period: string) {
    let labels: string[], inpatientData: number[], outpatientData: number[];

    switch (period) {
      case 'day':
        labels = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
        inpatientData = [12000, 14500, 13100, 14200, 15500, 13900, 14800];
        outpatientData = [9000, 10000, 9500, 10200, 11000, 9700, 10300];
        break;

      case 'week':
        labels = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4'];
        inpatientData = [72000, 75500, 80100, 82500];
        outpatientData = [52000, 54000, 56000, 58000];
        break;

      case 'month':
      default:
        labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'];
        inpatientData = [320000, 340000, 355000, 372000, 388000, 401000];
        outpatientData = [260000, 270000, 280000, 290000, 305000, 318000];
        break;
    }

    return {
      labels,
      datasets: [
        { label: 'ผู้ป่วยใน (Inpatient)', data: inpatientData, borderColor: '#3b82f6', fill: false },
        { label: 'ผู้ป่วยนอก (Outpatient)', data: outpatientData, borderColor: '#22c55e', fill: false }
      ]
    };
  }

  createTreatmentChart() {
    this.treatmentChart = new Chart('treatmentChart', {
      type: 'bar',
      data: this.getTreatmentData(this.selectedPeriod),
      options: { indexAxis: 'y', scales: { x: { beginAtZero: true } } }
    });
  }

  getTreatmentData(period: string) {
    let data: number[];
    switch (period) {
      case 'day': data = [70, 50, 40, 60, 30]; break;
      case 'week': data = [300, 250, 210, 270, 180]; break;
      case 'month':
      default: data = [486, 328, 249, 390, 123]; break;
    }

    return {
      labels: ['ศัลยกรรม', 'ตรวจทั่วไป', 'กายภาพ', 'ทันตกรรม', 'ฉุกเฉิน'],
      datasets: [{ label: 'ยอดการรักษา', data, backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ef4444'] }]
    };
  }

  createPopularTreatmentChart() {
    this.popularTreatmentChart = new Chart('popularTreatmentChart', {
      type: 'bar',
      data: this.getPopularTreatmentData(this.selectedPeriod),
      options: { indexAxis: 'y', scales: { x: { beginAtZero: true } } }
    });
  }

  getPopularTreatmentData(period: string) {
    let data: number[];
    switch (period) {
      case 'day': data = [18, 14, 10, 8, 6]; break;
      case 'week': data = [80, 70, 65, 55, 40]; break;
      case 'month':
      default: data = [120, 98, 87, 76, 54]; break;
    }

    return {
      labels: ['แพทย์ A', 'แพทย์ B', 'แพทย์ C', 'แพทย์ D', 'แพทย์ E'],
      datasets: [{ label: 'จำนวนผู้รับการรักษา', data, backgroundColor: '#60a5fa' }]
    };
  }

  createSalesChannelChart() {
    this.salesChannelChart = new Chart('salesChannelChart', {
      type: 'bar',
      data: this.getSalesChannelData(this.selectedPeriod),
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  getSalesChannelData(period: string) {
    let labels: string[], online: number[], offline: number[];

    switch (period) {
      case 'day':
        labels = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
        online = [200, 250, 230, 280, 300, 270, 310];
        offline = [180, 190, 210, 220, 240, 230, 250];
        break;

      case 'week':
        labels = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4'];
        online = [1400, 1550, 1600, 1720];
        offline = [1200, 1300, 1400, 1450];
        break;

      case 'month':
      default:
        labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'];
        online = [6200, 6400, 6600, 7000, 7200, 7400];
        offline = [5500, 5600, 5800, 6000, 6200, 6500];
        break;
    }

    return {
      labels,
      datasets: [
        { label: 'ออนไลน์', data: online, backgroundColor: '#3b82f6' },
        { label: 'หน้าร้าน', data: offline, backgroundColor: '#22c55e' }
      ]
    };
  }

  createIncomePieChart() {
    this.incomePieChart = new Chart('incomePieChart', {
      type: 'doughnut',
      data: this.getIncomePieData(this.selectedPeriod),
      options: { plugins: { legend: { position: 'bottom' } } }
    });
  }

  getIncomePieData(period: string) {
    let data: number[];
    switch (period) {
      case 'day': data = [50, 30, 15, 5]; break;
      case 'week': data = [48, 32, 14, 6]; break;
      case 'month':
      default: data = [45, 35, 15, 5]; break;
    }

    return {
      labels: ['ผู้ป่วยใน', 'ผู้ป่วยนอก', 'แพทย์เฉพาะทาง', 'อื่นๆ'],
      datasets: [{ data, backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#a855f7'] }]
    };
  }
}
