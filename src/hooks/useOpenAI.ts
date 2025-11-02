import { useQuery } from 'react-query';
import * as openAIService from 'src/services/openAIService';

const scanPatientSticker = async (filePath: string) => {
  return await openAIService.extractPatientInfoFromSticker(filePath);
}

// *************************************************************
// *************************************************************

export const useScanPatientSticker = (filePath: string, options = {}) => {
  return useQuery({
    queryKey: ['patientSticker', filePath],
    queryFn: () => scanPatientSticker(filePath),
    ...options,
  });
}