import { FastField, Field } from "formik";
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import CustomButton from "src/components/buttons/CustomButton/CustomButton";
import CustomFormTextInput from "src/components/common/CustomFormTextInput/CustomFormTextInput";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import CustomDatePicker from "src/components/common/CustomDatePicker/CustomDatePicker";
import { CustomSelectList } from "src/components/InputFields/CustomSelectList/CustomSelectList";
import { useMemo } from "react";
import StickerScanner from "src/components/Case/StickerScanner/StickerScanner";
import SearchUsers from "src/components/Modals/SearchUsers/SearchUsers";
import SelectICDs from "src/components/Case/SelectICDs/SelectICDs";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export function StepOne(props: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const {
    genders,
    goToNextPage,
    onStickerScan,
    raceList,
    insuranceList,
    insuranceStatusList,
    userHospitals,
    primarySurgeons,
    setPrimarySurgeons,
    coSurgeons,
    setCoSurgeons,
    icds,
    setICDs,
  } = props.shared;


  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View>
          <StickerScanner
            onSelect={onStickerScan}
            onCancel={() => console.log('cance')} />
        </View>

        {/* Patient last name */}
        <View style={globalStyles.mt20}>
          <FastField
            name="patient_last_name"
            component={CustomFormTextInput}
            required
            label='Patient Last Name'
            placeholder='Enter last name'
          />
        </View>

        {/* Patient first name */}
        <View style={globalStyles.mt10}>
          <FastField
            name="patient_first_name"
            component={CustomFormTextInput}
            required
            label='Patient First Name'
            placeholder='Enter first name'
          />
        </View>

        {/* Gender */}
        <View style={globalStyles.mt10}>
          <FastField
            key={genders ? genders.length : 0}
            name="gender"
            component={CustomSelectList}
            required
            label='Gender'
            placeholder='Select gender'
            data={genders || []}
          />
        </View>

        {/* Date of birth */}
        <View style={globalStyles.mt10}>
          <FastField
            name="date_of_birth"
            component={CustomDatePicker}
            required={false}
            label={'Date of birth'}
            placeholder='Enter date of birth'
          />
        </View>

        {/* Age */}
        <View style={globalStyles.mt10}>
          <FastField
            name="age"
            component={CustomFormTextInput}
            required={false}
            label='Age'
            placeholder='Add age'
            keyboardType='numeric'
          />
        </View>

        <View style={globalStyles.mt10}>
          <Field
            name="mrn"
            component={CustomFormTextInput}
            required={false}
            label='Medical Record Number'
            placeholder='Medical Record Number'
          />
        </View>

        <View style={globalStyles.mt10}>
          <FastField
            key={JSON.stringify(raceList)}
            name="race"
            component={CustomSelectList}
            required={false}
            label='Race'
            placeholder='Select race'
            data={raceList || []}
          />
        </View>

        <View style={globalStyles.mt10}>
          <FastField
            key={JSON.stringify(insuranceList)}
            name="insurance"
            component={CustomSelectList}
            required={false}
            label='Insurance'
            placeholder='Select insurance'
            data={insuranceList || []}
          />
        </View>

        <View style={globalStyles.mt10}>
          <FastField
            key={JSON.stringify(insuranceStatusList)}
            name="insurance_status"
            component={CustomSelectList}
            required={false}
            label='Insurance Status'
            placeholder='Select insurance status'
            data={insuranceStatusList || []}
          />
        </View>

        <View style={globalStyles.mt10}>
          <FastField
            key={JSON.stringify(userHospitals)}
            name="hospital_id"
            component={CustomSelectList}
            required
            label='Institution'
            placeholder='Select institution'
            data={[
              ...(userHospitals || []),
              {
                key: 'ADD_POSITION',
                value: 'ADD_POSITION',
                label: 'Add position',
              }
            ]}
          />
        </View>

        <View style={globalStyles.mt10}>
          <SearchUsers
            required={false}
            placeholder='Primary Surgeons (if not you)'
            selectedUsers={primarySurgeons}
            setSelectedUsers={setPrimarySurgeons}
            title='Primary Surgron(s)' />
        </View>

        <View style={globalStyles.mt10}>
          <SearchUsers
            required={false}
            placeholder='Co-Surgeon(s)'
            selectedUsers={coSurgeons}
            setSelectedUsers={setCoSurgeons}
            title='Co-Surgron(s)' />
        </View>

        <View style={globalStyles.mv10}>
          <FastField
            name="diagnosis"
            component={CustomFormTextInput}
            required={false}
            label='Diagnosis'
            placeholder='Diagnosis'
          />
        </View>

        <View style={globalStyles.mt10}>
          <SelectICDs
            title={'Select ICDs'}
            selectedICDs={icds}
            setSelectedICDs={setICDs} />
        </View>

        <View style={{ flex: 1 }} />
        <View style={globalStyles.continueButtonContainer}>
          <SafeAreaView edges={['bottom']}>
            <CustomButton
              text='Continue'
              onPress={goToNextPage}
              fontSize={18}
              fontWeight='semiBold'
            />
          </SafeAreaView>
        </View>
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={130}
    >
      {renderContent()}
    </KeyboardAvoidingView>
  );
}