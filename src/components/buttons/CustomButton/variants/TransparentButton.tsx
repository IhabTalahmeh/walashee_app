import React from 'react';
import CustomButton from '../CustomButton';
import { CustomButtonProps } from '../types';

export default function TransparentButton(props: Omit<CustomButtonProps, 'type'>) {
  return <CustomButton type="transparent" {...props} />;
}
