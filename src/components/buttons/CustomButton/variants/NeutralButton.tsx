import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function NeutralButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="neutral" {...props} />;
}
