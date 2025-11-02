import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from 'src/context/AuthContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import BellIcon from 'src/icons/BellIcon';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import CalcIcon from 'src/icons/CalcIcon';
import DocIcon from 'src/icons/DocIcon';
import { hexWithOpacity } from 'src/common/utils';
import { useGetDashboard, useGetUserById } from 'src/hooks/useUsers';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import FastImage from 'react-native-fast-image';
import GearIconOutline from 'src/icons/GearIconOutline';
import ProcedureNotificationsIcon from 'src/components/Case/ProcedureNotificationsIcon/ProcedureNotificationsIcon';

const RVUCard = ({ item, color, value, text, content, onPress }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const containerColor = useMemo(() => {
    return {
      backgroundColor: hexWithOpacity(color, 0.15),
      borderColor: hexWithOpacity(color, 0.5),
    }
  }, [color]);

  const Component = onPress ? View : View;

  return (
    <Component
      style={[styles.cardContainer, containerColor]}>
      <View style={styles.iconCircle}>
        {item.icon}
      </View>

      <View style={[globalStyles.mt10, globalStyles.mb5]}>
        <CustomText text={value} color={theme.colors.text} size={28} fontWeight='bold' numberOfLines={1} adjustsFontSizeToFit />
      </View>

      {text ? (
        <CustomText text={text} color={theme.colors.text} size={16} />
      ) : (
        content ?? <View />
      )}
    </Component>
  );
};


const UpgradeCard = ({ color, text, content, onPress }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const containerColor = useMemo(() => {
    return {
      backgroundColor: hexWithOpacity(color, 0.15),
      borderColor: hexWithOpacity(color, 0.5),
    }
  }, [color]);

  return (
    <View
      style={[styles.cardContainer, containerColor]}>
      <View style={styles.iconCircle}>
        <FastImage source={require('assets/images/locker.png')} style={{ width: 40, height: 40 }} resizeMode='contain' />
      </View>

      <View style={globalStyles.mt10}>
        <View>
          <View style={globalStyles.mt5}>
            <Text style={styles.upgradeText}>
              Please{' '}
              <Text
                style={{ color: theme.colors.primary }}
                onPress={onPress}
                suppressHighlighting={true}
              >
                upgrade
              </Text>{' '}
              your plan to unlock this.
            </Text>
          </View>
        </View>

        <View style={globalStyles.mt10}>
          {text ? (
            <CustomText text={text} color={theme.colors.text} size={16} />
          ) : (
            content ?? <View />
          )}
        </View>

      </View>

    </View>
  );
};

export default function RVUsScreen() {
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const { user, login } = useAuth();

  const { data: userInfo, refetch: refetchUser } = useGetUserById(user.id);
  const { data, refetch: refetchDashboard } = useGetDashboard({
    refetchOnWindowFocus: false,
  });

  useFocusEffect(
    useCallback(() => {
      refetchUser();
      refetchDashboard();
    }, [refetchUser, refetchDashboard])
  );

  const openMenu = () => {
    navigation.navigate('MenuScreen');
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitleContainerStyle: {
        flex: 1,        
      },
      headerLeft: () => (
        <UserAvatar size={54} uri={user?.profile_image?.href_small} onPress={openMenu} />
      ),
      headerTitle: () => (
        <TouchableOpacity style={globalStyles.ml10} onPress={openMenu}>
          <CustomText
            text={`${user.first_name} ${user.last_name}`}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          <ProcedureNotificationsIcon />
          <TouchableOpacity
            style={[globalStyles.iconCircle, globalStyles.mr15]}
            onPress={() => navigation.navigate('AddReimbursement')}
          >
            <GearIconOutline size={25} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [user, theme.mode]);

  const getEstimatedReimbursement = () => {
    let total = 0;
    if (userInfo?.reimbursement) {
      if (userInfo.reimbursement.reimbursement_model == 'SALARY_BASED') {
        return 'Salary Based';
      } else if (userInfo.reimbursement.reimbursement_model == 'RVUS_BASED') {
        return data?.total_reimbursable * userInfo.reimbursement.rvus_multiplier;
      } else if (userInfo.reimbursement.reimbursement_model == "MIXED") {
        if (userInfo.reimbursement.threshold == "DOLLARS") {
          total = (data?.total_reimbursable * userInfo.reimbursement.rvus_multiplier) - userInfo.reimbursement.amount;
        } else if (userInfo.reimbursement.threshold == 'RVUS') {
          total = (data?.total_reimbursable - userInfo.reimbursement.amount) * userInfo.reimbursement.rvus_multiplier;
        }
        return total;
      }
    } else if (!userInfo?.reimbursement) {
      return 0;
    }
  }

  const estimatedReimbursement = getEstimatedReimbursement();

  const getFinalEstimatedNumber = () => {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (typeof estimatedReimbursement === 'number') {
      if (estimatedReimbursement < 0) {
        return '-$' + (estimatedReimbursement * -1).toLocaleString('en-US', options);
      } else if (estimatedReimbursement > 0) {
        return '$' + estimatedReimbursement.toLocaleString('en-US', options);
      } else {
        return '$0.00';
      }
    }
    return estimatedReimbursement;
  }

  const planId = useMemo(() => {
    return userInfo?.subscription?.plan_id || null;
  }, [userInfo]);

  const isAboveBaseSalary = useMemo(() => {
    return typeof getEstimatedReimbursement() === 'number' && getEstimatedReimbursement() as number > 0 && userInfo?.reimbursement?.reimbursement_model == 'MIXED';
  }, [userInfo]);

  const isThresholdNotMet = useMemo(() => {
    return typeof getEstimatedReimbursement() === 'number' && getEstimatedReimbursement() as number < 0 && userInfo?.reimbursement?.reimbursement_model == 'MIXED';
  }, [userInfo]);

  const reimbursementStatus = useMemo(() => {
    return isAboveBaseSalary ? '(Above Base Salary)' : isThresholdNotMet ? 'Threshold Not Met' : '';
  }, [isAboveBaseSalary, isThresholdNotMet]);

  return (
    <>
      {data ? (<ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.pb20}
      >
        <View>
          <View style={[globalStyles.pv20, globalStyles.ph15]}>
            <CustomText text='Dashboard' color={theme.colors.text} size={20} fontWeight='bold' />
          </View>
          <View style={styles.cardsWrapper}>

            <RVUCard
              item={{ icon: <DocIcon size={28} color={theme.colors.primary} /> }}
              color={theme.colors.primary}
              value={data.procedures_within_this_month}
              text={'Number of Cases in this Month'}
            />

            <RVUCard
              item={{ icon: <DocIcon size={28} color={theme.colors.primary} /> }}
              color={theme.colors.primary}
              value={data.procedures_within_academic_year}
              text={'Number of Cases in this Year'}
            />

            <RVUCard
              item={{ icon: <DocIcon size={28} color={theme.colors.primary} /> }}
              color={theme.colors.primary}
              value={data.procedures_count}
              text={'Total Number of Cases'}
            />


            {planId == 1 ? (
              <UpgradeCard
                color={theme.colors.warning}
                text={'Estimated Reimbursable RVUs for this month'}
              />
            ) : (
              <RVUCard
                item={{ icon: <CalcIcon size={32} color={theme.colors.warning} /> }}
                color={theme.colors.warning}
                value={data.rvu_within_this_month.toFixed(2)}
                text={'Estimated Reimbursable RVUs for this month'}
              />
            )}

            {planId == 1 ? (
              <UpgradeCard
                color={theme.colors.success}
                text={'Estimated Reimbursable RVUs for this Year'}
              />
            ) : (
              <RVUCard
                item={{ icon: <CalcIcon size={32} color={theme.colors.success} /> }}
                color={theme.colors.success}
                value={data.total_reimbursable.toFixed(2)}
                text={'Estimated Reimbursable RVUs for this Year'}
              />
            )}

            {planId == 1 ? (
              <UpgradeCard
                color={theme.colors.error}
                content={(
                  <View>
                    <View>
                      <Text style={styles.text}>
                        Estimated{' '}
                        <Text
                          style={{ color: theme.colors.error }}
                          suppressHighlighting={true}
                        >
                          Reimbursable
                        </Text>{' '}
                        for this year
                      </Text>
                    </View>
                  </View>
                )}
              />
            ) : (
              <RVUCard
                item={{ icon: <CalcIcon size={32} color={theme.colors.error} /> }}
                color={theme.colors.error}
                value={getFinalEstimatedNumber()}
                content={
                  <View>
                    {reimbursementStatus && <CustomText text={reimbursementStatus} color={theme.colors.pureBorder} size={14} style={globalStyles.pb5} />}
                    <View>
                      <Text style={styles.text}>
                        Estimated{' '}
                        <Text
                          style={{ color: theme.colors.error }}
                          onPress={() => navigation.navigate('AddReimbursement')}
                          suppressHighlighting={true}
                        >
                          Reimbursable
                        </Text>{' '}
                        for this year
                      </Text>
                    </View>
                  </View>
                }
              />
            )}


          </View>
        </View>

      </ScrollView>) : (
        <LoadingScreen />
      )}
    </>
  )
}