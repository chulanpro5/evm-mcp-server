// Standard ERC20 contract bytecode and ABI
const ERC20_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
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
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
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
      "inputs": [],
      "name": "symbol",
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
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
// ERC20 contract bytecode (OpenZeppelin ERC20 implementation)
const ERC20_BYTECODE = '0x608060405234801561000f575f80fd5b50604051611931380380611931833981810160405281019061003191906102f5565b835f908161003f9190610595565b50826001908161004f9190610595565b508160025f6101000a81548160ff021916908360ff1602179055508160ff16600a61007a91906107c0565b81610085919061080a565b60038190555060035460045f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055503373ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60035460405161012e919061085a565b60405180910390a350505050610873565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61019e82610158565b810181811067ffffffffffffffff821117156101bd576101bc610168565b5b80604052505050565b5f6101cf61013f565b90506101db8282610195565b919050565b5f67ffffffffffffffff8211156101fa576101f9610168565b5b61020382610158565b9050602081019050919050565b8281835e5f83830152505050565b5f61023061022b846101e0565b6101c6565b90508281526020810184848401111561024c5761024b610154565b5b610257848285610210565b509392505050565b5f82601f83011261027357610272610150565b5b815161028384826020860161021e565b91505092915050565b5f60ff82169050919050565b6102a18161028c565b81146102ab575f80fd5b50565b5f815190506102bc81610298565b92915050565b5f819050919050565b6102d4816102c2565b81146102de575f80fd5b50565b5f815190506102ef816102cb565b92915050565b5f805f806080858703121561030d5761030c610148565b5b5f85015167ffffffffffffffff81111561032a5761032961014c565b5b6103368782880161025f565b945050602085015167ffffffffffffffff8111156103575761035661014c565b5b6103638782880161025f565b9350506040610374878288016102ae565b9250506060610385878288016102e1565b91505092959194509250565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806103df57607f821691505b6020821081036103f2576103f161039b565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026104547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610419565b61045e8683610419565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61049961049461048f846102c2565b610476565b6102c2565b9050919050565b5f819050919050565b6104b28361047f565b6104c66104be826104a0565b848454610425565b825550505050565b5f90565b6104da6104ce565b6104e58184846104a9565b505050565b5b81811015610508576104fd5f826104d2565b6001810190506104eb565b5050565b601f82111561054d5761051e816103f8565b6105278461040a565b81016020851015610536578190505b61054a6105428561040a565b8301826104ea565b50505b505050565b5f82821c905092915050565b5f61056d5f1984600802610552565b1980831691505092915050565b5f610585838361055e565b9150826002028217905092915050565b61059e82610391565b67ffffffffffffffff8111156105b7576105b6610168565b5b6105c182546103c8565b6105cc82828561050c565b5f60209050601f8311600181146105fd575f84156105eb578287015190505b6105f5858261057a565b86555061065c565b601f19841661060b866103f8565b5f5b828110156106325784890151825560018201915060208501945060208101905061060d565b8683101561064f578489015161064b601f89168261055e565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f808291508390505b60018511156106e6578086048111156106c2576106c1610664565b5b60018516156106d15780820291505b80810290506106df85610691565b94506106a6565b94509492505050565b5f826106fe57600190506107b9565b8161070b575f90506107b9565b8160018114610721576002811461072b5761075a565b60019150506107b9565b60ff84111561073d5761073c610664565b5b8360020a91508482111561075457610753610664565b5b506107b9565b5060208310610133831016604e8410600b841016171561078f5782820a90508381111561078a57610789610664565b5b6107b9565b61079c848484600161069d565b925090508184048111156107b3576107b2610664565b5b81810290505b9392505050565b5f6107ca826102c2565b91506107d5836102c2565b92506108027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846106ef565b905092915050565b5f610814826102c2565b915061081f836102c2565b925082820261082d816102c2565b9150828204841483151761084457610843610664565b5b5092915050565b610854816102c2565b82525050565b5f60208201905061086d5f83018461084b565b92915050565b6110b1806108805f395ff3fe608060405234801561000f575f80fd5b5060043610610091575f3560e01c8063313ce56711610064578063313ce5671461013157806370a082311461014f57806395d89b411461017f578063a9059cbb1461019d578063dd62ed3e146101cd57610091565b806306fdde0314610095578063095ea7b3146100b357806318160ddd146100e357806323b872dd14610101575b5f80fd5b61009d6101fd565b6040516100aa9190610b8e565b60405180910390f35b6100cd60048036038101906100c89190610c3f565b610288565b6040516100da9190610c97565b60405180910390f35b6100eb61037a565b6040516100f89190610cbf565b60405180910390f35b61011b60048036038101906101169190610cd8565b610380565b6040516101289190610c97565b60405180910390f35b610139610741565b6040516101469190610d43565b60405180910390f35b61016960048036038101906101649190610d5c565b610753565b6040516101769190610cbf565b60405180910390f35b610187610799565b6040516101949190610b8e565b60405180910390f35b6101b760048036038101906101b29190610c3f565b610825565b6040516101c49190610c97565b60405180910390f35b6101e760048036038101906101e29190610d87565b610a9c565b6040516101f49190610cbf565b60405180910390f35b5f805461020990610df2565b80601f016020809104026020016040519081016040528092919081815260200182805461023590610df2565b80156102805780601f1061025757610100808354040283529160200191610280565b820191905f5260205f20905b81548152906001019060200180831161026357829003601f168201915b505050505081565b5f803390508260055f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040516103679190610cbf565b60405180910390a3600191505092915050565b60035481565b5f803390505f73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036103f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ea90610e6c565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610461576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045890610ed4565b60405180910390fd5b8260045f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205410156104e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d890610f3c565b60405180910390fd5b8260055f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054101561059c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059390610fca565b60405180910390fd5b8260045f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546105e89190611015565b925050819055508260045f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461063b9190611048565b925050819055508260055f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546106c99190611015565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161072d9190610cbf565b60405180910390a360019150509392505050565b60025f9054906101000a900460ff1681565b5f60045f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b600180546107a690610df2565b80601f01602080910402602001604051908101604052809291908181526020018280546107d290610df2565b801561081d5780601f106107f45761010080835404028352916020019161081d565b820191905f5260205f20905b81548152906001019060200180831161080057829003601f168201915b505050505081565b5f803390505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610898576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088f90610e6c565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610906576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fd90610ed4565b60405180910390fd5b8260045f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541015610986576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097d90610f3c565b60405180910390fd5b8260045f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546109d29190611015565b925050819055508260045f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f828254610a259190611048565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051610a899190610cbf565b60405180910390a3600191505092915050565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610b6082610b1e565b610b6a8185610b28565b9350610b7a818560208601610b38565b610b8381610b46565b840191505092915050565b5f6020820190508181035f830152610ba68184610b56565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610bdb82610bb2565b9050919050565b610beb81610bd1565b8114610bf5575f80fd5b50565b5f81359050610c0681610be2565b92915050565b5f819050919050565b610c1e81610c0c565b8114610c28575f80fd5b50565b5f81359050610c3981610c15565b92915050565b5f8060408385031215610c5557610c54610bae565b5b5f610c6285828601610bf8565b9250506020610c7385828601610c2b565b9150509250929050565b5f8115159050919050565b610c9181610c7d565b82525050565b5f602082019050610caa5f830184610c88565b92915050565b610cb981610c0c565b82525050565b5f602082019050610cd25f830184610cb0565b92915050565b5f805f60608486031215610cef57610cee610bae565b5b5f610cfc86828701610bf8565b9350506020610d0d86828701610bf8565b9250506040610d1e86828701610c2b565b9150509250925092565b5f60ff82169050919050565b610d3d81610d28565b82525050565b5f602082019050610d565f830184610d34565b92915050565b5f60208284031215610d7157610d70610bae565b5b5f610d7e84828501610bf8565b91505092915050565b5f8060408385031215610d9d57610d9c610bae565b5b5f610daa85828601610bf8565b9250506020610dbb85828601610bf8565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610e0957607f821691505b602082108103610e1c57610e1b610dc5565b5b50919050565b7f5472616e736665722066726f6d20746865207a65726f206164647265737300005f82015250565b5f610e56601e83610b28565b9150610e6182610e22565b602082019050919050565b5f6020820190508181035f830152610e8381610e4a565b9050919050565b7f5472616e7366657220746f20746865207a65726f2061646472657373000000005f82015250565b5f610ebe601c83610b28565b9150610ec982610e8a565b602082019050919050565b5f6020820190508181035f830152610eeb81610eb2565b9050919050565b7f5472616e7366657220616d6f756e7420657863656564732062616c616e6365005f82015250565b5f610f26601f83610b28565b9150610f3182610ef2565b602082019050919050565b5f6020820190508181035f830152610f5381610f1a565b9050919050565b7f5472616e7366657220616d6f756e74206578636565647320616c6c6f77616e635f8201527f6500000000000000000000000000000000000000000000000000000000000000602082015250565b5f610fb4602183610b28565b9150610fbf82610f5a565b604082019050919050565b5f6020820190508181035f830152610fe181610fa8565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61101f82610c0c565b915061102a83610c0c565b925082820390508181111561104257611041610fe8565b5b92915050565b5f61105282610c0c565b915061105d83610c0c565b925082820190508082111561107557611074610fe8565b5b9291505056fea26469706673582212200b824b09a8d72ca45d67e595954e4dad717651d9b19548d37023e6c69450685a64736f6c634300081a0033';


export { ERC20_ABI, ERC20_BYTECODE };