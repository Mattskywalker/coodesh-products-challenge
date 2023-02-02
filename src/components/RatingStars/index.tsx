import { View, Text, TouchableOpacity } from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { HStack } from 'native-base'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface RattingProps {
  loading?: boolean,
  rating?: number,
  size?: number,
  onChange?(e: string | React.ChangeEvent<any>): void
}

export default function RattingStars({ loading = false, rating = 0, size = 16, onChange }: RattingProps) {

  const disabled = onChange == undefined;
  const [currentRating, setRatting] = useState(rating)

  const handleChange = (value: number) => {
    if(!disabled) {
      onChange(value.toString());
      setRatting(value)
    }
  }

  if (loading) { //skeleton
    return (
      <HStack>
        <Icon color={"#EDEDED"} name='star' size={size} />
        <Icon color={"#EDEDED"} name='star' size={size} />
        <Icon color={"#EDEDED"} name='star' size={size} />
        <Icon color={"#EDEDED"} name='star' size={size} />
        <Icon color={"#EDEDED"} name='star' size={size} />
      </HStack>
    )
  }

  return (
    <HStack>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(1)} ><Icon color={currentRating > 0 ? "#6558F5" : "#EDEDED"} name='star' size={size} /></TouchableOpacity>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(2)} ><Icon color={currentRating > 1 ? "#6558F5" : "#EDEDED"} name='star' size={size} /></TouchableOpacity>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(3)} ><Icon color={currentRating > 2 ? "#6558F5" : "#EDEDED"} name='star' size={size} /></TouchableOpacity>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(4)} ><Icon color={currentRating > 3 ? "#6558F5" : "#EDEDED"} name='star' size={size} /></TouchableOpacity>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(5)} ><Icon color={currentRating > 4 ? "#6558F5" : "#EDEDED"} name='star' size={size} /></TouchableOpacity>
    </HStack>
  )
}