import { ECaseFilter } from "src/enum/ECaseFilter";
import { ESearchBy, ESearchFilter } from "src/enum/ESearchBy";

export interface SearchCasesDto {
    userId: number,
    page: number,
    pageLimit: number,
    filter: ESearchFilter,
    search_by: ESearchBy;
    value: string;
}