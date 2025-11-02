import { EReimbursementModel } from "src/enum/EReimbursementModel";
import { EThreshold } from "src/enum/EThreshold";

export interface UpdateReimbursementDto {
    practice_state: string,
    reimbursement_model: EReimbursementModel,
    threshold: EThreshold,
    amount: number | string,
    rvus_multiplier: number | string,
}