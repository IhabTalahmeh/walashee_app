export interface AddEducationDto {
    degree_id: number;
    institution_name: string;
    speciality_id: number;
    start_date: string;
    end_date?: string;
}