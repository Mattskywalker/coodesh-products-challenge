import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect, memo } from 'react'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProductModel } from '../../api';
import { fcurrency } from '../../utils/formatNumber';
import { Popover, Button, Box, IconButton, Skeleton, HStack, Stack, Text, useToast } from 'native-base';
import { UserProductsContext } from '../../context/UserProductsProvider';
import AlertModal from '../AlertModal';
import { useNavigation } from '@react-navigation/native';
import { Navigate } from '../../types';
import RattingStars from '../RatingStars';

interface CardProps {
  product?: ProductModel,
  loading?: boolean,
  addPermission?: boolean,
  deletePermission?: boolean,
  editPermission?: boolean
}

function Card({ product, loading = false, deletePermission = false, editPermission = false, addPermission = false }: CardProps) {

  // loading = true;
  const goTo = useNavigation().navigate as Navigate
  const toast = useToast();
  const { saveProduct, removeProduct } = useContext(UserProductsContext);

  const [openDeleteModal, setOpenDeletModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [buttonAddLoading, setButtonAddLoading] = useState(false);
  const [buttonEditLoading, setButtonEditLoading] = useState(false);
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);

  const [isOpen, setOpen] = useState(false);

  const handleSave = (product?: ProductModel) => {
    if (product === undefined) return;
    setButtonAddLoading(true);
    saveProduct(product)
      .then((value) => {
        value ?
          toast.show({
            render: () => {
              return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                <Text fontSize={'lg'} color={'white'} >Produto adicionado</Text>
              </Box>;
            }
          }) : toast.show({
            render: () => {
              return <Box bg="warning.500" px="2" py="1" rounded="sm" mb={5}>
                <Text fontSize={'lg'} color={'white'} >Este produto j?? existe na lista</Text>
              </Box>;
            }
          })
        setButtonAddLoading(false);
        setOpen(false);
      })
  }

  const handleRemove = () => {
    if (product === undefined) return;
    setButtonDeleteLoading(true);
    removeProduct(product)
      .then(() => {

        toast.show({
          render: () => {
            return <Box bg="red.300" py="1" rounded="sm" mb={5}>
              <Text fontSize={'lg'} color={'white'} >Produto removido</Text>
            </Box>;
          }
        });
        setButtonDeleteLoading(false);
        setOpen(false);
      })
  }
  
  const cancelRef = React.useRef(null);

  return (
    <>
      <HStack w={'100%'} maxH={180} mt={2} style={styles.card}>
        {!imageError && !loading &&
          <Stack style={{ alignContent: 'center', justifyContent: 'center' }} >
            <Image
              onError={() => { setImageError(true) }}
              style={{ height: 100, width: 120 }}
              source={{ uri: product?.filename }}
            />
          </Stack>
        }
        {imageError || loading &&
          <Stack style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Stack style={styles.imageContainer}  >
              <Icon color={'#9EADBA'} size={100} name='image' />
            </Stack>
          </Stack>
        }
        <Stack style={styles.infoArea} >
          <HStack style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }} w={'100%'}>
            <Stack maxW={'70%'} overflow='hidden' >
              {!loading && <Text lineBreakMode='tail' variant='h5' >{`${product?.title[0].toUpperCase()}${product?.title.substring(1)}`}</Text>}
              {loading && <Skeleton w={180} h={8} />}
              {!loading && <Text variant='h6' style={{ fontWeight: 'bold' }}>{product?.type}</Text>}
              {loading && <Skeleton w={90} h={4} />}
            </Stack>
            <Stack style={{ alignItems: 'flex-end', justifyContent: 'flex-start', position: 'absolute', right: 0, top: -16 }} >
              <Popover
                onClose={() => setOpen(false)}
                isOpen={isOpen}
                trigger={triggerProps => <IconButton disabled={loading} icon={<Icon name="dots-horizontal" size={28} />}
                  {...triggerProps} onPress={() => setOpen(!isOpen)}
                />}>
                <Popover.Content>
                  <Popover.Arrow />
                  <Stack style={{ backgroundColor: 'white', width: 224 }} paddingX={2} pb={2} >
                    {
                      addPermission &&
                      <Button
                        mt={2}
                        spinnerPlacement='start'
                        isLoading={buttonAddLoading}
                        isLoadingText={'Adicionando'}
                        onPress={() => handleSave(product)}
                        style={styles.button}
                        leftIcon={<Icon size={24} color={'white'} name='plus' />}
                        size={'lg'}
                        colorScheme={'emerald'}
                      >
                        Adicionar ?? lista
                      </Button>
                    }
                    {
                      editPermission && <Button
                        mt={2}
                        spinnerPlacement='start'
                        isLoading={buttonEditLoading}
                        isLoadingText={'Editar'}
                        onPress={() => {goTo('Editar', {product: product}) }}
                        style={styles.button}
                        leftIcon={<Icon size={24} color={'white'} name='pencil' />}
                        size={'lg'}
                        colorScheme={'lightBlue'}
                      >
                        Editar
                      </Button>
                    }
                    {
                      deletePermission && <Button
                        mt={2}
                        spinnerPlacement='start'
                        isLoading={buttonDeleteLoading}
                        isLoadingText={'Removendo'}
                        onPress={() => { setOpenDeletModal(true) }}
                        style={styles.button}
                        leftIcon={<Icon size={24} color={'white'} name='trash-can' />}
                        size={'lg'}
                        colorScheme={'danger'}
                      >
                        Deletar
                      </Button>
                    }
                  </Stack>
                </Popover.Content>
              </Popover>
            </Stack>
          </HStack>
          <HStack style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingRight: 16 }} >
            <RattingStars loading={loading} rating={product?.rating} />
            {!loading && <Text variant='h5' >{`R$ ${fcurrency(product?.price && product?.price / 100)}`}</Text>}
            {loading && <Skeleton width={78} height={8} />}
          </HStack>
        </Stack >
      </HStack >
      <AlertModal
        confirmColorScheme={'danger'}
        loading={buttonDeleteLoading}
        loadingMessage={'Removendo'}
        title={`Deletar item`}
        bodyMesage={`Deseja deletar ${product?.title}?`}
        confirmCallback={() => {handleRemove()}}
        declineCallback={() => {setOpenDeletModal(false)}}
        confirmLabel={"Deletar"}
        declineLabel={"Cancelar"}
        leastDestructiveRef={cancelRef}
        isOpen={openDeleteModal} /></>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#C4D0DA",
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingVertical: 8
  },
  infoArea: {
    paddingLeft: 12,
    paddingVertical: 8,
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DFE6ED',
    height: 100,
    width: 120,
    borderRadius: 3,
  },
  button: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // borderRadius: 6,
    // backgroundColor: '#Ededed',
    // paddingVertical: 16,
    // paddingHorizontal: 16
  }
});

export default memo(Card);