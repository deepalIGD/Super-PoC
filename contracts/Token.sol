// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//check
contract A$DC is ERC20 {
    constructor()
        ERC20("A$DC", "A$DC"){
        _mint(msg.sender, 10000000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        amount = amount * 10 ** decimals();
        _mint(to, amount);
    }
}
