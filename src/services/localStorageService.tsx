import AsyncStorage from "@react-native-async-storage/async-storage";
import { ERoleType } from "src/enum/ERoleType";
import { IUser } from "src/types/interfaces/UserInterface";

const STORAGE_KEY = '@user';

export const getLocalUser = async (): Promise<IUser | null> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const saveLocalUser = async (user: IUser) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const updateLocalUser = async (userInfo: Partial<IUser>) => {
  const user = await getLocalUser();

  const updatedUser: IUser = { 
    ...(user ?? {}), 
    ...userInfo,
  } as IUser;

  await saveLocalUser(updatedUser);
  return updatedUser;
};

export const getUseAs = async () => {
  const user = await getLocalUser();
  switch (user?.useAs){
    case ERoleType.AGENT:
      return 'agents';
    case ERoleType.DRIVER:
      return 'drivers';
    case ERoleType.DELIVERY_COMPANY:
      return 'delivery-companies';
    case ERoleType.STORE_MANAGER:
      return 'store-managers';
    case ERoleType.SUPPLIER:
      return 'suppliers';
    default:
      return 'customers';
  }
}