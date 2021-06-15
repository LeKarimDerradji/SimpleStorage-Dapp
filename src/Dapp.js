import { useContext, useState, useEffect} from 'react'
import { Web3Context } from 'web3-hooks'
import { ethers } from 'ethers'
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

   // Get storage value on data change, handling the smart contract event 
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
    <p>Value : {value}</p>

     <input 
     value={inputValue} 
     placeholder="storage value to set"
     onChange={(event) => setInputValue(event.target.value)}/>

     <button
     onClick={handleClickSetStorage}>
       set storage
     </button>

    </>
    )
}

export default Dapp
