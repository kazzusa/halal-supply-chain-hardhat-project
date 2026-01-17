let contract;
let signer;
const contractAddress = "0x085a1a8CB34C09CDfc769c606cef0BfAAAFb2EF0";
const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_jakim",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "productName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "farmer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "BatchCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "authority",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "HalalCertificateIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "slaughterhouse",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "SlaughterRecorded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "batches",
      "outputs": [
        {
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "productName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "chickenCount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "farmer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "currentOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "certificates",
      "outputs": [
        {
          "internalType": "bool",
          "name": "issued",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "issuedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiryDate",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "authority",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_productName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_chickenCount",
          "type": "uint256"
        }
      ],
      "name": "createBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "distributors",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "farmers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        }
      ],
      "name": "getBatchDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "batchId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "chickenCount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "farmer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "currentOwner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
            }
          ],
          "internalType": "struct HalalSupplyChain.Batch",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "method",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "shariahCompliant",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "slaughterhouse",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "recorded",
              "type": "bool"
            }
          ],
          "internalType": "struct HalalSupplyChain.SlaughterInfo",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "issued",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "issuedAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "expiryDate",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "authority",
              "type": "address"
            }
          ],
          "internalType": "struct HalalSupplyChain.HalalCertificate",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
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
              "name": "transferredAt",
              "type": "uint256"
            }
          ],
          "internalType": "struct HalalSupplyChain.Ownership[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        }
      ],
      "name": "isCertificateValid",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        }
      ],
      "name": "issueHalalCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "jakim",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ownershipHistory",
      "outputs": [
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
          "name": "transferredAt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_method",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_shariahCompliant",
          "type": "bool"
        }
      ],
      "name": "recordSlaughter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_distributor",
          "type": "address"
        }
      ],
      "name": "registerDistributor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_farmer",
          "type": "address"
        }
      ],
      "name": "registerFarmer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_retailer",
          "type": "address"
        }
      ],
      "name": "registerRetailer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_slaughterhouse",
          "type": "address"
        }
      ],
      "name": "registerSlaughterhouse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "retailers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "slaughterInfos",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "method",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "shariahCompliant",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "slaughterhouse",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "recorded",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "slaughterhouses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_batchId",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
async function init() {
    const walletSpan = document.getElementById("walletAddress");

    if (typeof window.ethereum === "undefined") {
        walletSpan.innerText = "MetaMask not installed";
        alert("MetaMask not found. Please install it!");
        return;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        walletSpan.innerText = `${address.slice(0, 6)}...${address.slice(-4)}`;

        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log("Connected:", address);
        
        await checkUserRole(address);
    } catch (err) {
        console.error(err);
        walletSpan.innerText = "Connection failed";
        alert("Could not connect to wallet");
    }
}

async function checkUserRole(address) {
    try {
        const isAdmin = (await contract.admin()).toLowerCase() === address.toLowerCase();
        const isJakim = (await contract.jakim()).toLowerCase() === address.toLowerCase();
        const isFarmer = await contract.farmers(address);
        const isSlaughterhouse = await contract.slaughterhouses(address);
        const isDistributor = await contract.distributors(address);
        const isRetailer = await contract.retailers(address);

        const roleIndicator = document.getElementById("roleIndicator");
        
        if (isAdmin) {
            document.getElementById("adminPanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-admin">👑 Admin</span>';
        } else if (isFarmer) {
            document.getElementById("farmerPanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-farmer">🌾 Farmer</span>';
        } else if (isSlaughterhouse) {
            document.getElementById("slaughterhousePanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-slaughterhouse">🏭 Slaughterhouse</span>';
        } else if (isJakim) {
            document.getElementById("jakimPanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-jakim">✅ JAKIM Authority</span>';
        } else if (isDistributor) {
            document.getElementById("distributorPanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-distributor">🚚 Distributor</span>';
        } else if (isRetailer) {
            document.getElementById("retailerPanel").classList.remove("hidden");
            roleIndicator.innerHTML = '<span class="role-badge role-retailer">🏪 Retailer</span>';
        } else {
            roleIndicator.innerHTML = '<span class="role-badge role-consumer">👤 Consumer</span>';
        }
    } catch (err) {
        console.error("Error checking role:", err);
    }
}

// Admin: Register Participant
async function registerParticipant() {
    const addr = document.getElementById("regAddress").value.trim();
    const role = document.getElementById("regRole").value;

    if (!addr) return alert("Enter wallet address");

    try {
        let tx;
        if (role === "farmer") tx = await contract.registerFarmer(addr);
        else if (role === "slaughterhouse") tx = await contract.registerSlaughterhouse(addr);
        else if (role === "distributor") tx = await contract.registerDistributor(addr);
        else if (role === "retailer") tx = await contract.registerRetailer(addr);
        
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// Farmer: Create Batch
async function uiCreateBatch() {
    const id = document.getElementById("fbId").value.trim();
    const name = document.getElementById("fpName").value.trim();
    const count = document.getElementById("fcCount").value;

    if (!id || !name || !count) return alert("Fill all fields");

    try {
        const tx = await contract.createBatch(id, name, count);
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert("Batch created successfully!");
        
        // Clear form
        document.getElementById("fbId").value = "";
        document.getElementById("fpName").value = "";
        document.getElementById("fcCount").value = "";
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// Slaughterhouse: Record Slaughter
async function uiRecordSlaughter() {
    const id = document.getElementById("sbId").value.trim();
    const method = document.getElementById("sMethod").value.trim();
    const compliant = document.getElementById("sCompliant").value === "true";

    if (!id || !method) return alert("Fill all fields");

    try {
        const tx = await contract.recordSlaughter(id, method, compliant);
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert("Slaughter information recorded successfully!");
        
        // Clear form
        document.getElementById("sbId").value = "";
        document.getElementById("sMethod").value = "";
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// JAKIM: Issue Certificate
async function uiIssueCert() {
    const id = document.getElementById("jbId").value.trim();
    if (!id) return alert("Enter Batch ID");

    try {
        const tx = await contract.issueHalalCertificate(id);
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert("Halal certificate issued successfully!");
        
        document.getElementById("jbId").value = "";
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// JAKIM: Verify Before Cert
async function verifyBeforeCert() {
    const id = document.getElementById("jVerifyId").value.trim();
    if (!id) return alert("Enter Batch ID");

    const resultDiv = document.getElementById("verifyResult");

    try {
        const [batch, slaughter, cert] = await contract.getBatchDetails(id);
        
        let html = '<div style="padding: 15px; background: #f3f4f6; border-radius: 8px; margin-top: 15px;">';
        html += `<p><strong>Batch:</strong> ${batch.batchId}</p>`;
        html += `<p><strong>Product:</strong> ${batch.productName}</p>`;
        html += `<p><strong>Status:</strong> ${batch.status}</p>`;
        html += `<p><strong>Slaughter Recorded:</strong> ${slaughter.recorded ? 'Yes' : 'No'}</p>`;
        html += `<p><strong>Shariah Compliant:</strong> ${slaughter.shariahCompliant ? 'Yes' : 'No'}</p>`;
        html += `<p><strong>Already Certified:</strong> ${cert.issued ? 'Yes' : 'No'}</p>`;
        
        if (slaughter.recorded && slaughter.shariahCompliant && !cert.issued) {
            html += '<p style="color: #10b981; font-weight: bold; margin-top: 10px;">✅ Ready for certification</p>';
        } else if (cert.issued) {
            html += '<p style="color: #f59e0b; font-weight: bold; margin-top: 10px;">⚠️ Already certified</p>';
        } else {
            html += '<p style="color: #ef4444; font-weight: bold; margin-top: 10px;">❌ Not ready for certification</p>';
        }
        html += '</div>';
        
        resultDiv.innerHTML = html;
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = '<div class="alert-error">Batch not found or error occurred</div>';
    }
}

// Distributor: Transfer Ownership
async function uiTransferOwnership() {
    const id = document.getElementById("dbId").value.trim();
    const toAddr = document.getElementById("dToAddress").value.trim();

    if (!id || !toAddr) return alert("Fill all fields");

    try {
        const tx = await contract.transferOwnership(id, toAddr);
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert("Ownership transferred successfully!");
        
        document.getElementById("dbId").value = "";
        document.getElementById("dToAddress").value = "";
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// Retailer: Verify Batch
async function verifyBatchForRetail() {
    const id = document.getElementById("rbId").value.trim();
    if (!id) return alert("Enter Batch ID");

    const resultDiv = document.getElementById("retailVerifyResult");

    try {
        const [batch, slaughter, cert] = await contract.getBatchDetails(id);
        const isValid = await contract.isCertificateValid(id);
        
        let html = '<div style="padding: 15px; background: #f3f4f6; border-radius: 8px; margin-top: 15px;">';
        html += `<p><strong>Product:</strong> ${batch.productName}</p>`;
        html += `<p><strong>Quantity:</strong> ${batch.chickenCount}</p>`;
        html += `<p><strong>Current Owner:</strong> ${batch.currentOwner}</p>`;
        html += `<p><strong>Halal Certified:</strong> ${cert.issued ? 'Yes' : 'No'}</p>`;
        html += `<p><strong>Certificate Valid:</strong> ${isValid ? 'Yes' : 'No'}</p>`;
        
        if (cert.issued && isValid) {
            html += '<p style="color: #10b981; font-weight: bold; margin-top: 10px;">✅ Product verified and ready for sale</p>';
        } else {
            html += '<p style="color: #ef4444; font-weight: bold; margin-top: 10px;">❌ Cannot sell - certification issues</p>';
        }
        html += '</div>';
        
        resultDiv.innerHTML = html;
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = '<div class="alert-error">Batch not found or error occurred</div>';
    }
}

// Farmer: Transfer Ownership to Distributor
async function uiFarmerTransfer() {
    const id = document.getElementById("fbTransferId").value.trim();
    const toAddr = document.getElementById("fToAddress").value.trim();

    if (!id || !toAddr) return alert("Fill all fields");

    try {
        const tx = await contract.transferOwnership(id, toAddr);
        alert("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        alert("Ownership transferred to Distributor!");
        
        // Clear form
        document.getElementById("fbTransferId").value = "";
        document.getElementById("fToAddress").value = "";
    } catch (err) {
        console.error(err);
        alert("Error: " + (err.reason || err.message));
    }
}

// Public: Track Batch
async function trackBatch() {
    const batchId = document.getElementById("batchIdInput").value.trim();
    if (!batchId) return alert("Enter a Batch ID");
    if (!contract) return alert("Wallet not connected");

    try {
        const [batch, slaughter, cert, ownerships] = await contract.getBatchDetails(batchId);

        // Product info
        document.getElementById("pName").innerText = batch.productName;
        document.getElementById("pCount").innerText = batch.chickenCount.toString();
        document.getElementById("pFarmer").innerText = `${batch.farmer.slice(0, 6)}...${batch.farmer.slice(-4)}`;
        document.getElementById("pOwner").innerText = `${batch.currentOwner.slice(0, 6)}...${batch.currentOwner.slice(-4)}`;
        
        const statusBadge = document.getElementById("pStatus");
        statusBadge.innerText = batch.status;
        statusBadge.className = "status-badge";
        if (batch.status === "Certified Halal") statusBadge.classList.add("status-certified");
        else if (batch.status === "Slaughtered") statusBadge.classList.add("status-slaughtered");
        else if (batch.status === "Produced") statusBadge.classList.add("status-produced");
        else statusBadge.classList.add("status-pending");

        // Slaughter info
        document.getElementById("sMethodDisplay").innerText = slaughter.method || "-";
        document.getElementById("sCompliantDisplay").innerText = slaughter.shariahCompliant ? "Yes ✓" : "No";
        document.getElementById("sHouse").innerText = slaughter.slaughterhouse !== "0x0000000000000000000000000000000000000000" 
            ? `${slaughter.slaughterhouse.slice(0, 6)}...${slaughter.slaughterhouse.slice(-4)}` 
            : "-";
        document.getElementById("sDate").innerText = slaughter.date > 0 
            ? new Date(slaughter.date * 1000).toLocaleString() 
            : "-";

        // Certificate info
        document.getElementById("certAuth").innerText = cert.authority !== "0x0000000000000000000000000000000000000000"
            ? `${cert.authority.slice(0, 6)}...${cert.authority.slice(-4)}`
            : "-";
        document.getElementById("certIssued").innerText = cert.issuedAt > 0 
            ? new Date(cert.issuedAt * 1000).toLocaleDateString() 
            : "-";
        document.getElementById("certExpiry").innerText = cert.expiryDate > 0 
            ? new Date(cert.expiryDate * 1000).toLocaleDateString() 
            : "-";
        document.getElementById("certValid").innerText = cert.issued && Date.now()/1000 <= cert.expiryDate 
            ? "Yes ✓" 
            : "No";

        // Ownership history
        const ownershipList = document.getElementById("ownershipList");
        ownershipList.innerHTML = "";
        
        if (ownerships.length === 0) {
            ownershipList.innerHTML = '<p style="color: #6b7280;">No ownership transfers yet</p>';
        } else {
            ownerships.forEach(o => {
                const item = document.createElement("div");
                item.className = "timeline-item";
                item.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <strong>From: ${o.from.slice(0, 6)}...${o.from.slice(-4)} → To: ${o.to.slice(0, 6)}...${o.to.slice(-4)}</strong>
                        <small>${new Date(o.transferredAt * 1000).toLocaleString()}</small>
                    </div>
                `;
                ownershipList.appendChild(item);
            });
        }

        document.getElementById("displayArea").classList.remove("hidden");
    } catch (err) {
        console.error(err);
        alert("Batch not found or error fetching details");
    }
}

// Initialize on load
window.addEventListener("DOMContentLoaded", init);