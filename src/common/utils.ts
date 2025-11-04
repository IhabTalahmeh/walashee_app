import { I18nManager } from 'react-native';
import RNFS from 'react-native-fs';

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

export const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    // Remove the "file://" prefix for Android native path compatibility
    const path = uri.replace('file://', '');

    const base64 = await RNFS.readFile(path, 'base64');

    // Optional: Add data URI prefix if needed
    // const mime = 'image/jpeg'; // or detect based on file extension
    // return `data:${mime};base64,${base64}`;

    return base64;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
};

export const hexWithOpacity = (hex: string, opacity: number) =>
  hex + Math.round(opacity * 255).toString(16).padStart(2, '0');

export function dateToString(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return `${months[month]} ${day}, ${year}`;
}


export function hexToRgba(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const toLabelValueArray = (data: any[]) => {
  if (!data) return [];
  return Object.entries(data).map(([value, label]) => ({ label, value }));
};

export const enumToLabelValueList = (enumObj: Record<string, string>) => {
  return Object.entries(enumObj).map(([key, value]) => ({
    key: key,
    label: value,
    value: key
  }));
};

export const enumToLabelValueListExp = (
  enumArray: { id: number | string; name: string }[]
) => {
  return enumArray.map(({ id, name }) => ({
    key: String(id),
    label: String(name),
    value: String(id),
  }));
};


export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const stringToDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const cleaned = dateString.replace(',', '');
  const [monthStr, dayStr, yearStr] = cleaned.split(' ');

  const month = months.indexOf(monthStr.substring(0, 3));
  if (month === -1) return null;

  const day = parseInt(dayStr, 10);
  const year = Number(yearStr);
  if (isNaN(day) || isNaN(year)) return null;

  return new Date(year, month, day);
};


export const stringToArray = (str: string): string[] => {
  return str
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export const listToStringList = (list: string[]): string => {
  if (Array.isArray(list) && list?.length > 0) {
    return list.join(', ');
  }
  return ''
}

export function getAge(birthDate: Date) {
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / 3.15576e10);
  return `${age} ${age === 1 ? 'Year' : 'Years'} old`;
}

export function getAgeNumber(birthDate: Date) {
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / 3.15576e10);
  return age;
}

export const validateCaseProcedures = (caseProcedures: any[] = []) => {
  for (let cp of caseProcedures) {
    if (cp.type.trim().length == 0 || cp.procedure_name.trim().length == 0) {
      return false;
    }
  }
  return true;
}

export const checkResponse = (statusCode: number, error = 'Something went wrong, please try again.') => {
  if (statusCode == 200 || statusCode == 201) {
    return true;
  }
  throw new Error(error);
}

export const sort = (data: any[]) => {
  return data.sort((a: any, b: any) => {
    const dateA = new Date(a.date_of_procedure);
    const dateB = new Date(b.date_of_procedure);
    return dateB.getTime() - dateA.getTime();
  });
}

export const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export function removeLeadingZero(num: string) {
  let numStr = num.toString();
  if (numStr.charAt(0) === '0') {
    return numStr.substring(1);
  }
  return numStr;
}

export function getPhoneNumberWithoutLeadingZero(num: string) {
  let numStr = num.toString();
  if (numStr.charAt(0) === '0') {
    return numStr.substring(1);
  }
  return numStr;
}