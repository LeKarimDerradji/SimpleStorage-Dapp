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

    
    // This is the old way of getting the illusion that our react app mirror the data :
    // Set storage data on userInput
    const handleClickSetStorage = async () => {
      try {
        // Calling for the smart contract
        const tx = await simpleStorage.setData(inputValue)
        // Waiting for the tx to be mined
        await tx.wait()
        // Set the value from the getter of the smart contract
        const _value = await simpleStorage.getData()
        // Update the value as a React state
        setValue(_value)
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
