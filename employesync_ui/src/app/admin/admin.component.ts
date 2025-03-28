import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  selectedTab: string = 'users';
  users: any[] = [];
  organizations: any[] = [];

  // Modal controls and data holders
  showUserModal: boolean = false;
  showOrgModal: boolean = false;
  userModalTitle: string = '';
  orgModalTitle: string = '';
  currentUser: any = {};
  currentOrg: any = {};

  // Updated API endpoints with /api/v1 prefix
  private USERS_API = 'http://localhost:3000/api/v1/users';
  private ORGS_API = 'http://localhost:3000/api/v1/organization';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOrganizations();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  // USERS FUNCTIONS
  loadUsers(): void {
    this.http.get<any[]>(this.USERS_API).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  openCreateUserModal(): void {
    this.userModalTitle = 'Create User';
    this.currentUser = {};
    this.showUserModal = true;
  }

  openEditUserModal(user: any): void {
    this.userModalTitle = 'Edit User';
    this.currentUser = { ...user };
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
  }

  saveUser(): void {
    if (this.currentUser._id || this.currentUser.id) {
      // Update existing user
      this.http.put(`${this.USERS_API}/${this.currentUser._id || this.currentUser.id}`, this.currentUser).subscribe(
        () => {
          this.loadUsers();
          this.closeUserModal();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      // Create new user
      this.http.post(this.USERS_API, this.currentUser).subscribe(
        () => {
          this.loadUsers();
          this.closeUserModal();
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  deleteUser(userId: any): void {
    this.http.delete(`${this.USERS_API}/${userId}`).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // ORGANIZATIONS FUNCTIONS
  loadOrganizations(): void {
    this.http.get<any[]>(this.ORGS_API).subscribe(
      (data) => {
        this.organizations = data;
      },
      (error) => {
        console.error('Error loading organizations:', error);
      }
    );
  }

  openCreateOrganizationModal(): void {
    this.orgModalTitle = 'Create Organization';
    this.currentOrg = {};
    this.showOrgModal = true;
  }

  openEditOrganizationModal(org: any): void {
    this.orgModalTitle = 'Edit Organization';
    this.currentOrg = { ...org };
    this.showOrgModal = true;
  }

  closeOrgModal(): void {
    this.showOrgModal = false;
  }

  saveOrganization(): void {
    if (this.currentOrg._id || this.currentOrg.id) {
      // Update organization
      this.http.put(`${this.ORGS_API}/${this.currentOrg._id || this.currentOrg.id}`, this.currentOrg).subscribe(
        () => {
          this.loadOrganizations();
          this.closeOrgModal();
        },
        (error) => {
          console.error('Error updating organization:', error);
        }
      );
    } else {
      // Create organization
      this.http.post(this.ORGS_API, this.currentOrg).subscribe(
        () => {
          this.loadOrganizations();
          this.closeOrgModal();
        },
        (error) => {
          console.error('Error creating organization:', error);
        }
      );
    }
  }

  deleteOrganization(orgId: any): void {
    this.http.delete(`${this.ORGS_API}/${orgId}`).subscribe(
      () => {
        this.loadOrganizations();
      },
      (error) => {
        console.error('Error deleting organization:', error);
      }
    );
  }
}
