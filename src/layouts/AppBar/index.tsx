import { StyleSheet } from 'react-native'
import React, { useContext } from "react";
import { HStack, IconButton, Text, NativeBaseProvider, Center, Box, StatusBar, Input, Stack } from "native-base";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProductsContext } from '../../context/ProductsProvider';

interface AppBarProps {
  searchMethod?(query: string): void,
  searchLabel?: string
}

export default function AppBar({searchMethod, searchLabel}: AppBarProps) {

  const iconSize = 26;

  const handleSearch = (query: string) => {
    searchMethod && searchMethod(query);
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Box safeAreaTop />
      <HStack style={styles.container} pl={1} pr={1}>
        <IconButton
          icon={<Icon name='menu' size={iconSize} />}
        />
        <Stack flex={1} p={2}>
          <Input
            onChangeText={(query) => {handleSearch(query)}}
            textAlign={'left'}
            fontSize={'lg'}
            focusOutlineColor={'black'}
            colorScheme={'black'}
            placeholder={searchLabel}
            color={'black'}
            variant='underlined'
            style={styles.textInput}
            InputRightElement={<IconButton
              icon={<Icon name='magnify' size={iconSize} />}
            />}
          />
        </Stack>
        <IconButton
          icon={<Icon name='dots-vertical' size={iconSize} />}
        />
      </HStack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    maxHeight: 58,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textInput: {
    flex: 1,
  }
});
