
export interface Student {
  id: string;
  name: string;
  course: string;
  batch: string;
  college: string;
  balance: number;
  rollNo: string;
  imageUrl: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  aiSummary?: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  category: 'Canteen' | 'Library' | 'Fees' | 'Other';
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  CARD = 'card',
  WALLET = 'wallet',
  VAULT = 'vault',
  AI_ASSISTANT = 'ai-assistant',
  TECH_DOCS = 'tech-docs'
}
