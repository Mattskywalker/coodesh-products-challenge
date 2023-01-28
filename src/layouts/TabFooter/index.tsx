import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, Stack } from 'native-base';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import { Navigate } from '../../types';

export default function TabFooter() {

  const goTo = useNavigation().navigate as Navigate;

  return (
    <View style={styles.container} >
      <Stack style={styles.areaButton} />
      <IconButton onPress={() => {
          goTo('Itens')
        }} colorScheme={'black'} icon={<Icon size={42} color={"#4B5C6B"} name='home-variant' />} />
      <Stack style={styles.areaButton} >
        <IconButton onPress={() => {
          goTo('MeusItens')
        }} width={'full'} colorScheme={'black'} icon={<Icon size={34} color={"#4B5C6B"} name='format-list-bulleted-square' />} />
      </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#DFE6ED",
    borderTopColor: "#9EADBA",
    borderTopWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    width: '100%'
  },
  areaButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})