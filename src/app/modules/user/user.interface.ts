export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Owner' | 'Member';
  status: 'Active' | 'Inactive';
 
};
