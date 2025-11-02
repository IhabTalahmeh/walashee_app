import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function ErrorButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="error" {...props} />;
}
