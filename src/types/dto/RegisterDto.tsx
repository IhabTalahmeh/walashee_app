export interface RegisterDto {
    first_name: string,
    last_name: string,
    user_role_id: number,
    email: string,
    code: string,
    plan_id?: string,
    secret?: string,
    accepted_privacy_policy: boolean,
    accepted_terms: boolean
}