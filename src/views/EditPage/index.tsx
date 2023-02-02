import { Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ProductModel } from '../../api';
import { RouteParamsProductModel } from '../../types';
import Page from '../../layouts/Page';
import { Button, HStack, ScrollView, Stack, TextArea, useToast, Text as Typography, Box } from 'native-base';
import { TextInput } from '@react-native-material/core';

import * as ImagePicker from 'expo-image-picker';

import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import FeatherIcon from '@expo/vector-icons/Feather'

import { fcurrency, fCurrencyToNumber } from '../../utils/formatNumber';


import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { UserProductsContext } from '../../context/UserProductsProvider';

const schema = yup.object().shape({
  title: yup.string().required('O titulo do produto é obrigatório').trim(),
  type: yup.string().required('O titulo do produto é obrigatório').trim(),
  price: yup.string().required('O titulo do produto é obrigatório'),
})

export default function EditPage() {

  const { goBack } = useNavigation()
  const { product } = useRoute().params as RouteParamsProductModel;
  const { updateProduct } = useContext(UserProductsContext);
  const toast = useToast();

  if (!product) return <></>

  const [buttonLoading, setButtonLoading] = useState(false);
  
  const formik = useFormik<ProductModel>({
    initialValues: { ...product },
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    initialTouched: {

    },
    onSubmit: async (values, { setSubmitting }) => {
      setButtonLoading(true);
      await updateProduct(values, imageAsset)
        .then(() => {
          toast.show({
            render: () => {
              return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                <Typography fontSize={'lg'} color={'white'} >Alterações salvas</Typography>
              </Box>;
            }
          })
          setButtonLoading(false);
          setTimeout(() => goBack(), 100)

        }).catch(() => {
          toast.show({
            render: () => {
              return <Box bg="red" px="2" py="1" rounded="sm" mb={5}>
                <Typography fontSize={'lg'} color={'white'} >Falha ao salvar alterações</Typography>
              </Box>;
            }
          })
        })

    }
  });
  const { errors, touched, isSubmitting, resetForm, handleSubmit, handleChange, handleBlur, values, setFieldValue, setFieldTouched, setValues } = formik

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0]
    }
  };

  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset>()

  const handleUpdateImage = async () => {
    const image =  await pickImage();
    if(!image) return;
    (handleChange('filename'))(image?.uri);
    setImageAsset(image)
  }

  return (
    <Page>
      <ScrollView w={'100%'} style={{ height: '100%', flex: 1 }} >
        <Stack style={{ alignContent: 'center', justifyContent: 'center', height: 240 }} >
          <TouchableOpacity onPress={() => handleUpdateImage()} style={{alignItems: 'center', justifyContent: 'center'}} >
            <FeatherIcon size={100} name='upload' style={{ position: 'absolute', zIndex: 1 }} />
            <Image
              // onError={() => { setImageError(true) }}
              style={{ height: '100%', width: '100%' }}
              source={{ uri:  values.filename}}
            />
          </TouchableOpacity>
        </Stack>
        <ScrollView width={'100%'} paddingX={2} pt={2}>
          <FormikProvider value={formik} >
            <TextInput color={errors.title ? 'red' : 'black'} label='Nome do produto' value={values.title} onChangeText={handleChange('title')} inputStyle={{ fontSize: 24 }} />
            <HelperText message={errors.title} color='red' isVisible={!!errors.title} />

            <HStack w={'100%'} pt={2}>
              <Stack flex={1} pr={1}>
                <TextInput label='Tipo' value={values.type} onChangeText={handleChange('type')} inputStyle={{ fontSize: 24 }} />
                <HelperText message={errors.type} color='red' isVisible={!!errors.type} />
              </Stack>

              <Stack flex={1} pl={1} >
                <TextInput label='Valor do produto'
                  value={fcurrency(values.price / 100, 'R$ ')}
                  onChangeText={(e) => {
                    handleChange('price')(fCurrencyToNumber(e).toString())
                  }
                  }
                  inputStyle={{ fontSize: 24 }}
                />
                {/* <HelperText message='Erro' color='red' isVisible={true} /> */}
              </Stack>
            </HStack>

            <Stack>
              <Text style={{ paddingLeft: 8, fontSize: 16 }} >Descrição: </Text>
              <TextArea
                h={120}
                mt={2}
                fontSize={'lg'}
                autoCompleteType={''}
                value={values.description}
                onChangeText={handleChange('description')}
                placeholder='Descrição do produto' />
            </Stack>

          </FormikProvider>

        </ScrollView>
      </ScrollView>
      <Button fontWeight={'light'} fontSize={22} isLoadingText='Salvando' isLoading={buttonLoading} onPress={() => handleSubmit()} >
        <Text style={{ fontSize: 22, color: 'white', fontWeight: '300' }} >Salvar alterações</Text>
      </Button>
    </Page>
  )
}

interface HelperTextProps {
  message?: string,
  color?: string,
  isVisible?: boolean
}

function HelperText({ color, message, isVisible = true }: HelperTextProps) {
  return (
    <>
      {
        isVisible &&
        <Text style={{ color: color, marginLeft: 4, fontWeight: '400' }} >
          <MaterialIcon name='error-outline' color={color} />
          {` ${message}`}
        </Text>
      }
    </>
  )
}