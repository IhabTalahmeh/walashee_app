export interface BottomSheetProps {
  snapPoints: string[] | number[];
  content: React.ReactNode;
  startIndex?: number;
  panDownToClose?: boolean;
  showIndicator?: boolean;
  title?: string;
  curvey?: boolean;
  backgroundColor?: string;
}