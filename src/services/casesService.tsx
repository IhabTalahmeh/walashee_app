import { SearchCasesDto } from "src/types/dto/SearchCasesDto";
import { ApiService } from "./apiService";
import { GetCasesDto } from "src/types/dto/GetCasesDto";
import { ExportDto } from "src/types/dto";

export const searchCases = async (searchDto: SearchCasesDto, options = {}) => {
  return await ApiService.get(`users/${searchDto.userId}/procedures?page=${searchDto.page}&page_size=${searchDto.pageLimit}&filter=${searchDto.filter}&search_by=${searchDto.search_by}&value=${searchDto.value}`, options);
};

export const getCases = async (getCasesDto: GetCasesDto, options = {}) => {
  return await ApiService.get(`users/${getCasesDto.userId}/procedures?page=${getCasesDto.page}&page_size=${getCasesDto.pageLimit}&filter=${getCasesDto.filter}&before=${getCasesDto.before}`, options);
}

export const getReports = async (userId: number, page: number, pageLimit: number) => {
  return await ApiService.get(`users/${userId}/procedures/reports?page=${page}&page_size=${pageLimit}`);
}

export const exportCases = async (userId: number, dto: ExportDto) => {
  return await ApiService.post(`users/${userId}/procedures/export`, dto);
}