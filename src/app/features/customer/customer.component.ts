import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` 
  <main class="content">
    <h2>รายการคนไข้</h2>

    <div class="tabs">
      <button [class.active]="selectedTab === 'list'">รายการคนไข้</button>
      <button [class.active]="selectedTab === 'history'">ประวัติการรักษา</button>
      <button [class.active]="selectedTab === 'payment'">เงินฝาก/โอน</button>
    </div>

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
          <td>{{ p.hn }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.phone }}</td>
          <td>{{ p.gender }}</td>
          <td>{{ p.age }}</td>
          <td>{{ p.lastVisit }}</td>
          <td>
            <span [class]="p.group.toLowerCase()">{{ p.group }}</span>
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
  selectedTab = 'list';
  search = '';
  gender = '';
  group = '';

  customer = [
    { hn: 'RK-122094223', name: 'วีรารัตน์ ธรรมวงศ์', phone: '098-285-6421', gender: 'หญิง', age: 26, lastVisit: '12/06/66', group: 'Contract' },
    { hn: 'RK-122094234', name: 'พรรณา ธาตรวงศ์', phone: '098-285-6421', gender: 'หญิง', age: 30, lastVisit: '12/06/66', group: 'Contract' },
    { hn: 'RK-122094255', name: 'นาณิสรา ภูผักดี', phone: '098-285-6421', gender: 'หญิง', age: 21, lastVisit: '12/06/66', group: 'ทั่วไป' },
    { hn: 'RK-122094290', name: 'กิตติภัณฑ์ ตรีทรัพย์', phone: '098-285-6421', gender: 'ชาย', age: 20, lastVisit: '12/06/66', group: 'VIP' },
    { hn: 'RK-122094200', name: 'นวพร ภูผักดี', phone: '098-285-6421', gender: 'หญิง', age: 58, lastVisit: '12/06/66', group: 'VIP' },
    { hn: 'RK-122094211', name: 'นภัสสร แสงดารา', phone: '098-285-6421', gender: 'หญิง', age: 42, lastVisit: '12/06/66', group: 'VIP' },
    { hn: 'RK-122094283', name: 'อัมณี กลิ่นเพชร', phone: '098-285-6421', gender: 'หญิง', age: 44, lastVisit: '12/06/66', group: 'Contract' },
    { hn: 'RK-122093575', name: 'ไสรยา เกียรตินวรลาภ', phone: '098-285-6421', gender: 'หญิง', age: 18, lastVisit: '12/06/66', group: 'Contract' },
    { hn: 'RK-122093595', name: 'พรทิพา วงศ์สวัสดิ์', phone: '098-285-6421', gender: 'หญิง', age: 30, lastVisit: '12/06/66', group: 'Contract' },
  ];
}
