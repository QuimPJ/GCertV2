// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';


contract FoundStore is ReentrancyGuard {
    // Libraries
    using SafeERC20 for IERC20;
    using Address for address payable;


    function transferIn() external payable {
        require(msg.value >= 0, "Insufficient payment");

    }

    function transferOut(address to, uint256 amount) external nonReentrant {
        if (amount == 0 || to == address(0)) return;
        payable(to).sendValue(amount);
    }
}