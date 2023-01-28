import { StyleSheet } from 'react-native'
import React from "react";
import { HStack, IconButton, Text, NativeBaseProvider, Center, Box, StatusBar, Input, Stack } from "native-base";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function AppBar() {

  const iconSize = 26;

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
            textAlign={'left'}
            fontSize={'lg'}
            focusOutlineColor={'black'}
            colorScheme={'black'}
            placeholder='Pesquisar produtos...'
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
