export interface Agent {
  agentId: number;
  name: string;
  department: Department;
  organisation: Customer;
  profileImageUrl: string;
}

export interface Department {
  departmentId: number;
  department: string;
}

export interface Customer {
  customerId: number;
  name: string;
  email: string;
}
