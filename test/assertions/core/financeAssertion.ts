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

import { assert } from "chai"
import { equal } from "@unipackage/utils"
import { EscrowType } from "../../../src/shared/types/financeType"
import { FinanceEvm } from "../../../src/core/finance/repo/evm"
import {
    DatasetOverview,
    MatchingOverview,
    StorageOverview,
    AccountOverview,
    AccountIncome,
    AccountEscrow,
} from "../../../src/core/finance/types"
import { handleEvmError } from "../../../src/shared/errors"
import { IFinanceAssertion } from "../../interfaces/assertions/core/IFinanceAssertion"

/**
 * Class representing assertions for an FinanceEvm instance.
 * @implements {IFinanceAssertion}
 */
export class FinanceAssertion implements IFinanceAssertion {
    private finance: FinanceEvm

    /**
     * Creates an instance of FinanceAssertion.
     * @param finance The FinanceEvm instance to perform assertions on.
     */
    constructor(finance: FinanceEvm) {
        this.finance = finance
    }

    /**
     * Asserts that the fetched dataset overview matches the expected dataset overview.
     * @param token - The token associated with the dataset.
     * @param expectDatasetOverview - The expected dataset overview.
     * @returns A promise that resolves if the assertion passes, otherwise it rejects with an error.
     */
    async datasetOverviewAssertion(
        token: string,
        expectDatasetOverview: DatasetOverview
    ) {
        let datasetOverview = await handleEvmError(
            this.finance.datasetOverview(token)
        )
        assert.isTrue(
            equal(expectDatasetOverview, datasetOverview),
            "datasetOverview should be expect expectDatasetOverview"
        )
    }

    /**
     * Asserts that the fetched matching overview matches the expected matching overview.
     * @param token - The token associated with the matching.
     * @param expectMatchingOverview - The expected matching overview.
     * @returns A promise that resolves if the assertion passes, otherwise it rejects with an error.
     */
    async matchingOverviewAssertion(
        token: string,
        expectMatchingOverview: MatchingOverview
    ) {
        let matchingOverview = await handleEvmError(
            this.finance.matchingOverview(token)
        )
        assert.isTrue(
            equal(expectMatchingOverview, matchingOverview),
            "matchingOverview should be expect expectMatchingOverview"
        )
    }

    /**
     * Asserts that the fetched storage overview matches the expected storage overview.
     * @param token - The token associated with the storage.
     * @param expectStorageOverview - The expected storage overview.
     * @returns A promise that resolves if the assertion passes, otherwise it rejects with an error.
     */
    async storageOverviewAssertion(
        token: string,
        expectStorageOverview: StorageOverview
    ) {
        let storageOverview = await handleEvmError(
            this.finance.storageOverview(token)
        )
        assert.isTrue(
            equal(expectStorageOverview, storageOverview),
            "storageOverview should be expect expectStorageOverview"
        )
    }

    /**
     * Asserts the account overview matches the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the account overview (e.g., FIL, ERC-20).
     * @param expectAccountOverview The expected account overview.
     * @returns A Promise resolving to void.
     */
    async getAccountOverviewAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        expectAccountOverview: AccountOverview
    ) {
        let accountOverview = await handleEvmError(
            this.finance.getAccountOverview(datasetId, matchingId, owner, token)
        )
        assert.isTrue(
            equal(expectAccountOverview, accountOverview),
            "Owner accountOverview should be expect AccountOverview"
        )
    }

    /**
     * Asserts the account income matches the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for trading income details (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAccountIncome The expected account income.
     * @returns A Promise resolving to void.
     */
    async getAccountIncomeAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAccountIncome: AccountIncome
    ) {
        let accountIncome = await handleEvmError(
            this.finance.getAccountIncome(
                datasetId,
                matchingId,
                owner,
                token,
                type
            )
        )
        assert.isTrue(
            equal(expectAccountIncome, accountIncome),
            "Owner accountIncome should be expect accountIncome"
        )
    }

    /**
     * Asserts the account escrow details match the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrowed amount (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAccountEscrow The expected account escrow details.
     * @returns A Promise resolving to void.
     */
    async getAccountEscrowAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAccountEscrow: AccountEscrow
    ) {
        let accountEscrow = await handleEvmError(
            this.finance.getAccountEscrow(
                datasetId,
                matchingId,
                owner,
                token,
                type
            )
        )
        expectAccountEscrow.latestHeight = accountEscrow.latestHeight // skip latestHeight
        assert.isTrue(
            equal(expectAccountEscrow, accountEscrow),
            "Owner accountEscrow should be expect accountEscrow"
        )
    }

    /**
     * Asserts the escrow requirement matches the expected amount.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrow requirement (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAmount The expected escrow requirement amount as a bigint.
     * @returns A Promise resolving to void.
     */
    async getEscrowRequirementAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAmount: bigint
    ) {
        let amount = await handleEvmError(
            this.finance.getEscrowRequirement(
                datasetId,
                matchingId,
                owner,
                token,
                type
            )
        )
        assert.isTrue(
            equal(expectAmount, amount),
            "Owner amount should be expect amount"
        )
    }

    /**
     * Asserts whether the escrowed funds are enough based on the expected value.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for escrow handling (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectValue The expected boolean value indicating if escrowed funds are enough.
     * @returns A Promise resolving to void.
     */
    async isEscrowEnoughAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectValue: boolean
    ) {
        let value = await handleEvmError(
            this.finance.isEscrowEnough(
                datasetId,
                matchingId,
                owner,
                token,
                type
            )
        )
        assert.isTrue(
            equal(expectValue, value),
            "Owner value should be expect value"
        )
    }

    /**
     * Asserts the deposit operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the deposit (e.g., FIL, ERC-20).
     * @param amount The deposit amount.
     * @returns A Promise resolving to void.
     */
    async depositAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        amount: bigint
    ) {
        let accountOverview = await handleEvmError(
            this.finance.getAccountOverview(datasetId, matchingId, owner, token)
        )

        this.finance
            .getWallet()
            .setDefault(process.env.DATASWAP_GOVERNANCE as string)

        await handleEvmError(
            this.finance.deposit(datasetId, matchingId, owner, token, {
                value: amount,
            })
        )

        accountOverview.deposited += amount
        accountOverview.balance += amount
        accountOverview.available += amount

        await this.getAccountOverviewAssertion(
            datasetId,
            matchingId,
            owner,
            token,
            accountOverview
        )
    }

    /**
     * Asserts the withdraw operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for withdrawal (e.g., FIL, ERC-20).
     * @param amount The amount to be withdrawn as a bigint.
     * @returns A Promise resolving to void.
     */
    async withdrawAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        amount: bigint
    ) {
        let accountOverview = await handleEvmError(
            this.finance.getAccountOverview(datasetId, matchingId, owner, token)
        )

        this.finance
            .getWallet()
            .setDefault(process.env.DATASWAP_GOVERNANCE as string)

        await handleEvmError(
            this.finance.withdraw(datasetId, matchingId, owner, token, amount)
        )

        accountOverview.balance -= amount
        accountOverview.available -= amount
        accountOverview.withdrawn += amount

        await this.getAccountOverviewAssertion(
            datasetId,
            matchingId,
            owner,
            token,
            accountOverview
        )
    }

    /**
     * Asserts the escrow operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to void.
     */
    async escrowAssertion(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType
    ) {}

    /**
     * Asserts the claim escrow operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow handling (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to void.
     */
    async claimEscrowAssertion(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType
    ) {}
}
