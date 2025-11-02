import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Modal, TouchableOpacity, FlatList, Keyboard, TextInputProps, SafeAreaView } from 'react-native';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from 'src/components/common/CustomHeader/CustomHeader';
import CustomText from 'src/components/common/CustomText/CustomText';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useSearchUsers } from 'src/hooks/useUsers';
import CustomStaticTextInput from 'src/components/common/CustomStaticTextInput/CustomStaticTextInput';
import { Pressable } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface User { id?: string; invitee_name: string }

interface Props extends TextInputProps {
  required?: boolean;
  title: string;
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
}

export default function SearchUsers({ title, selectedUsers, setSelectedUsers, placeholder = '', ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [apiSelected, setApiSelected] = useState<User[]>([]);
  const [manualUsers, setManualUsers] = useState<User[]>([]);
  const insets = useSafeAreaInsets();

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { refetch } = useSearchUsers(keyword, {
    enabled: false,
    onSuccess: (data: User[]) => setUsers(data),
  });

  const openModal = () => {
    setVisible(true);
    setKeyword('');
    setUsers([]);
    setApiSelected(selectedUsers.filter(u => !!u.id));
    setManualUsers(selectedUsers.filter(u => !u.id && u.invitee_name));
  };

  useEffect(() => {
    if (keyword.trim()) {
      refetch();
    } else {
      setUsers([]);
    }
  }, [keyword]);

  const toggleSelectUser = (user: User) => {
    setApiSelected(prev =>
      prev.some(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  const toggleManualUser = (name: string) => {
    setManualUsers(prev =>
      prev.some(u => u.invitee_name === name)
        ? prev.filter(u => u.invitee_name !== name)
        : [...prev, { invitee_name: name }]
    );
  };

  const allSelected = [...apiSelected, ...manualUsers];

  const onSave = () => {
    setSelectedUsers(allSelected);
    setVisible(false);
  };

  const renderUser = useCallback(
    ({ item }: { item: User }) => {
      const isSelected = apiSelected.some(u => u.id === item.id);
      return (
        <TouchableOpacity
          style={styles.userItem}
          onPress={() => {
            toggleSelectUser(item);
          }}
        >
          <FontAwesome
            name={isSelected ? 'check-square-o' : 'square-o'}
            size={22}
            color={theme.colors.text}
          />
          <CustomText
            text={item.invitee_name}
            size={18}
            color={theme.colors.text}
            fontWeight="medium"
            style={globalStyles.ml10}
          />
        </TouchableOpacity>
      );
    },
    [apiSelected]
  );

  const renderSelectedUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => {
        item.id
          ? toggleSelectUser(item)
          : toggleManualUser(item.invitee_name);
      }}
    >
      <FontAwesome
        name="check-square-o"
        size={22}
        color={theme.colors.text}
      />
      <CustomText
        text={item.invitee_name}
        size={18}
        color={theme.colors.text}
        fontWeight="medium"
        style={globalStyles.ml10}
      />
    </TouchableOpacity>
  );

  const showManual =
    keyword.trim() &&
    !users.some(u => u.invitee_name === keyword) &&
    !manualUsers.some(u => u.invitee_name === keyword);

  return (
    <>
      <Pressable onPress={openModal}>
        <CustomStaticTextInput
          {...props}
          editable={false}
          label={title}
          placeholder={selectedUsers.map(item => `(${item.invitee_name})`).join(', ') || placeholder}
        />
      </Pressable>
      <Modal visible={visible} animationType="slide" transparent onRequestClose={() => setVisible(false)}>

        <View style={{ height: insets.top, backgroundColor: theme.colors.background }} />

        <View style={globalStyles.flex1}>
          <View style={styles.modal}>
            <CustomHeader title={title} onBackPress={() => setVisible(false)} />
            <View style={styles.content}>
              <SearchInput
                onChangeText={setKeyword}
                placeholder="Search Users"
                value={keyword}
              />
              <View style={globalStyles.flex1}>
                <FlatList
                  data={users}
                  keyExtractor={item => item.id || item.invitee_name}
                  renderItem={renderUser}
                  keyboardShouldPersistTaps="handled"
                  onScrollBeginDrag={() => Keyboard.dismiss()}
                  ListHeaderComponent={
                    showManual ? (
                      <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => {
                          toggleManualUser(keyword);
                        }}
                      >
                        <FontAwesome
                          name="square-o"
                          size={22}
                          color={theme.colors.text}
                        />
                        <CustomText
                          text={keyword}
                          size={18}
                          color={theme.colors.text}
                          fontWeight="medium"
                          style={globalStyles.ml10}
                        />
                      </TouchableOpacity>
                    ) : null
                  }
                  ListFooterComponent={
                    allSelected.length > 0 ? (
                      <View style={globalStyles.mt10}>
                        <CustomText
                          text="Selected Users"
                          size={18}
                          color={theme.colors.text}
                          fontWeight="semiBold"
                        />
                        <FlatList
                          data={allSelected}
                          keyExtractor={item => (item.id || item.invitee_name) + '-selected'}
                          renderItem={renderSelectedUser}
                          showsHorizontalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        />
                      </View>
                    ) : null
                  }
                />
              </View>
              <CustomButton
                text="Add"
                fontSize={18}
                fontWeight="medium"
                onPress={onSave}
              />
            </View>
          </View>
        </View>

        <View style={{ height: insets.bottom, backgroundColor: theme.colors.topBackground }} />

      </Modal>
    </>
  );
}
