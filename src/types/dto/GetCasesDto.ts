import { ECaseFilter } from "src/enum/ECaseFilter";
import { ESharedCaseFilter } from "src/enum/ESharedCaseFilter";

export interface GetCasesDto {
  userId: number;
  page: number;
  pageLimit: number;
  filter: ECaseFilter | ESharedCaseFilter;
  before?: string;
}