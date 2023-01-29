import { StyleSheet, SafeAreaView, View } from 'react-native'
import React from 'react'
import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types';
import { Text } from 'native-base';

interface PageProps extends InterfaceViewProps {
  title?: string,
}

export default function Page({ children, title, ...rest }: PageProps) {

  return (
    <SafeAreaView style={styles.container}>
      {
        title &&
        <View style={styles.mainLabel} >
          <Text variant={'h5'} fontSize={18} fontWeight={'semibold'} >{title}</Text>
        </View>
      }
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // paddingTop: 16,

  },
  mainLabel: {
    zIndex: 1,
    backgroundColor: '#EFEFEF',
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2

  },
  textInput: {
    flex: 1,
  }
});
