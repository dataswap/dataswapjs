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
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"
import {
    BasicStatisticsInfo,
    StorageStatisticsInfo,
    DatasetStorageStatisticsInfo,
    MatchingStorageStatisticsInfo,
} from "../../../../shared/types/statisticsType"
import { convertToNumberArray } from "../../../../shared/arrayUtils"

/**
 * Interface for EVM calls related to  Storages.
 */
interface StoragesCallEvm {
    /**
     * Retrieves an overview of count statistics.
     * @returns A promise that resolves with the count overview.
     */
    getCountOverview(): Promise<EvmOutput<BasicStatisticsInfo>>

    /**
     * Retrieves an overview of size statistics.
     * @returns A promise that resolves with the size overview.
     */
    getSizeOverview(): Promise<EvmOutput<BasicStatisticsInfo>>

    /**
     * Retrieves storage overview.
     */
    getStorageOverview(): Promise<EvmOutput<StorageStatisticsInfo>>

    /**
     * Retrieves storage overview for a specific dataset.
     * @param datasetId The ID of the dataset.
     */
    getDatasetStorageOverview(
        datasetId: number
    ): Promise<EvmOutput<DatasetStorageStatisticsInfo>>

    /**
     * Retrieves storage overview for a specific replica of a dataset.
     * @param datasetId The ID of the dataset.
     * @param replicaIndex The index of the replica.
     */
    getReplicaStorageOverview(
        datasetId: number,
        replicaIndex: bigint
    ): Promise<EvmOutput<DatasetStorageStatisticsInfo>>

    /**
     * Retrieves storage overview for a specific matching.
     * @param matchingId The ID of the matching.
     */
    getMatchingStorageOverview(
        matchingId: number
    ): Promise<EvmOutput<MatchingStorageStatisticsInfo>>

    /**
     * @dev Gets the list of done cars in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return An array of content identifiers of the done cars.
     */
    getStoredCars(matchingId: number): Promise<EvmOutput<number[]>>

    /**
     * @dev Gets the count of done cars in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return The count of done cars in the matchedstore.
     */
    getStoredCarCount(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @dev Checks if all cars are done in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return True if all cars are done in the matchedstore, otherwise false.
     */
    isAllStoredDone(matchingId: number): Promise<EvmOutput<boolean>>

    /**
     * @dev Checks if storage is completed for a specific matching ID.
     * @param matchingId The ID of the matching.
     * @returns A promise resolving to a boolean indicating whether storage is completed.
     */
    isStorageCompleted(matchingId: number): Promise<EvmOutput<boolean>>

    /**
     * @dev Checks if store expiration in the matchedstore.
     * @param matchingId The ID of the matching.
     */
    isStorageExpiration(matchingId: number): Promise<EvmOutput<boolean>>

    /**
     * Check if the next datacap allocation is valid for a matching.
     * @param matchingId The ID of the matching.
     * @returns A Promise representing the result of the validation.
     */
    isNextDatacapAllocationValid(
        matchingId: number
    ): Promise<EvmOutput<boolean>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
}

/**
 * Interface for EVM transactions related to  Storages.
 */
interface StoragesSendEvm {
    /**
     * @dev Completes storage for a specific matching ID with the provided array of IDs.
     * @param matchingId The ID of the matching.
     * @param ids An array of IDs to complete storage.
     * @returns A promise resolving to the transaction receipt.
     */
    completeStorage(matchingId: number, ids: number[]): Promise<EvmOutput<void>>
    /**
     * Register a Dataswap datacap.
     * @param size The size of the datacap to register.
     * @returns A Promise representing the result of the registration.
     */
    registDataswapDatacap(size: number): Promise<EvmOutput<void>>

    /**
     * @dev Submits multiple Filecoin claim Ids for a matchedstore after successful matching.
     * @param matchingId The ID of the matching.
     * @param provider A provider of storage provider of matching.
     * @param ids An array of content identifiers of the matched data.
     * @param claimIds An array of IDs of successful Filecoin storage deals.
     * @param options The options of transaction.
     */
    submitStorageClaimIds(
        matchingId: number,
        provider: number,
        ids: number[],
        claimIds: number[],
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Request to allocate datacap for a matching.
     * @param matchingId The ID of the matching.
     * @returns A Promise representing the result of the allocation request.
     */
    requestAllocateDatacap(matchingId: number): Promise<EvmOutput<number>>
}

/**
 * Combined interface for EVM calls and transactions related to  Storages.
 */
export interface StoragesOriginEvm extends StoragesCallEvm, StoragesSendEvm {}

/**
 * Implementation of  StoragesOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getCountOverview",
    "getSizeOverview",
    "getStorageOverview",
    "getDatasetStorageOverview",
    "getReplicaStorageOverview",
    "getMatchingStorageOverview",
    "getStoredCars",
    "getStoredCarCount",
    "isAllStoredDone",
    "isStorageExpiration",
    "isStorageCompleted",
    "isNextDatacapAllocationValid",
    "roles",
])
@withSendMethod([
    "completeStorage",
    "registDataswapDatacap",
    "submitStorageClaimIds",
    "requestAllocateDatacap",
])
export class StoragesOriginEvm extends EvmEx {}

/**
 * Extended class for  StoragesOriginEvm with additional message decoding.
 */
export class StoragesEvm extends StoragesOriginEvm {
    /**
     * Retrieves an overview of count statistics.
     * @returns A promise that resolves with the count overview.
     */
    async getCountOverview(): Promise<EvmOutput<BasicStatisticsInfo>> {
        const res = await super.getCountOverview()
        if (res.ok && res.data) {
            return {
                ok: true,
                data: new BasicStatisticsInfo({
                    ...res.data,
                }),
            }
        }
        return res
    }
    /**
     * Retrieves an overview of size statistics.
     * @returns A promise that resolves with the size overview.
     */
    async getSizeOverview(): Promise<EvmOutput<BasicStatisticsInfo>> {
        const res = await super.getSizeOverview()
        if (res.ok && res.data) {
            return {
                ok: true,
                data: new BasicStatisticsInfo({
                    ...res.data,
                }),
            }
        }
        return res
    }
    /**
     * Retrieves storage overview.
     */
    async getStorageOverview(): Promise<EvmOutput<StorageStatisticsInfo>> {
        const res = await super.getStorageOverview()
        if (res.ok && res.data) {
            return {
                ok: true,
                data: new StorageStatisticsInfo({
                    ...res.data,
                }),
            }
        }
        return res
    }

    /**
     * Retrieves storage overview for a specific dataset.
     * @param datasetId The ID of the dataset.
     */
    async getDatasetStorageOverview(
        datasetId: number
    ): Promise<EvmOutput<DatasetStorageStatisticsInfo>> {
        const res = await super.getDatasetStorageOverview(datasetId)
        if (res.ok && res.data) {
            let data = new DatasetStorageStatisticsInfo({
                ...res.data,
            })
            data.datasetId = datasetId
            return {
                ok: true,
                data: data,
            }
        }
        return res
    }

    /**
     * Retrieves storage overview for a specific replica of a dataset.
     * @param datasetId The ID of the dataset.
     * @param replicaIndex The index of the replica.
     */
    async getReplicaStorageOverview(
        datasetId: number,
        replicaIndex: bigint
    ): Promise<EvmOutput<DatasetStorageStatisticsInfo>> {
        const res = await super.getReplicaStorageOverview(
            datasetId,
            replicaIndex
        )
        if (res.ok && res.data) {
            let data = new DatasetStorageStatisticsInfo({
                ...res.data,
            })
            data.datasetId = datasetId
            data.replicaIndex = replicaIndex
            return {
                ok: true,
                data: data,
            }
        }
        return res
    }

    /**
     * Retrieves storage overview for a specific matching.
     * @param matchingId The ID of the matching.
     */
    async getMatchingStorageOverview(
        matchingId: number
    ): Promise<EvmOutput<MatchingStorageStatisticsInfo>> {
        const res = await super.getMatchingStorageOverview(matchingId)
        if (res.ok && res.data) {
            let data = new MatchingStorageStatisticsInfo({
                ...res.data,
            })
            data.storageProviders = convertToNumberArray(
                res.data.storageProviders!
            )
            data.matchingId = matchingId
            return {
                ok: true,
                data: data,
            }
        }
        return res
    }

    /**
     * Decode a DataswapMessage from an EVM message.
     *
     * @param msg - Message to decode.
     * @returns EvmOutput containing the decoded DataswapMessage.
     */
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "completeStorage":
            case "submitStorageClaimIds":
            case "requestAllocateDatacap":
                result.matchingId = Number(result.params.matchingId)
                result.params.matchingId = result.matchingId
                break
            case "registDataswapDatacap":
            case "upgradeTo":
                break
            default:
                return {
                    ok: false,
                    error: "Not support method!",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}
