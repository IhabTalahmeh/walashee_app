import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function PrimaryButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="primary" {...props} textColor='white' />;
}
