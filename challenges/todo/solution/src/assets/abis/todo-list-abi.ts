export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "TodoCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
    ],
    name: "TodoCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
    ],
    name: "TodoUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "items",
    outputs: [
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idx",
        type: "uint256",
      },
    ],
    name: "toggleCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idx",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
