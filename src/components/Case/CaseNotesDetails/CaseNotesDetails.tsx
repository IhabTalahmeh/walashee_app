import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { CPT, CPTModifier } from 'src/types/types/Types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStyles } from './styles';
import { FastField, FieldArray, Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomFormTextArea from 'src/components/common/CustomTextArea/CustomFormTextArea';
import { useUpdateProcedure, useUpdateProcedureNotes } from 'src/hooks/useProcedure';
import { useAuth } from 'src/context/AuthContext';
import PencilIcon from 'src/icons/PencilIcon';
import * as appService from 'src/services/appService';
import { ErrorButton } from 'src/components/buttons/CustomButton/variants';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';

interface Props {
  notes: any[];
  procedureId: number;
  refetch: () => void;
  isEditor: boolean;
}

export default function CaseNotesDetails({ notes = [], procedureId, refetch, isEditor }: Props) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateProcedureNotes(
    (data: any) => {
      appService.showToast('Notes updated successfully', 'success');
      setIsEditMode(false);
      refetch();
    },
    (error: any) => {
      console.log('error', JSON.stringify(error));
    }
  )

  const handleUpdateNotes = (values: any) => {
    updateMutation({
      userId: user.id,
      procedureId: procedureId,
      notes: values.notes,
    });
  }



  const renderNote = (note: any, index: number) => (
    <View style={[globalStyles.flexRow, globalStyles.aic]}>
      <View style={styles.itemContainer}>
        <View style={[globalStyles.flex1, globalStyles.flexRow]}>
          <View style={[globalStyles.flex1, globalStyles.pr10, globalStyles.ml15]}>
            <View>
              <CustomText text={`Note ${index + 1}`} size={14} color={theme.colors.text} fontWeight='semiBold' />
            </View>
            <CustomText
              text={note.note}
              size={18}
              color={theme.colors.text}
              fontWeight="regular"
            />
          </View>
        </View>
      </View>
    </View>
  );


  return (
    <View>
      <Formik
        initialValues={{ notes }}
        onSubmit={(values: any) => handleUpdateNotes(values)}
      >
        {(props) => {

          return (
            <FieldArray name="notes">
              {({ push, remove, form }) => {
                const hasNewNotes = form.values.notes.some((n: any) => !n.id);

                return (
                  <View>
                    <View style={styles.container}>
                      <View style={styles.titleContainer}>
                        <CustomText text="Notes" size={18} color={theme.colors.text} fontWeight="semiBold" />
                      </View>
                      {isEditor && <View style={[globalStyles.flexRow, globalStyles.aic]}>
                        {isEditMode ? (
                          <>
                            <TouchableOpacity onPress={form.submitForm} style={globalStyles.mr5}>
                              {isUpdating ? (
                                <ActivityIndicator size={12} color={theme.colors.text} style={globalStyles.mr5} />
                              ) : (
                                <Ionicons name='checkmark-circle-outline' color={theme.colors.success} size={24} />
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => push({ note: '' })}>
                              <Ionicons
                                name="add-circle-outline"
                                color={theme.colors.primary}
                                size={24}
                              />
                            </TouchableOpacity>
                          </>
                        ) : (
                          <TouchableOpacity onPress={() => setIsEditMode(true)} style={{ padding: 2 }}>
                            <PencilIcon size={18} color={theme.colors.primary} />
                          </TouchableOpacity>
                        )}
                      </View>}
                    </View>

                    {!isEditMode ? (
                      <>
                        {notes.map((item, index) => (
                          <React.Fragment key={item.id}>
                            {renderNote(item, index)}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <>
                        {form.values.notes.map((note: any, index: number) => {
                          const removeDialogOpen = [
                            {
                              text: 'Remove',
                              onPress: () => {
                                remove(index);
                                setRemoveIndex(null);
                              },
                              button: ErrorButton,
                            },
                            {
                              text: 'Cancel',
                              onPress: () => setRemoveIndex(null),
                              button: NeutralButton
                            }
                          ];

                          return (
                            <View key={note.id || `temp-${index}`}>
                              <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.mt10]}>
                                <View style={globalStyles.flex1}>
                                  <FastField
                                    name={`notes[${index}].note`}
                                    component={CustomFormTextArea}
                                    placeholder={`Note ${index + 1}`}
                                    required={false}
                                  />
                                </View>
                                <TouchableOpacity
                                  onPress={() => setRemoveIndex(index)}
                                  style={globalStyles.m10}
                                >
                                  <Ionicons
                                    name="remove-circle-outline"
                                    size={24}
                                    color={theme.colors.error}
                                  />
                                </TouchableOpacity>
                              </View>

                              <CustomDialog
                                visible={removeIndex === index}
                                onClose={() => setRemoveIndex(null)}
                                title={'Remove note'}
                                message={`Are you sure you want to remove this note from the list? ${note.note}`}
                                buttons={removeDialogOpen}
                              />
                            </View>
                          );
                        })}

                      </>
                    )}

                  </View>
                );
              }}
            </FieldArray>

          )
        }
        }
      </Formik>
    </View>
  );
}
