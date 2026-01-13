// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HalalSupplyChain {

    // ====== ROLES ======
    address public admin;
    address public jakim;

    mapping(address => bool) public farmers;
    mapping(address => bool) public slaughterhouses;
    mapping(address => bool) public distributors;
    mapping(address => bool) public retailers;

    // ====== STRUCTS ======
    struct Batch {
        string batchId;
        string productName;      
        uint256 chickenCount;
        address farmer;
        address currentOwner;
        string status;             
        bool exists;
    }

    struct SlaughterInfo {
        uint256 date;
        string method;
        bool shariahCompliant;
        address slaughterhouse;
        bool recorded;
    }

    struct HalalCertificate {
        bool issued;
        uint256 issuedAt;
        uint256 expiryDate;
        address authority;
    }

    struct Ownership {
        address from;
        address to;
        uint256 transferredAt;
    }

    // ====== STORAGE ======
    mapping(string => Batch) public batches;
    mapping(string => SlaughterInfo) public slaughterInfos;
    mapping(string => HalalCertificate) public certificates;
    mapping(string => Ownership[]) public ownershipHistory;

    // ====== EVENTS ======
    event BatchCreated(string batchId, string productName, address farmer, uint256 time);
    event SlaughterRecorded(string batchId, address slaughterhouse, uint256 time);
    event HalalCertificateIssued(string batchId, address authority, uint256 time);
    event OwnershipTransferred(string batchId, address from, address to, uint256 time);

    // ====== MODIFIERS ======
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyFarmer() {
        require(farmers[msg.sender], "Not farmer");
        _;
    }

    modifier onlySlaughterhouse() {
        require(slaughterhouses[msg.sender], "Not slaughterhouse");
        _;
    }

    modifier onlyJakim() {
        require(msg.sender == jakim, "Not JAKIM");
        _;
    }

    // ====== CONSTRUCTOR ======
    // initialization before deplouing contract
    constructor(address _jakim) {
        admin = msg.sender;
        jakim = _jakim;
    }

    // ====== ADMIN FUNCTIONS ======
    // to assign addresses as certain roles
    function registerFarmer(address _farmer) external onlyAdmin {
        farmers[_farmer] = true;
    }

    function registerSlaughterhouse(address _slaughterhouse) external onlyAdmin {
        slaughterhouses[_slaughterhouse] = true;
    }

    function registerDistributor(address _distributor) external onlyAdmin {
        distributors[_distributor] = true;
    }

    function registerRetailer(address _retailer) external onlyAdmin {
        retailers[_retailer] = true;
    }

    // ====== CORE FUNCTIONS ======

    // 1. Farmer creates batch
    function createBatch(
        string memory _batchId,
        string memory _productName,
        uint256 _chickenCount
    ) external onlyFarmer {

        require(!batches[_batchId].exists, "Batch already exists");

        batches[_batchId] = Batch({
            batchId: _batchId,
            productName: _productName,
            chickenCount: _chickenCount,
            farmer: msg.sender,
            currentOwner: msg.sender,
            status: "Produced",    
            exists: true
        });

        emit BatchCreated(_batchId, _productName, msg.sender, block.timestamp);
    }

    // 2. Slaughterhouse records slaughter
    function recordSlaughter(
        string memory _batchId,
        string memory _method,
        bool _shariahCompliant
    ) external onlySlaughterhouse {

        require(batches[_batchId].exists, "Batch not found");
        require(!slaughterInfos[_batchId].recorded, "Already recorded");

        slaughterInfos[_batchId] = SlaughterInfo({
            date: block.timestamp,
            method: _method,
            shariahCompliant: _shariahCompliant,
            slaughterhouse: msg.sender,
            recorded: true
        });

        batches[_batchId].status = "Slaughtered"; 

        emit SlaughterRecorded(_batchId, msg.sender, block.timestamp);
    }

    // 3️. JAKIM issues halal certificate
    function issueHalalCertificate(string memory _batchId)
        external
        onlyJakim
    {
        require(batches[_batchId].exists, "Batch not found");
        require(slaughterInfos[_batchId].recorded, "Slaughter not recorded");
        require(slaughterInfos[_batchId].shariahCompliant, "Not shariah compliant");
        require(!certificates[_batchId].issued, "Already issued");

        certificates[_batchId] = HalalCertificate({
            issued: true,
            issuedAt: block.timestamp,
            expiryDate: block.timestamp + (4 * 365 days),
            authority: msg.sender
        });

        batches[_batchId].status = "Certified Halal";

        emit HalalCertificateIssued(_batchId, msg.sender, block.timestamp);
    }

    // 4️. Transfer ownership (WITH SAFETY CHECK)
    function transferOwnership(string memory _batchId, address _to) external {
        require(batches[_batchId].exists, "Batch not found");
        require(certificates[_batchId].issued, "No halal certificate");

        // ✅ NEW SAFETY CHECK
        require(
            block.timestamp <= certificates[_batchId].expiryDate,
            "Halal certificate expired"
        );

        require(batches[_batchId].currentOwner == msg.sender, "Not owner");

        ownershipHistory[_batchId].push(Ownership({
            from: msg.sender,
            to: _to,
            transferredAt: block.timestamp
        }));

        batches[_batchId].currentOwner = _to;

        emit OwnershipTransferred(_batchId, msg.sender, _to, block.timestamp);
    }

    // ====== READ FUNCTIONS ======
    // for end user to track the supply chain (can change to QR later on)
    function getBatchDetails(string memory _batchId)
        external
        view
        returns (
            Batch memory,
            SlaughterInfo memory,
            HalalCertificate memory,
            Ownership[] memory
        )
    {
        require(batches[_batchId].exists, "Batch not found");

        return (
            batches[_batchId],
            slaughterInfos[_batchId],
            certificates[_batchId],
            ownershipHistory[_batchId]
        );
    }

    function isCertificateValid(string memory _batchId)
        external
        view
        returns (bool)
    {
        if (!certificates[_batchId].issued) return false;
        return block.timestamp <= certificates[_batchId].expiryDate;
    }
}
