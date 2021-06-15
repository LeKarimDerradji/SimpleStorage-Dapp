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
   /*
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
    }
    }, [simpleStorage]) */
     /*
    // Listen to DataSet event and react with a state change
    useEffect(() => {
    // If simpleStorage is not null
      if(simpleStorage) {
        const callback = (account, str) = {
            setValue(str)
        }
      }
    }, [simpleStorage]) */

    const handleClickSetStorage = async () => {
        const tx = await simpleStorage.setData(inputValue)

    }

    return (

    <>
    <p>Value : {inputValue}</p>

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
