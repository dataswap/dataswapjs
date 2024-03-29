/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import {
    EthersEvmEngine,
    Web3EvmEngine,
    EthersWallet,
    Web3Wallet,
    IWallet,
    Evm,
} from "@unipackage/net"
import { AbiFunctionFragment } from "web3"

/**
 * Constant representing the Ethereum Virtual Machine (EVM) engine used in the Ethers library.
 */
export const EvmEngine = EthersEvmEngine

/**
 * Constant representing the wallet class from the Ethers library.
 */
export const Wallet = EthersWallet

/**
 * Extended class for Ethereum Virtual Machine (EVM) with additional functionality.
 */
export class EvmEx extends Evm {
    constructor(
        abi: AbiFunctionFragment[],
        address: string,
        url?: string,
        wallet?: IWallet
    ) {
        super(new EvmEngine(abi, address, url, wallet))
    }

    /**
     * Asynchronously waits until the blockchain reaches the target block height.
     * @param targetBlockHeight The block height to wait for.
     * @param blockPeriod The block period(ms) to wait for.
     * @returns A Promise that resolves when the blockchain reaches the target block height.
     */
    async waitForBlockHeight(
        targetBlockHeight: number,
        blockPeriod: number
    ): Promise<void> {
        const etherProvider = super.getEtherProvider()
        const web3Provider = super.getWeb3()
        while (true) {
            let currentBlock: number = 0
            if (etherProvider) {
                currentBlock = await etherProvider.getBlockNumber()
            } else if (web3Provider) {
                currentBlock = Number(await web3Provider.eth.getBlockNumber())
            }

            if (currentBlock >= targetBlockHeight) {
                break
            }
            await new Promise((resolve) => setTimeout(resolve, blockPeriod))
        }
    }

    /**
     * Asynchronously retrieves the current block height.
     * @returns A Promise that resolves to the current block height as a number.
     */
    async getBlockHeight(): Promise<number> {
        const etherProvider = super.getEtherProvider()
        const web3Provider = super.getWeb3()
        let currentBlock: number = 0
        if (etherProvider) {
            currentBlock = await etherProvider.getBlockNumber()
        } else if (web3Provider) {
            currentBlock = Number(await web3Provider.eth.getBlockNumber())
        }
        return currentBlock
    }
}
