import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <header>
        <h2>👥 User Management</h2>
        <p>จัดการข้อมูลผู้ใช้งานและสิทธิ์การเข้าถึง</p>
      </header>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อผู้ใช้</th>
              <th>อีเมล</th>
              <th>สิทธิ์</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users; let i = index">
              <td>{{ i + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span [ngClass]="{
                  'role-admin': user.role === 'Admin',
                  'role-editor': user.role === 'Editor',
                  'role-viewer': user.role === 'Viewer'
                }">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <button class="edit" (click)="editUser(user)">แก้ไข</button>
                <button class="delete" (click)="deleteUser(user)">ลบ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .users {
      padding: 1.5rem 2rem;
      font-family: 'Segoe UI', sans-serif;
    }

    header {
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      color: #2d3436;
    }

    p {
      margin: 0.25rem 0 1rem;
      color: #636e72;
      font-size: 0.9rem;
    }

    .table-wrapper {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #f1f2f6;
      font-size: 0.95rem;
    }

    th {
      background-color: #f5f6fa;
      color: #2d3436;
      font-weight: 600;
    }

    tr:hover {
      background: #f9f9f9;
    }

    button {
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
      padding: 6px 12px;
      transition: 0.2s;
    }

    button.edit {
      background: #0984e3;
      color: #fff;
      margin-right: 6px;
    }

    button.edit:hover {
      background: #74b9ff;
    }

    button.delete {
      background: #d63031;
      color: #fff;
    }

    button.delete:hover {
      background: #ff7675;
    }

    .role-admin {
      background: #dfe6e9;
      color: #2d3436;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
    }

    .role-editor {
      background: #a29bfe;
      color: #fff;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
    }

    .role-viewer {
      background: #55efc4;
      color: #2d3436;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
    }
  `]
})
export class UsersComponent {
  users = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
    { name: 'Charlie', email: 'charlie@example.com', role: 'Viewer' },
    { name: 'David', email: 'david@example.com', role: 'Viewer' },
    { name: 'Eve', email: 'eve@example.com', role: 'Editor' },
  ];

  editUser(user: any) {
    alert(`📝 กำลังแก้ไขข้อมูลของ: ${user.name}`);
  }

  deleteUser(user: any) {
    const confirmed = confirm(`⚠️ ต้องการลบผู้ใช้ ${user.name} หรือไม่?`);
    if (confirmed) {
      this.users = this.users.filter(u => u !== user);
      alert(`✅ ลบ ${user.name} เรียบร้อยแล้ว`);
    }
  }
}
