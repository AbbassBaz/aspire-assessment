export interface User {
  uid: string;
  email: string;
  invitedBy?: string;
  createdAt: string;
}

export interface InvitedUser {
  email: string;
  invitedAt: string;
  hasSignedUp: boolean;
  uid?: string;
}