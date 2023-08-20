# To Do

Straightforward frontend challenge for a blockchain-verified to-do list.

### Goal

- Interface with a deployed smart contract on the Sepolia testnet.
- The user should be able to connect their Web3 wallet (e.g Metamask) to the app, enter tasks into an input field, and commit these to the contract storage.
- Contract storage should also be read to display tasks.

### Contract

- `Todo.sol` is deployed on [Sepolia testnet](https://sepolia.etherscan.io/address/0xb03a1dd84d6d761de226CfaCf2a309F674c7ee87).
- Feel free to use this deployment, or redeploy the contract using [Remix](https://remix.ethereum.org/) or another tool.
- You can get Sepolia ETH with [Infura](https://www.infura.io/faucet/sepolia) or [other faucets](https://faucetlink.to/sepolia).

### What we’re looking for

- Basic understanding of Ethereum/Web3 in general
- Quick learner, adaptable, self-reliant

### To impress us

- Good design & UX
- Handle failure states (user not connected, user has no ETH, user on wrong network, etc)
- Internal notifications for transactions (tx sent, tx confirmed, tx failed)

### To blow us away (time permitting)

- Create a subgraph to track events
- Use IPFS to submit tasks with text over 32 bytes

### Submission format

Please fork the repo and make it private, commit your solution under `challenges/todo/solution` , then invite us to your forked repo once done.
