import { useMutation, useQuery } from 'react-query';
import { dateToString, listToStringList } from 'src/common/utils';
import * as procedureService from 'src/services/procedureService';

const getProcedureById = async (userId: number, procedureId: number) => {
  const procedure = await procedureService.getProcedureById(userId, procedureId);
  const images = await procedureService.getProcedureImages(userId, procedureId);

  const newImages = images.map((item: any) => {
    return {
      id: item.id,
      uri: item.urls.href_big,
      image_name: item.image_name,
      procedure: item.procedure,
    };
  });

  return { ...procedure, images: newImages };
}

const createProcedure = async ({ userId, data, approve = false }: {
  userId: number,
  data: any,
  approve?: boolean,
}) => {
  try {
    if (!approve) {
      const newData = { ...data };

      for (let key in newData) {

        // Procedure lists
        if (['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
          newData[key] = listToStringList(newData[key]);
        }
      }

      // Procedure dates
      newData.date_of_procedure = dateToString(new Date(newData.date_of_procedure));
      newData.date = newData.date_of_procedure;

      if (dateToString(new Date()) == dateToString(new Date(newData.date_of_birth))) {
        delete newData.date_of_birth;
      } else {
        newData.date_of_birth = newData.date_of_birth.toISOString().split('T')[0];
      }

      if (!newData.cpt_modifier_id) {
        delete newData.cpt_modifier;
      }

      for (let cp of data.case_procedures) {
        for (let key in cp) {
          if (['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
            cp[key] = listToStringList(cp[key]);
          }
        }
        if (cp.date_of_procedure instanceof Date) {
          cp.date_of_procedure = cp.date_of_procedure.toISOString().split('T')[0];
        }
        cp.date = cp.date_of_procedure;
      }
      newData.notes = newData.notes.filter((item: string) => item.trim() != '');

      if (newData?.notes?.length == 0) {
        delete newData.notes;
      }
      return await procedureService.createProcedure(userId, newData);
    }

    return await procedureService.createProcedure(userId, data);
  } catch (error) {
    console.log('error creating procedure', error);
  }
}

const updateProcedure = async ({ userId, procedureId, data }: {
  userId: number;
  procedureId: number;
  data: any;
}) => {
  try {
    const newData = { ...data };

    if (newData?.date_of_procedure) {
      for (let key in newData) {

        // Procedure lists at the root level
        if (['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
          newData[key] = listToStringList(newData[key]);
        }

        if (newData[key] == null) {
          newData[key] = '';
        }
      }


      // Procedure dates
      newData.date_of_procedure = dateToString(new Date(newData.date_of_procedure));
      newData.date = newData.date_of_procedure;

      if (dateToString(new Date()) == dateToString(new Date(newData.date_of_birth))) {
        delete newData.date_of_birth;
      } else {
        newData.date_of_birth = dateToString(new Date(newData.date_of_birth));
      }

      if (!newData.cpt_modifier_id) {
        delete newData.cpt_modifier;
      }

      delete newData.hospital;

      for (let cp of data.case_procedures) {
        for (let key in cp) {
          if (['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
            cp[key] = listToStringList(cp[key]);
          }
        }
        if (cp.date_of_procedure instanceof Date) {
          cp.date_of_procedure = cp.date_of_procedure.toISOString().split('T')[0];
        }
        cp.date = cp.date_of_procedure;
        delete cp.cpt_modifier;
        delete cp.case_procedure_cpt;
        
      }

      newData.notes = newData?.notes?.filter((item: string) => item.trim() != '') || [];
    }

    return await procedureService.updateProcedure(userId, procedureId, newData);
  } catch (error) {
    console.log('error updating procedure', error);
  }
}

const deleteCaseProcedure = async ({ userId, procedureId, caseProcedureId }: {
  userId: number,
  procedureId: number,
  caseProcedureId: number,
}) => {
  return await procedureService.deleteCaseProcedureById(userId, procedureId, caseProcedureId);
}

const updateProcedureImages = async ({
  userId,
  procedureId,
  images,
}: {
  userId: number;
  procedureId: number;
  images: any[];
}) => {

  const formData = new FormData();

  images.forEach((image: any) => {
    formData.append('images', {
      uri: image.uri,
      name: image.image_name,
      type: 'image/jpeg',
    } as any);
  });

  return await procedureService.updateCaseImages(userId, procedureId, formData);
};

const deleteCaseImage = async ({
  userId,
  procedureId,
  imageId
}: {
  userId: number,
  procedureId: number,
  imageId: number
}) => {
  return await procedureService.deleteCaseImage(userId, procedureId, imageId);
}

const updateCaseImage = async ({
  userId,
  procedureId,
  image
}: {
  userId: number,
  procedureId: number,
  image: any
}) => {
  return await procedureService.updateProcedureImage(userId, procedureId, image);
}

const deleteProcedure = async ({ userId, procedureId }: {
  userId: number,
  procedureId: number,
}) => {
  return await procedureService.deleteProcedure(userId, procedureId);
}

const getProcedureInvitations = async () => {
  return await procedureService.getProcedureInvitations();
}

const approveProcedureInvitation = async (invitationId: number) => {
  return await procedureService.approveProcedureInvitation(invitationId);
}

const rejectProcedureInvitation = async (invitationId: number) => {
  return await procedureService.rejectProcedureInvitation(invitationId);
}

const updateProcedureNotes = async ({ userId, procedureId, notes }: {
  userId: number,
  procedureId: number,
  notes: any[],
}) => {
  return await procedureService.updateNotes(userId, procedureId, notes);
}

// ******************************************************************
// ******************************************************************

export const useGetProcedureById = (procedureId: number, userId: number, options = {}) => {
  return useQuery({
    queryKey: ['procedure', procedureId],
    queryFn: () => getProcedureById(userId, procedureId),
    ...options,
  });
}

export const useUpdateProcedure = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateProcedure, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useCreateProcedure = (onSuccess: any, onError: any) => {
  return useMutation(createProcedure, {
    onSuccess,
    onError
  });
}

export const useDeleteCaseProcedure = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteCaseProcedure, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useUpdateProcedureImages = (onSuccess: any, onError: any) => {
  return useMutation(updateProcedureImages, {
    onSuccess,
    onError
  });
}

export const useDeleteCaseImage = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteCaseImage, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useUpdateProcedureImage = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateCaseImage, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useDeleteProcedure = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteProcedure, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useGetProcedureInvitations = (options = {}) => {
  return useQuery({
    queryKey: ['procedureInvitations'],
    queryFn: getProcedureInvitations,
    ...options,
  });
}

export const useApproveProcedureInvitation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(approveProcedureInvitation, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useRejectProcedureInvitation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(rejectProcedureInvitation, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useUpdateProcedureNotes = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateProcedureNotes, {
    onSuccess,
    onError,
    ...options,
  });
}
