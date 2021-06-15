// Deployed on Rinkeby
export const SimpleStorageAddress = '0x60d4547D22A172F2a7eCB644Eb40c4D47E4B00b7'
// All data about the contract needs to be exported when declared
export const SimpleStorageAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "data_",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "DataSet",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "data_",
          "type": "string"
        }
      ],
      "name": "setData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]