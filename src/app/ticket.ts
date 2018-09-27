export interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  agentid: number;
  departmentid: number;
  source: string;
  priority: string;
  status: number;
  sla: number;
  createdOn: Date;
  createdBy: string;
  updatedOn: Date;
  updatedBy: string;
  userid: number;
  customerId: number;
  comment: Comment[];
}

export interface Comment {
  commentId: number;
  comment: string;
  createdOn: Date;
  createdBy: string;
  updatedOn: Date;
  updatedBy: string;
}

export interface TicketDetailsModal {
  name: string;
  id: number;
  status: number;
  comment: Comment[];
  priority: string;
  subject: string;
  description: string;
  userid: number;
  connectionid: string;
  email:string;
  agentname: string;
}

