import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
    },
    caseItemContainer: {
      marginTop: 10,
    }
  });
}
