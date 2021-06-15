import React from 'react'
import Dapp from './Dapp'
import { useContract } from 'web3-hooks'
// Here we import the smart contract address and abi from ./contracts/SimpleStorage
import { SimpleStorageAddress, SimpleStorageAbi } from './contracts/SimpleStorage'

// We create a context, that we will set to an abstraction of our smart contract
export const SimpleStorageContext = React.createContext(null)

function App() {
  
  // We import a handy function from web3-hooks that takes the artifacts info from our smart contract
  // And transform it into the wanted Abstraction to use as a context.
  const simpleStorage = useContract(SimpleStorageAddress, SimpleStorageAbi)

  return (
    // We create a provider, and pass it the abstraction of our smart contract as a value
    // It now becomes a context that any childs can consume. 
    <SimpleStorageContext.Provider value={simpleStorage}>
      <Dapp />
    </SimpleStorageContext.Provider>
  )
}

export default App
