import { EExportType } from "src/enum/EExportType";

export interface ExportDto {
    procedure_ids: number[];
    type: EExportType;
}