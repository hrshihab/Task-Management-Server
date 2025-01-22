export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Owner' | 'Member';
  status: 'Active' | 'Inactive';
  
 
};

export type TUserRole = 'Admin' | 'Owner' | 'Member';
export type TUserStatus = 'Active' | 'Inactive';
