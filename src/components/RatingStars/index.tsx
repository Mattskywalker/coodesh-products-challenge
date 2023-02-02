import { View, Text } from 'react-native'
import React from 'react'
import { HStack } from 'native-base'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface RattingProps {
  loading?: boolean,
  rating?: number
}

export default function RattingStars({ loading = false, rating = 0}: RattingProps) {

  if (loading) {
    return (
      <HStack>
        <Icon color={"#EDEDED"} name='star' size={16} />
        <Icon color={"#EDEDED"} name='star' size={16} />
        <Icon color={"#EDEDED"} name='star' size={16} />
        <Icon color={"#EDEDED"} name='star' size={16} />
        <Icon color={"#EDEDED"} name='star' size={16} />
      </HStack>
    )
  }

  return (
    <HStack>
      <Icon color={rating > 0 ? "#6558F5" : "#EDEDED"} name='star' size={16} />
      <Icon color={rating > 1 ? "#6558F5" : "#EDEDED"} name='star' size={16} />
      <Icon color={rating > 2 ? "#6558F5" : "#EDEDED"} name='star' size={16} />
      <Icon color={rating > 3 ? "#6558F5" : "#EDEDED"} name='star' size={16} />
      <Icon color={rating > 4 ? "#6558F5" : "#EDEDED"} name='star' size={16} />
    </HStack>
  )
}