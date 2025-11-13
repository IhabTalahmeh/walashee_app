import { Platform, StyleSheet, I18nManager, Dimensions } from 'react-native';
import { fonts, Theme } from './theme';
import { hexWithOpacity } from 'src/common/utils';

const isRTL: boolean = I18nManager.isRTL;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const itemWidth = '100%';
export const smallInputHeight = 55;
export const bigInputHeight = 68;
export const searchHeaderHeight = 159; // start with fallback

export const { width: SCREEN_WIDTH } = Dimensions.get('screen');
export const screenWidth = 350;
export const headerHeight = Platform.OS === 'ios' ? 140 : 110;
export const fixedHeaderHeight = 70;

export const createGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      textAlign: isRTL ? 'left' : 'left',
    },
    header: {
      height: headerHeight,
      backgroundColor: theme.colors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
    squareHeader: {
      height: headerHeight,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerRadius: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    authTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
    },
    standardText: {
      fontSize: 16,
      fontFamily: fonts.regular,
    },
    linkText: {
      color: theme.colors.link,
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    input: {
      flex: 1,
      backgroundColor: 'white',
      fontWeight: '400',
      color: theme.colors.black,
      paddingHorizontal: 18,
      fontSize: 16,
      textAlign: 'left',
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    primaryButtonText: {
      fontSize: 18,
      color: theme.colors.white,
      fontWeight: '500',
    },
    button: {
      width: itemWidth,
      backgroundColor: theme.colors.primary,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: '600',
      fontSize: 18,
    },
    textLogo: {
      fontFamily: 'Lobster',
      fontSize: 26,
      color: theme.colors.black,
      marginTop: 12,
    },
    flex1: {
      flex: 1,
    },
    flexGrow1: {
      flexGrow: 1,
    },
    centerText: {
      textAlign: 'center',
    },

    // Padding all sides
    p5: { padding: 5 },
    p10: { padding: 10 },
    p15: { padding: 15 },
    p20: { padding: 20 },

    // Padding Start
    ps5: { paddingStart: 5 },
    ps10: { paddingStart: 10 },
    ps15: { paddingStart: 15 },
    ps20: { paddingStart: 20 },

    // Padding End
    pe5: { paddingEnd: 5 },
    pe10: { paddingEnd: 10 },
    pe15: { paddingEnd: 15 },
    pe20: { paddingEnd: 20 },

    // Padding Vertical
    pv5: { paddingVertical: 5 },
    pv10: { paddingVertical: 10 },
    pv15: { paddingVertical: 15 },
    pv20: { paddingVertical: 20 },

    // Padding Horizontal
    ph5: { paddingHorizontal: 5 },
    ph10: { paddingHorizontal: 10 },
    ph15: { paddingHorizontal: 15 },
    ph20: { paddingHorizontal: 20 },

    // Padding Top
    pt5: { paddingTop: 5 },
    pt10: { paddingTop: 10 },
    pt15: { paddingTop: 15 },
    pt20: { paddingTop: 20 },

    // Padding Bottom
    pb5: { paddingBottom: 5 },
    pb10: { paddingBottom: 10 },
    pb15: { paddingBottom: 15 },
    pb20: { paddingBottom: 20 },

    // Padding Right
    pr5: { paddingRight: 5 },
    pr10: { paddingRight: 10 },
    pr15: { paddingRight: 15 },
    pr20: { paddingRight: 20 },

    // Padding Left
    pl5: { paddingLeft: 5 },
    pl10: { paddingLeft: 10 },
    pl15: { paddingLeft: 15 },
    pl20: { paddingLeft: 20 },

    // Margin all sides
    m5: { margin: 5 },
    m10: { margin: 10 },
    m15: { margin: 15 },
    m20: { margin: 20 },

    // Margin Vertical
    mv5: { marginVertical: 5 },
    mv10: { marginVertical: 10 },
    mv15: { marginVertical: 15 },
    mv20: { marginVertical: 20 },
    mv25: { marginVertical: 25 },
    mv30: { marginVertical: 30 },

    // Margin Horizontal
    mh5: { marginHorizontal: 5 },
    mh10: { marginHorizontal: 10 },
    mh15: { marginHorizontal: 15 },
    mh20: { marginHorizontal: 20 },

    // Margin Top
    mt2: { marginTop: 2 },
    mt5: { marginTop: 5 },
    mt10: { marginTop: 10 },
    mt15: { marginTop: 15 },
    mt20: { marginTop: 20 },
    mt30: { marginTop: 30 },

    // Margin Bottom
    mb5: { marginBottom: 5 },
    mb10: { marginBottom: 10 },
    mb15: { marginBottom: 15 },
    mb20: { marginBottom: 20 },
    mb25: { marginBottom: 25 },
    mb30: { marginBottom: 30 },
    mb40: { marginBottom: 40 },
    mb50: { marginBottom: 50 },

    // Margin Right
    mr5: { marginRight: 5 },
    mr10: { marginRight: 10 },
    mr15: { marginRight: 15 },
    mr20: { marginRight: 20 },

    // Margin Left
    ml5: { marginLeft: 5 },
    ml10: { marginLeft: 10 },
    ml15: { marginLeft: 15 },
    ml20: { marginLeft: 20 },

    // Margin Start
    ms5: { marginStart: 5 },
    ms10: { marginStart: 10 },
    ms15: { marginStart: 15 },
    ms20: { marginStart: 20 },

    // Margin End
    me5: { marginEnd: 5 },
    me10: { marginEnd: 10 },
    me15: { marginEnd: 15 },
    me20: { marginEnd: 20 },

    settingsNoteText: {
      color: theme.colors.black,
      fontSize: 13,
      fontFamily: fonts.regular,
      lineHeight: 18,
    },

    full: {
      width: '100%',
      height: '100%',
    },

    w100: {
      width: '100%',
    },

    h100: {
      height: '100%',
    },

    asc: {
      alignSelf: 'center',
    },
    ass: {
      alignSelf: 'flex-start',
    },
    ase: {
      alignSelf: 'flex-end',
    },

    inputLabel: {
      fontSize: 16,
      fontFamily: fonts.regular,
      color: theme.colors.black,
      textAlign: 'left'
    },
    headerTitle: {
      fontSize: 20,
      color: theme.colors.black,
      fontFamily: fonts.medium
    },

    flexRow: {
      display: 'flex',
      flexDirection: 'row',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    ais: {
      alignItems: 'flex-start'
    },
    aic: {
      alignItems: 'center'
    },
    jcs: {
      justifyContent: 'flex-start',
    },
    jcc: {
      justifyContent: 'center',
    },
    jcb: {
      justifyContent: 'space-between'
    },
    jca: {
      justifyContent: 'space-around'
    },
    tabBarIconContainer: {
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flipVertical: {
      transform: [{ scaleY: -1 }]
    },
    headerBackImage: {
      backgroundColor: theme.colors.inputBackground,
      width: 54,
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      overflow: 'hidden',
    },
    disabled: {
      opacity: 0.5
    },
    iconCircle: {
      width: 54,
      height: 54,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 100,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },

    bottomSheetContainer: {
      padding: 10,
      backgroundColor: theme.colors.topBackground,
    },

    bottomSheetButtonsContainer: {
      borderRadius: 14,
      overflow: 'hidden',
    },

    bottomSheetButton: {
      backgroundColor: theme.colors.background,
      height: 45,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    bottomSheetButtonText: {
      fontSize: 18,
      fontFamily: fonts.regular,
      color: theme.colors.text
    },
    bottomSheetIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40
    },
    bottomSheetContentContainer: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    safeArea: {
      flex: 1,
    },
    flag: {
      borderRadius: 4,
      overflow: 'hidden',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    headerRightButton: {
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 100,
      margin: 15,
      overflow: 'hidden',
      borderColor: theme.colors.border
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexWithOpacity(theme.colors.background, 0.3),
    },
    continueButtonContainer: {
      marginTop: 20,
      marginBottom: Platform.OS == 'ios' ? 10 : 10,
    },
    footerLoadingContainer: {
      height: 100,
    },
    authLockerImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      width: 90,
      height: 90,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: hexWithOpacity(theme.colors.pureBorder, 0.15)
    },
    authLockerImage: {
      width: 45,
      height: 45
    },
    infoInputContainer: {
      height: 68,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 20,
      padding: 10,
      backgroundColor: theme.colors.white
    },
    inputFieldText: {
      fontSize: 18,
      color: theme.colors.black,
      fontFamily: fonts.regular,
      flex: 1,
      textAlign: 'left',
    },
    lineThrough: {
      textDecorationLine: 'line-through'
    },
    phoneCodeContainerStyle: {
      width: 80,
      borderRightWidth: 1,
      borderColor: theme.colors.lightgray,
      marginRight: 15,
      height: '60%',
      paddingLeft: 15,
    },
    flashListWrapper: {
      flex: 1,
      height: SCREEN_HEIGHT - 50,
      backgroundColor: theme.colors.topBackground,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },

  });