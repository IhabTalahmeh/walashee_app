export interface AddExperienceDto {
    speciality_id: number;
    start_date: string;
    end_date?: string;
    hospital: {
        name: string;
        address: string;
        google_place_id: string;
    }
}