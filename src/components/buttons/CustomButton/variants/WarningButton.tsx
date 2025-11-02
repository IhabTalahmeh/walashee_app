import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function WarningButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="warning" {...props} />;
}
