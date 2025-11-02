import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function SecondaryButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="secondary" {...props} />;
}
