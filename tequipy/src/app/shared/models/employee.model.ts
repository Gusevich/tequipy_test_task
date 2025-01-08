import {Equipment} from './equipment.model';

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
}

export interface EmployeeData extends Employee {
  equipments: Equipment[];
}

export interface EmployeeView extends Employee {
  equipments: string;
}
