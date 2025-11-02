import { ApiService } from "./apiService";


export const cancelSubscription = async (userId: number) => {
    return await ApiService.delete(`subscriptions/${userId}`);
}