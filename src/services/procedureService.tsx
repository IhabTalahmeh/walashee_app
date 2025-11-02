import { ApiService } from "./apiService";

export const createProcedure = async (userId: number, payload: any) => {
  return await ApiService.post(`users/${userId}/procedures`, payload);
};

export const updateProcedure = async (userId: number, procedureId: number, data: any) => {
  return await ApiService.put(`users/${userId}/procedures/${procedureId}`, data);
}

export const getProcedureById = async (userId: number, procedureId: number) => {
  const { data } = await ApiService.get(`users/${userId}/procedures/${procedureId}`);
  return data;
};

export const deleteCaseProcedureById = async (userId: number, procedureId: number, caseProcedureId: number) => {
  const { data } = await ApiService.delete(`users/${userId}/procedures/${procedureId}/case_procedure/${caseProcedureId}`);
  return data;
}

export const updateCaseImages = async (userId: number, procedureId: number, formData: FormData) => {
  const { data } = await ApiService.postFormData(`users/${userId}/procedures/${procedureId}/media`, formData);
  return data;
}

export const deleteCaseImage = async (userId: number, procedureId: number, imageId: number) => {
  const { data } = await ApiService.delete(`users/${userId}/procedures/${procedureId}/media/${imageId}`);
  return data;
}

export const getProcedureImages = async (userId: number, procedureId: number) => {
  const { data } = await ApiService.get(`users/${userId}/procedures/${procedureId}/media`);
  return data;
}

export const updateProcedureImage = async (userId: number, procedureId: number, image: any) => {
  const { data } = await ApiService.put(`users/${userId}/procedures/${procedureId}/media/${image.id}`, image);
  return data;
}

export const deleteProcedure = async (userId: number, procedureId: number) => {
  const { data } = await ApiService.delete(`users/${userId}/procedures/${procedureId}`);
  return data;
}

export const getProcedureInvitations = async () => {
  return await ApiService.get(`procedure_invitations`);
}

export const approveProcedureInvitation = async (invitationId: number) => {
  return await ApiService.post(`procedure_invitations/${invitationId}/approve`, {});
}

export const rejectProcedureInvitation = async (invitationId: number) => {
  return await ApiService.delete(`procedure_invitations/${invitationId}`);
}

export const updateNotes = async (userId: number, procedureId: number, notes: any[]) => {
  console.log('notes', notes, userId, procedureId);
  return await ApiService.put(`users/${userId}/procedures/${procedureId}/notes/procedure_all_notes`, { notes });
}