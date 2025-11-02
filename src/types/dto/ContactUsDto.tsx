export interface ContactUsDto {
  name: string,
  email: string,
  country_code_lookup_id?: number,
  phone?: string,
  message: string,
}