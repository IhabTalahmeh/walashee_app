import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function SuccessButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="success" {...props} />;
}
