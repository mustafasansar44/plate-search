import { BaseEntity } from './BaseEntity';
import { Plate } from './Plate';
import { PlateComment } from './PlateComment';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  tcno: string;
  phoneCode: string;
  phone: string;
  role?: string;
}