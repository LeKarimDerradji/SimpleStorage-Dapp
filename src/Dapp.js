import { useContext, useState, useEffect} from 'react'
import {
  Alert,
  AlertIcon,
  Input,
  Button,
  Flex,
  Spacer,
  Heading,
  Text,
  HStack,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react' 

import { Web3Context } from 'web3-hooks'
import { SimpleStorageContext } from './App'
import { SimpleStorageAddress } from './contracts/SimpleStorage'

const Dapp = () => {
    
    // Here, we consume the context (smart contract method available) in our dapp
    const simpleStorage = useContext(SimpleStorageContext)
    const [value, setValue] = useState(0)
    const [inputValue, setInputValue] = useState('')

    // Get storage value when component mount : 
    useEffect(() => {
      if (simpleStorage) {
        const getValue = async () => {
          try {
            const _value = await simpleStorage.getData()
            setValue(_value)
          } catch (e) {
            console.log(e)
          }
        }
        getValue()
      }
    }, [simpleStorage])

   // Get storage value on data change, by listening to the smart contract abstraction
   // Using method on, off, to suscribe and unsuscribe to emmited event.
   // Suscribe on Emit, unsuscribe on unmount with data cleanup.

   // Create a hook for that ? 

   useEffect(() => {
    // si myContract est pas null alors
    if (simpleStorage) {
      const cb = (account, str) => {
        // call back qui sera executée lorsque l'event sera émit 
        console.log(`${account} wrote on the blockchain, with data : ${str}`)
        setValue(str)
      }
      // ecouter sur l'event myEvent
      simpleStorage.on('DataSet', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        simpleStorage.off('DataSet', cb)
      }
    }
  }, [simpleStorage]) 
  
    
    // Write on the blockchain, injecting data by calling the smart contract
    // Catching if an error occurs
    const handleClickSetStorage = async () => {
      try {
        await simpleStorage.setData(inputValue)
      } catch(e) {
        console.log(e)
      }  
    }

    return (

    <>
    <Text as="b" fontSize="30">Value : {value} </Text>

     <Input 
     width="50"
     value={inputValue} 
     placeholder="storage value to set"
     onChange={(event) => setInputValue(event.target.value)}/>

     <Button
      colorScheme="teal"
      onClick={handleClickSetStorage}>
       set storage
     </Button>

    </>
    )
}

export default Dapp
