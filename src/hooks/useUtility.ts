import { ContactUsDto } from "src/types/dto";
import * as utilityService from 'src/services/utilityService';
import { useMutation, useQuery } from "react-query";
import * as downloadService from 'src/services/downloadService';

const contactUs = async (dto: ContactUsDto) => {
  return await utilityService.contactUs(dto);
}

export const downloadCaseImage = async ({ imageUrl }: { imageUrl: string }) => {
  return await downloadService.downloadImage(imageUrl);
}

export const downloadFile = async ({ url, name }: {
  url: string,
  name: string,
}) => {
  return await downloadService.downloadFile(url, name);
}


// **********************************************************************
// **********************************************************************

export const useContactUs = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(contactUs, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useDownloadProcedureImage = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(downloadCaseImage, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useDownloadFile = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(downloadFile, {
    onSuccess,
    onError,
    ...options,
  });
}