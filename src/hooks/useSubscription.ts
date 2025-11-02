import { useMutation } from 'react-query';
import * as subscriptionService from 'src/services/subscriptionService';

const cancelSubscription = async (userId: number) => {
    return await subscriptionService.cancelSubscription(userId);
}


// *******************************************************************************************
// *******************************************************************************************

export const useCancelSubscription = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(cancelSubscription, {
        onSuccess,
        onError,
        ...options,
    })
}