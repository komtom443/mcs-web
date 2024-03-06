export interface SignUpFormSchema {
  firstName?: string;
  lastName?: string;
  email: string;
  gender?: boolean;
  passwd: string;
  dob?: Date;
  hometown?: string;
  phone?: string;
}
