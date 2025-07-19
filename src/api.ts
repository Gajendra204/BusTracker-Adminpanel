// import axios from "axios";

// //const API_BASE_URL = "https://api-bus-tracker.onrender.com/api";
// export const API_BASE_URL = "http://localhost:5000/api";

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("busTrackerAdminToken");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export interface LoginData {
//   email: string;
//   password: string;
// }

// export interface RegisterData {
//   name: string;
//   schoolName: string;
//   email: string;
//   password: string;
// }

// export type AdminProfile = {
//   name: string;
//   schoolName: string;
//   email: string;
// };

// interface LoginResponse {
//   token: string;
//   message: string;
// }

// export interface IRouteStop {
//   name: string;
//   location: {
//     lat: number;
//     lng: number;
//   };
//   order: number;
// }

// interface IBus {
//   _id: string;
//   name: string;
//   busNumber: string;
// }

// export interface IRoute {
//   _id: string;
//   name: string;
//   stops: IRouteStop[];
//    busId?: IBus | string;
// }

// export interface CreateRouteData {
//   name: string;
//   stops: IRouteStop[];
// }

// export interface UpdateRouteData extends CreateRouteData {
//   busId?: string;
// }

// export interface AssignBusData {
//   busId: string;
// }

// export const loginAdmin = async (data: LoginData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, data);
//     const token = response.data.data.token;    
//     localStorage.setItem("busTrackerAdminToken", token); 
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// export const registerAdmin = async (data: RegisterData) => {
//   const response = await axios.post(`${API_BASE_URL}/auth/admin/register`, data);
//   return response.data; 
// };


// // Bus API's
// export const getAllBuses = async () => {
//   const response = await axios.get(`${API_BASE_URL}/buses`);
//   return response.data;
// };

// export const createBus = async (data: any) => {
//   const response = await axios.post(`${API_BASE_URL}/buses/create-bus`, data);
//   return response.data;
// };

// export const assignDriverToBus = async (data: any) => {
//   const response = await axios.patch(`${API_BASE_URL}/buses/assign-driver`, data);
//   return response.data;
// };

// // Driver API's
// export const getAllDrivers = async () => {
//   const response = await axios.get(`${API_BASE_URL}/driver`);
//   return response.data;
// };

// export const createDriver = async (data: any) => {
//   const response = await axios.post(`${API_BASE_URL}/driver/create`, data);
//   return response.data;
// };


// // ROUTES API's
// // Get all routes
// export const getAllRoutes = async (): Promise<{ data: IRoute[] }> => {
//   const response = await axios.get(`${API_BASE_URL}/routes`);
//   return response.data;
// };

// // Get single route by ID
// export const getRouteById = async (id: string): Promise<{ data: IRoute }> => {
//   const response = await axios.get(`${API_BASE_URL}/routes/${id}`);
//   return response.data;
// };

// // Create new route
// export const createRoute = async (data: CreateRouteData): Promise<{ data: IRoute }> => {
//   const response = await axios.post(`${API_BASE_URL}/routes`, data);
//   return response.data;
// };

// // Update existing route
// export const updateRoute = async (id: string, data: UpdateRouteData): Promise<{ data: IRoute }> => {
//   const response = await axios.put(`${API_BASE_URL}/routes/${id}`, data);
//   return response.data;
// };

// // Delete route
// export const deleteRoute = async (id: string): Promise<{ message: string }> => {
//   const response = await axios.delete(`${API_BASE_URL}/routes/${id}`);
//   return response.data;
// };

// // Assign bus to route
// export const assignBusToRoute = async (routeId: string, data: AssignBusData): Promise<{ data: IRoute }> => {
//   const response = await axios.patch(`${API_BASE_URL}/routes/${routeId}/assign-bus`, data);
//   return response.data;
// };



// export const register = async (
//   name: string,
//   email: string,
//   password: string,
//   schoolName: string
// ): Promise<{ data: LoginResponse }> => {
//   const response = await axios.post(`${API_BASE_URL}/auth/admin/register`, {
//     name,
//     email,
//     password,
//     schoolName,
//   });
//   return response;
// };

