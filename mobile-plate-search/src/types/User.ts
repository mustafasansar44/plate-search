import { BaseEntity } from './BaseEntity';
import { Plate } from './Plate';
import { PlateComment } from './PlateComment';

export interface User extends BaseEntity {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  tcno: string;
  phone_code: string;
  phone: string;
  role?: string;
}