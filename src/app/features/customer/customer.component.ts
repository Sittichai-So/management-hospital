import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../features/customer/models/customer.model'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../../shared/services/api-request.service';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` 
  <main class="content">
    <h2>รายการคนไข้</h2>
    <div class="toolbar">
      <input type="text" placeholder="ค้นหา HN, ชื่อ, เบอร์โทร" [(ngModel)]="search">
      <select [(ngModel)]="gender">
        <option value="">เพศ</option>
        <option>ชาย</option>
        <option>หญิง</option>
      </select>
      <select [(ngModel)]="group">
        <option value="">กลุ่มลูกค้า</option>
        <option>ทั่วไป</option>
        <option>VIP</option>
        <option>Contract</option>
      </select>

      <div class="actions">
        <button class="icon">🖨️</button>
        <button class="add">+ เพิ่มคนไข้</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>HN</th>
          <th>ชื่อ-นามสกุล</th>
          <th>เบอร์โทรศัพท์</th>
          <th>เพศ</th>
          <th>อายุ</th>
          <th>วันที่ทำการรักษาล่าสุด</th>
          <th>กลุ่มลูกค้า</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of customer">
          <td>{{ p.HN }}</td>
          <td>{{ p.FirstName }} {{ p.LastName }}</td>
          <td>{{ p.PhoneNumber }}</td>
          <td>{{ p.Gender }}</td>
          <td>{{ p.Birthdate }}</td>
          <td>
            <span [class]="p.ContactType.toLowerCase()">{{ p.ContactType }}</span>
          </td>
          <td>⋮</td>
        </tr>
      </tbody>
    </table>
  </main>


  `,
  styles: `
.page-container {
  display: flex;
  height: 100vh;
  background: #f4f6fb;
  color: #1f2937;
  font-family: 'Segoe UI', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #1e293b;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.user-info h4 {
  margin: 0;
  font-size: 1rem;
}

.user-info p {
  margin: 0;
  font-size: 0.8rem;
  color: #a1a1aa;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.menu li.active, .menu li:hover {
  background: #2563eb;
}

/* Main content */
.content {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
}

h2 {
  margin-top: 0;
  color: #1e293b;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tabs button {
  border: none;
  background: #e2e8f0;
  color: #334155;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.tabs button.active {
  background: #2563eb;
  color: #fff;
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

.actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

button.icon {
  background: #e2e8f0;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
}

button.add {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

thead {
  background: #2563eb;
  color: #fff;
}

tr:nth-child(even) {
  background: #f9fafb;
}

.contract {
  color: #22c55e;
  background: #dcfce7;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
}

.vip {
  color: #8b5cf6;
  background: #ede9fe;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
}

.ทั่วไป {
  color: #0ea5e9;
  background: #e0f2fe;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
}

  `
})
export class CustomerComponent {
  constructor(
    private readonly reqService: ApiRequestService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.loadCustomers();
  }

  search = '';
  gender = '';
  group = '';
  customer: Customer[] = [];

  loadCustomers() {
    this.getAllCustomers().subscribe({
      next: (res) => {
        this.customer = res;
        console.log('✅ Loaded customers:', res);
      },
      error: (err) => {
        console.error('❌ Error loading customers:', err);
        alert('ไม่สามารถโหลดข้อมูลลูกค้าได้');
      }
    });
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/v1/customer/');
  }
}
