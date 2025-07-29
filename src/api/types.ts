export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  schoolName: string;
  email: string;
  password: string;
}

export type AdminProfile = {
  name: string;
  schoolName: string;
  email: string;
};

export interface LoginResponse {
  token: string;
  message: string;
}

export interface IRouteStop {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  order: number;
}

export interface IBus {
  _id: string;
  name: string;
  busNumber: string;
  capacity: number;
  driverId: string;
  assignedDriver?: {
    _id: string;
    name: string;
    phone?: string;
  };
}

export interface IDriver {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}


export interface IRoute {
  _id: string;
  name: string;
  stops: IRouteStop[];
  busId?: IBus | string;
}

export interface CreateRouteData {
  name: string;
  stops: IRouteStop[];
}

export interface UpdateRouteData extends CreateRouteData {
  busId?: string;
}

export interface AssignBusData {
  busId: string;
}

export interface IStudent {
  _id: string;
  name: string;
  class: number;
  routeId: string;
  parentName: string;
  parentPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateStudentData {
  name: string;
  class: number;
  routeId: string;
  parentName: string;
  parentPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
}