import { View, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExperienceIcon from 'src/icons/ExperienceIcon';
import PositionItem from '../PositionItem/PositionItem';
import { useNavigation } from '@react-navigation/native';
import ExperienceItem from '../ExperienceItem/ExperienceItem';
import EducationItem from '../EducationItem/EducationItem';
import EducationIcon from 'src/icons/EducationIcon';
import ReimbursementIcon from 'src/icons/ReimbursementIcon';
import { UpdateReimbursementDto } from 'src/types/dto/UpdateReimbursementDto';
import ReimbursementItem from '../ReimbursementItem/ReimbursementItem';
import { Reimbursement } from 'src/types/types/Types';

interface Props {
  item: Reimbursement
}

export default function UserReimbursement({ item }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();

  const navigate = () => {
    navigation.navigate('AddReimbursement');
  }

  return (
    <View style={globalStyles.flex1}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.flex1]}>
          <View style={[globalStyles.flexRow, globalStyles.aic]}>
            <View style={styles.iconContainer}>
              <ReimbursementIcon size={19} color={theme.colors.primary} />
            </View>
            <CustomText text='Reimbursement' size={16} color={theme.colors.text} fontWeight='medium' style={globalStyles.ml10} />
          </View>
          <TouchableOpacity onPress={navigate}>
            <Ionicons name='add-circle-outline' color={theme.colors.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>


      {/* Content */}
      {item && <View style={[styles.contentContainer, globalStyles.mt10]}>
        <View style={{ borderBottomWidth: 1, borderColor: theme.colors.border }}>
          <ReimbursementItem item={item} />
        </View>
      </View>}

    </View>
  )
}