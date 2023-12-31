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

import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { handleEvmError } from "../../shared/error"
import { IDatacapsAssertion } from "../../interfaces/assertions/module/IDatacapsAssertion"

export class DatacapsAssertion implements IDatacapsAssertion {
    private contractsManager: IContractsManager
    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }

    /**
     * Retrieves the chunk collateral funds for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectChunkCollateralFunds - Expected chunk collateral funds.
     * @returns A Promise indicating the assertion result.
     */
    async getDatacapChunkCollateralFundsAssertion(
        matchingId: number,
        expectChunkCollateralFunds: bigint
    ): Promise<void> {
        let chunkCollateralFunds = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .getDatacapChunkCollateralFunds(matchingId)
        )
        expect(expectChunkCollateralFunds).to.be.equal(
            BigInt(chunkCollateralFunds.data)
        )
    }

    /**
     * Retrieves the chunk burn funds for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectChunkBurnFunds - Expected chunk burn funds.
     * @returns A Promise indicating the assertion result.
     */
    async getDatacapChunkBurnFundsAssertion(
        matchingId: number,
        expectChunkBurnFunds: bigint
    ): Promise<void> {
        let chunkBurnFunds = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .getDatacapChunkBurnFunds(matchingId)
        )
        expect(expectChunkBurnFunds).to.be.equal(BigInt(chunkBurnFunds.data))
    }

    /**
     * Retrieves the collateral requirement for datacaps.
     * @param expectCollateraRequirement - Expected collateral requirement.
     * @returns A Promise indicating the assertion result.
     */
    async getCollateralRequirementAssertion(
        expectCollateraRequirement: bigint
    ): Promise<void> {
        let collaterealRequirement = await handleEvmError(
            this.contractsManager.DatacapsEvm().getCollateralRequirement()
        )
        expect(expectCollateraRequirement).to.be.equal(
            BigInt(collaterealRequirement.data)
        )
    }

    /**
     * Retrieves the available datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectAvailableDatacaps - Expected available datacaps.
     * @returns A Promise indicating the assertion result.
     */
    async getAvailableDatacapAssertion(
        matchingId: number,
        expectAvailableDatacaps: bigint
    ): Promise<void> {
        let AvailableDatacaps = await handleEvmError(
            this.contractsManager.DatacapsEvm().getAvailableDatacap(matchingId)
        )
        expect(expectAvailableDatacaps).to.be.equal(
            BigInt(AvailableDatacaps.data)
        )
    }

    /**
     * Retrieves the allocated datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectAllocatedDatacaps - Expected allocated datacaps.
     * @returns A Promise indicating the assertion result.
     */
    async getAllocatedDatacapAssertion(
        matchingId: number,
        expectAllocatedDatacaps: bigint
    ): Promise<void> {
        let allocatedDatacap = await handleEvmError(
            this.contractsManager.DatacapsEvm().getAllocatedDatacap(matchingId)
        )
        expect(expectAllocatedDatacaps).to.be.equal(
            BigInt(allocatedDatacap.data)
        )
    }

    /**
     * Retrieves the total datacap allocation requirement for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectTotalDatacapRequirement - Expected total datacap allocation requirement.
     * @returns A Promise indicating the assertion result.
     */
    async getTotalDatacapAllocationRequirementAssertion(
        matchingId: number,
        expectTotalDatacapRequirement: bigint
    ): Promise<void> {
        let totalDatacapRequirement = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .getTotalDatacapAllocationRequirement(matchingId)
        )
        expect(expectTotalDatacapRequirement).to.be.equal(
            totalDatacapRequirement.data
        )
    }

    /**
     * Retrieves the remaining unallocated datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRemainUnallocatedDatacaps - Expected remaining unallocated datacaps.
     * @returns A Promise indicating the assertion result.
     */
    async getRemainingUnallocatedDatacapAssertion(
        matchingId: number,
        expectRemainUnallocatedDatacaps: bigint
    ): Promise<void> {
        let remainUnallocated = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .getRemainingUnallocatedDatacap(matchingId)
        )
        expect(expectRemainUnallocatedDatacaps).to.be.equal(
            BigInt(remainUnallocated.data)
        )
    }

    /**
     * Checks if the next datacap allocation is valid for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if the next allocation is valid.
     * @returns A Promise indicating the assertion result.
     */
    async isNextDatacapAllocationValidAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .isNextDatacapAllocationValid(matchingId)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Adds datacap chunk collateral for a matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @param expectAddAmount - Expected amount to add as chunk collateral.
     * @returns A Promise indicating the assertion result.
     */
    async addDatacapChunkCollateralAssertion(
        caller: string,
        matchingId: number,
        expectAddAmount: bigint
    ): Promise<void> {
        this.contractsManager.DatacapsEvm().getWallet().setDefault(caller)
        const chunkCollateralFund = await this.contractsManager
            .DatacapsEvm()
            .getDatacapChunkCollateralFunds(matchingId)

        const needFund = expectAddAmount - chunkCollateralFund.data!
        if (needFund > 0) {
            await handleEvmError(
                this.contractsManager
                    .DatacapsEvm()
                    .addDatacapChunkCollateral(matchingId, {
                        value: needFund,
                    })
            )
        }

        this.getDatacapChunkCollateralFundsAssertion(
            matchingId,
            expectAddAmount
        )
    }

    /**
     * Requests datacap allocation for a specific matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @returns A Promise indicating the assertion result.
     */
    async requestAllocateDatacapAssertion(
        caller: string,
        matchingId: number
    ): Promise<void> {
        const [allocated, availableDatacap, remainingUnallocated] =
            await Promise.all([
                handleEvmError(
                    this.contractsManager
                        .DatacapsEvm()
                        .getAllocatedDatacap(matchingId)
                ),
                handleEvmError(
                    this.contractsManager
                        .DatacapsEvm()
                        .getAvailableDatacap(matchingId)
                ),
                handleEvmError(
                    this.contractsManager
                        .DatacapsEvm()
                        .getRemainingUnallocatedDatacap(matchingId)
                ),
            ])

        await this.isNextDatacapAllocationValidAssertion(matchingId, true)
        await this.getTotalDatacapAllocationRequirementAssertion(
            matchingId,
            BigInt(allocated.data + remainingUnallocated.data)
        )

        this.contractsManager.DatacapsEvm().getWallet().setDefault(caller)

        let collaterealRequirement = await handleEvmError(
            this.contractsManager.DatacapsEvm().getCollateralRequirement()
        )
        await this.addDatacapChunkCollateralAssertion(
            caller,
            matchingId,
            collaterealRequirement.data
        )

        const tx = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .requestAllocateDatacap(matchingId)
        )

        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager
            .DatacapsEvm()
            .getTransactionReceipt(tx.data.hash)

        const ret = this.contractsManager
            .DatacapsEvm()
            .getEvmEventArgs(receipt!, "DatacapAllocated")
        const allocatedCapacity = ret.data.allocatedCapacity

        let chunkCollateralFunds = await handleEvmError(
            this.contractsManager
                .DatacapsEvm()
                .getDatacapChunkCollateralFunds(matchingId)
        )

        await Promise.all([
            this.getAllocatedDatacapAssertion(
                matchingId,
                allocated.data + allocatedCapacity
            ),
            this.getAvailableDatacapAssertion(
                matchingId,
                availableDatacap.data + allocatedCapacity
            ),

            this.getRemainingUnallocatedDatacapAssertion(
                matchingId,
                BigInt(remainingUnallocated.data - allocatedCapacity)
            ),

            this.getDatacapChunkCollateralFundsAssertion(
                matchingId,
                chunkCollateralFunds.data
            ),
            this.getDatacapChunkBurnFundsAssertion(matchingId, BigInt(0)),
        ])
    }
}
