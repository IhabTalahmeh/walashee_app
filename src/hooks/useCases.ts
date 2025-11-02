import { useMutation, useQuery } from 'react-query';
import * as casesService from 'src/services/casesService';
import { ExportDto } from 'src/types/dto';
import { GetCasesDto } from 'src/types/dto/GetCasesDto';
import { GetReportsDto } from 'src/types/dto/GetReportsDto';
import { SearchCasesDto } from 'src/types/dto/SearchCasesDto';



const getCases = async (getCasesDto: GetCasesDto) => {
  return await casesService.getCases(getCasesDto);
}

const searchCases = async (dto: SearchCasesDto) => {
  return await casesService.searchCases(dto);
}

const getReports = async (userId: number, page: number, pageLimit: number) => {
  return await casesService.getReports(userId, page, pageLimit);
}

const exportCases = async ({ userId, dto }: {
  userId: number,
  dto: ExportDto
}) => {
  return await casesService.exportCases(userId, dto);
}

// *********************************************************************
// *********************************************************************

export const useGetCases = (getCasesDto: GetCasesDto, options = {}) => {
  return useQuery<any, Error>({
    queryKey: ['cases', getCasesDto.page, getCasesDto.filter, getCasesDto.userId, getCasesDto.before],
    queryFn: () => getCases(getCasesDto),
    ...options
  });
}

export const useGetReports = (getReportsDto: GetReportsDto, options = {}) => {
  return useQuery({
    queryKey: ['reports', getReportsDto.userId],
    queryFn: () => getReports(getReportsDto.userId, getReportsDto.page, getReportsDto.pageLimit),
    ...options,
  })
}

export const useSearchCases = (dto: SearchCasesDto, options = {}) => {
  return useQuery({
    queryKey: ['cases', JSON.stringify(dto)],
    queryFn: () => searchCases(dto),
    ...options,
  })
}

export const useExportCases = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(exportCases, {
    onSuccess,
    onError,
    ...options,
  });
}