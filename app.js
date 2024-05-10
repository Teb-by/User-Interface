// Initialize Web3 connection to Ganache
const web3 = new Web3("http://localhost:7545");

// Contract details for BankingTransactions and KYCContract
const bankingABI = [
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
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
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }     
        
];  // ABI of BankingTransactions
const bankingAddress = '0xC4bAF731d7cA0486191Cd490911b0AC4bf7A5054';  
const kycABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "customer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "KYCUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "customers",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "idNumber",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "kycStatus",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_customer",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_idNumber",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_kycStatus",
        "type": "bool"
      }
    ],
    "name": "addOrUpdateKYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_customer",
        "type": "address"
      }
    ],
    "name": "getKYCStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
   
];  //ABI of KYCContract
const kycAddress = '0x609937CAf8133085Beef9aE1dA643Aaaa5E09776';  

const BankingTransactions = new web3.eth.Contract(bankingABI, bankingAddress);
const kycContract = new web3.eth.Contract(kycABI, kycAddress);

// Registration Function
function register() {
  let newUser = {
    username: document.getElementById('registerUser').value,
    email: document.getElementById('registerEmail').value,
    password: document.getElementById('registerPass').value,
    passwordConfirm: document.getElementById('registerPassConfirm').value,
    address: document.getElementById('registerAddress').value
  };

  if (newUser.password !== newUser.passwordConfirm) {
    alert("Passwords do not match.");
    return;
  }

  const existingUser = users.some(u => u.username === newUser.username || u.email === newUser.email);
  if (existingUser) {
    alert("A user with this username or email already exists.");
    return;
  }

  users.push({ username: newUser.username, password: newUser.password, address: newUser.address });
  alert("Registration successful. Please login.");
  showLogin();
}

// Simulated credentials for login
let users = [
  { username: "Alison", password: "pass1", address: "0x604a6e8539c5eE0Af5aaF19DdEE0C5f6B8Ab6782" },
  { username: "Dave", password: "pass2", address: "0x4419d6c6ec901f3FA55A06Fe8a902DE76362A9F2" },
  { username: "Ellie", password: "pass3", address: "0x381182365FD1A96EfE8555e3E8483DD9b78e5054" },
  { username: "John", password: "pass4", address: "0xf546FA9E5D9d964cd8F447B23E5c177f962776c7" },
  { username: "Mary", password: "pass5", address: "0xf3F18667D14dAcFfC78a02C5dd8CED0F672EBE48" },
  { username: "Sam", password: "pass6", address: "0x5EE4c3108A115BB46e5724dC6e5E01cb41A87a65" }
];

// Dashboard greeting
function updateGreeting(username) {
    document.getElementById('greeting').innerText = "Hello " + username + "!";
}

// Login Function
function login() {
  let enteredUsername = document.getElementById('loginUser').value;
  let enteredPassword = document.getElementById('loginPass').value;
  let enteredAddress = document.getElementById('accountAddress').value;

  const user = users.find(u => u.username === enteredUsername);

  if (!user) {
      alert('Please enter valid details');
      return;
  }
  if (user.password !== enteredPassword) {
      alert('Incorrect password.');
      return;
  }
  if (user.address !== enteredAddress) {
      alert('Incorrect account address.');
      return;
  }

  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  localStorage.setItem('userAddress', enteredAddress);
  
  updateGreeting(enteredUsername);
}

// Toggle Views
function showRegistration() {
  console.log("showRegistration called");
  document.getElementById('registrationSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('kyc').style.display = 'none';
  document.getElementById('transactionHistoryPage').style.display = 'none';
}

function showLogin() {
  console.log("showLogin called");
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('kyc').style.display = 'none';
  document.getElementById('transactionHistoryPage').style.display = 'none';
}

function showAppContainer() {
  console.log("showAppContainer called");
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('kyc').style.display = 'none';
  document.getElementById('transactionHistoryPage').style.display = 'none';
}

function showKYCContainer() {
  console.log("showKYCContainer called");
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('kyc').style.display = 'block';
  document.getElementById('transactionHistoryPage').style.display = 'none';
}

// Banking Functions
async function deposit() {
    const address = document.getElementById('accountAddress').value;
    const amount = document.getElementById('amount').value;
    if (!address || amount <= 0) {
        document.getElementById('bankingStatus').innerText = 'Please enter a amount.';
        return;
    }

    try {
        await BankingTransactions.methods.deposit().send({
            from: address,
            value: web3.utils.toWei(amount, "ether")
        });
        document.getElementById('bankingStatus').innerText = 'Deposit successful!';
    } catch (error) {
        document.getElementById('bankingStatus').innerText = 'Deposit failed: ' + error.message;
    }
}

async function transfer() {
    const address = document.getElementById('accountAddress').value;
    const amount = document.getElementById('amount').value;
    const toAddress = prompt("Enter the recipient's address:");
    if (!address || !toAddress || amount <= 0) {
        document.getElementById('bankingStatus').innerText = 'Please enter valid address and amount.';
        return;
    }

    try {
        await BankingTransactions.methods.transfer(toAddress, web3.utils.toWei(amount, "ether")).send({from: address});
        document.getElementById('bankingStatus').innerText = 'Transfer successful!';
    } catch (error) {
        document.getElementById('bankingStatus').innerText = 'Transfer failed: ' + error.message;
    }
}

async function getBalance() {
    const address = document.getElementById('accountAddress').value;
    if (!address) {
        document.getElementById('bankingStatus').innerText = 'Please enter a valid address.';
        return;
    }

    try {
        const balance = await BankingTransactions.methods.balances(address).call();
        document.getElementById('bankingStatus').innerText = 'Balance: ' + web3.utils.fromWei(balance, "ether") + ' ETH';
    } catch (error) {
        document.getElementById('bankingStatus').innerText = 'Failed to retrieve balance: ' + error.message;
    }
}

async function fetchAndDisplayTransactionHistory() {
  const address = document.getElementById('accountAddress').value;
  if (!address) {
      document.getElementById('bankingStatus').innerText = 'Please enter a valid address.';
      return;
  }

  let transactions = [];

  // Fetching Deposit events
  const deposits = await BankingTransactions.getPastEvents('Deposit', {
      filter: {account: address},
      fromBlock: 0,
      toBlock: 'latest'
  });
  transactions = transactions.concat(deposits.map(event => ({
      date: new Date(Number(event.returnValues.timestamp) * 1000).toLocaleString(),
      type: 'Deposit',
      amount: web3.utils.fromWei(event.returnValues.amount, 'ether'),
      from: 'N/A',
      to: event.returnValues.account
  })));

  // Fetching Withdraw events
  const withdrawals = await BankingTransactions.getPastEvents('Withdraw', {
      filter: {account: address},
      fromBlock: 0,
      toBlock: 'latest'
  });
  transactions = transactions.concat(withdrawals.map(event => ({
      date: new Date(Number(event.returnValues.timestamp) * 1000).toLocaleString(),
      type: 'Withdraw',
      amount: web3.utils.fromWei(event.returnValues.amount, 'ether'),
      from: event.returnValues.account,
      to: 'N/A'
  })));

  // Fetching Transfer events
  const transfers = await BankingTransactions.getPastEvents('Transfer', {
      filter: {from: address},
      fromBlock: 0,
      toBlock: 'latest'
  });
  transactions = transactions.concat(transfers.map(event => ({
      date: new Date(Number(event.returnValues.timestamp) * 1000).toLocaleString(),
      type: 'Transfer',
      amount: web3.utils.fromWei(event.returnValues.amount, 'ether'),
      from: event.returnValues.from,
      to: event.returnValues.to
  })));

  const historyTable = document.getElementById('transactionHistory').getElementsByTagName('tbody')[0];
  historyTable.innerHTML = '';  // Clear existing entries

  if (transactions.length === 0) {
      document.getElementById('bankingStatus').innerText = 'No transaction history available.';
      return;
  }

  // Inserting each transaction into the table
  transactions.forEach(tx => {
      let row = historyTable.insertRow();
      row.insertCell(0).innerHTML = tx.date;
      row.insertCell(1).innerHTML = tx.type;
      row.insertCell(2).innerHTML = tx.amount;
      row.insertCell(3).innerHTML = tx.from;
      row.insertCell(4).innerHTML = tx.to;
  });
  
  // Show the transaction history page
  console.log("fetchAndDisplayTransactionHistory called");
  document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('kyc').style.display = 'none';
    document.getElementById('transactionHistoryPage').style.display = 'block';
}

// Go back to main app from transaction history
function goBack() {
  document.getElementById('transactionHistoryPage').style.display = 'none';
  document.getElementById('kyc').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
}

// KYC Functions
async function updateKYC() {
  const address = document.getElementById('accountAddress').value;
  const name = document.getElementById('kycName').value;
  const idNumber = document.getElementById('kycIdNumber').value;

  try {
      await kycContract.methods.addOrUpdateKYC(address, name, idNumber, true).send({from: address});
      document.getElementById('kycStatus').innerText = 'KYC updated successfully!';
  } catch (error) {
      document.getElementById('kycStatus').innerText = 'KYC update failed: ' + error.message;
  }
}

async function checkKYC() {
    const address = document.getElementById('accountAddress').value;
    if (!address) {
        document.getElementById('kycStatus').innerText = 'Please enter a valid address.';
        return;
    }

    try {
        const kycStatus = await kycContract.methods.getKYCStatus(address).call();
        document.getElementById('kycStatus').innerText = 'KYC Status: ' + (kycStatus ? 'Verified' : 'Not Verified');
    } catch (error) {
        document.getElementById('kycStatus').innerText = 'Failed to check KYC status: ' + error.message;
    }
}