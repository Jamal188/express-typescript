import { UseProduct } from "../models/Product";

export interface PaginatedResponse {
  data: UseProduct[]; // Replace `any` with your Product type
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}