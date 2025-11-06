import AsyncStorage from "@react-native-async-storage/async-storage";
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
