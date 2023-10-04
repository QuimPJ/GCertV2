// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Importar contratos necesarios
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./myNFT.sol";


/// @title OrderStore
/// @notice Persistent storage for Orders.sol
contract OrderStore is ReentrancyGuard {
    // Libraries
    //using EnumerableSet for EnumerableSet.UintSet;
    using Address for address payable;

    // Constants
    uint256 public constant UNIT = 10 ** 18;
    uint256 public constant BPS_DIVIDER = 10000;

    // Order struct
    struct Order {
        uint256 orderId; // incremental order id
        uint256 strategyId; // incremental order id
        address user; // user that usubmitted the order
        address asset; // Asset address, e.g. address(0) for ETH
        string market; // Market this order was submitted on
        uint256 margin; // Collateral tied to this order. In wei
        uint256 size; // Order size (margin * leverage). In wei
        uint256 price; // The order's price if its a trigger or protected order
        uint256 fee; // Fee amount paid. In wei
        bool isLong; // Wether the order is a buy or sell order
        uint8 orderType; // 0 = market, 1 = limit, 2 = stop
        bool isReduceOnly; // Wether the order is reduce-only
        uint256 timestamp; // block.timestamp at which the order was submitted
        uint256 expiry; // block.timestamp at which the order expires
        uint256 cancelOrderId; // orderId to cancel when this order executes
    }

    uint256 public oid; // incremental order id
    mapping(uint256 => Order) private orders; // order id => Order
    mapping(address => uint256[]) private userOrderIds; // user => [order ids..]
    uint256[] private marketOrderIds; // [order ids..]
    uint256[] private triggerOrderIds; // [order ids..]

    uint256 public maxMarketOrderTTL = 5 minutes;
    uint256 public maxTriggerOrderTTL = 180 days;
    uint256 public chainlinkCooldown = 5 minutes;

    bool public areNewOrdersPaused;
    bool public isProcessingPaused;

    constructor() {}

    // Setters

    /// @notice Disable submitting new orders
    /// @dev Only callable by governance
    function setAreNewOrdersPaused(bool b) external  {
        areNewOrdersPaused = b;
    }

    /// @notice Disable processing new orders
    /// @dev Only callable by governance
    function setIsProcessingPaused(bool b) external  {
        isProcessingPaused = b;
    }

    /// @notice Set duration until market orders expire
    /// @dev Only callable by governance
    /// @param amount Duration in seconds
    function setMaxMarketOrderTTL(uint256 amount) external  {
        require(amount > 0, '!amount');
        require(amount < maxTriggerOrderTTL, 'amount > maxTriggerOrderTTL');
        maxMarketOrderTTL = amount;
    }

    /// @notice Set duration until trigger orders expire
    /// @dev Only callable by governance
    /// @param amount Duration in seconds
    function setMaxTriggerOrderTTL(uint256 amount) external  {
        require(amount > 0, '!amount');
        require(amount > maxMarketOrderTTL, 'amount < maxMarketOrderTTL');
        maxTriggerOrderTTL = amount;
    }

    /// @notice Set duration after orders can be executed with chainlink
    /// @dev Only callable by governance
    /// @param amount Duration in seconds
    function setChainlinkCooldown(uint256 amount) external  {
        require(amount > 0, '!amount');
        chainlinkCooldown = amount;
    }

    /// @notice Adds order to storage
    /// @dev Only callable by other protocol contracts
    function add(Order memory order) external  returns (uint256) {
        uint256 nextOrderId = ++oid;
        order.orderId = nextOrderId;
        orders[nextOrderId] = order;
        userOrderIds[order.user].push(nextOrderId);
        if (order.orderType == 0) {
            marketOrderIds.push(order.orderId);
        } else {
            triggerOrderIds.push(order.orderId);
        }
        return nextOrderId;
    }

    /// @notice Removes order from store
    /// @dev Only callable by other protocol contracts
    /// @param orderId Order to remove
    function remove(uint256 orderId) external  {
      /*  Order memory order = orders[orderId];
        if (order.size == 0) return;
        userOrderIds[order.user].remove(orderId);
        marketOrderIds.remove(orderId);
        triggerOrderIds.remove(orderId);
        delete orders[orderId];
    */
    }

    /// @notice Updates `cancelOrderId` of `orderId`, e.g. TP order cancels a SL order and vice versa
    /// @dev Only callable by other protocol contracts
    /// @param orderId Order which cancels `cancelOrderId` on execution
    /// @param cancelOrderId Order to cancel when `orderId` executes
    function updateCancelOrderId(uint256 orderId, uint256 cancelOrderId) external  {
        Order storage order = orders[orderId];
        order.cancelOrderId = cancelOrderId;
    }

    /// @notice Returns a single order
    /// @param orderId Order to get
    function get(uint256 orderId) external view returns (Order memory) {
        return orders[orderId];
    }

    /// @notice Returns many orders
    /// @param orderIds Orders to get, e.g. [1, 2, 5]
    function getMany(uint256[] calldata orderIds) external view returns (Order[] memory) {
        uint256 length = orderIds.length;
        Order[] memory _orders = new Order[](length);

        for (uint256 i = 0; i < length; i++) {
            _orders[i] = orders[orderIds[i]];
        }

        return _orders;
    }

    /// @notice Returns market orders
    /// @param length Amount of market orders to return
    function getMarketOrders(uint256 length) external view returns (Order[] memory) {
        uint256 _length = marketOrderIds.length;
        if (length > _length) length = _length;

        Order[] memory _orders = new Order[](length);

        for (uint256 i = 0; i < length; i++) {
     //       _orders[i] = orders[marketOrderIds.at(i)];
        }

        return _orders;
    }

    /// @notice Returns trigger orders
    /// @param length Amount of trigger orders to return
    /// @param offset Offset to start
    function getTriggerOrders(uint256 length, uint256 offset) external view returns (Order[] memory) {
        uint256 _length = triggerOrderIds.length;
        if (length > _length) length = _length;

        Order[] memory _orders = new Order[](length);

        for (uint256 i = offset; i < length + offset; i++) {
        //    _orders[i] = orders[triggerOrderIds.at(i)];
        }

        return _orders;
    }

    /// @notice Returns orders of `user`
    function getUserOrders(address user) external view returns (Order[] memory) {
        uint256 length = userOrderIds[user].length;
        Order[] memory _orders = new Order[](length);

        for (uint256 i = 0; i < length; i++) {
          //  _orders[i] = orders[userOrderIds[user].at(i)];
        }

        return _orders;
    }

    /// @notice Returns amount of market orders
    function getMarketOrderCount() external view returns (uint256) {
        return marketOrderIds.length;
    }

    /// @notice Returns amount of trigger orders
    function getTriggerOrderCount() external view returns (uint256) {
        return triggerOrderIds.length;
    }

    /// @notice Returns order amount of `user`
    function getUserOrderCount(address user) external view returns (uint256) {
        return userOrderIds[user].length;
    }

    /// @notice Returns true if order is from `user`
    /// @param orderId order to check
    /// @param user user to check
    function isUserOrder(uint256 orderId, address user) external view returns (bool) {
        return false;//userOrderIds[user].contains(orderId);
    }
}

