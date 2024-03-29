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
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { DatasetRequirement } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { convertToNumberArray } from "../../../../../shared/arrayUtils"

/**
 * Interface representing the Ethereum Virtual Machine (EVM) call structure for dataset requirements.
 * @interface
 */
interface DatasetRequirementCallEvm {
    /**
     * Get dataset replicas count
     * @param datasetId The ID of the dataset to get the count of replicas of dataset.
     * @returns The count of replicas of dataset.
     */
    getDatasetReplicasCount(datasetId: number): Promise<EvmOutput<number>>
    /**
     *  Get dataset replica requirement
     * @param datasetId The ID of the dataset to get the requirement of replica.
     * @param index The index of replica to get requirement.
     * @returns The requirement of the replica.
     */
    getDatasetReplicaRequirement(
        datasetId: number,
        index: bigint
    ): Promise<EvmOutput<DatasetRequirement>>

    /**
     * Retrieves the block height at which the dataset requirement was completed.
     * @param datasetId The ID of the dataset.
     * @returns The block height at which the dataset requirement was completed.
     */
    getDatasetRequirementCompleteHeight(
        datasetId: number
    ): Promise<EvmOutput<number>>

    /**
     * Checks whether the dataset requirement has timed out.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to true if the dataset requirement has timed out, and false otherwise.
     */
    isDatasetRequirementTimeout(datasetId: number): Promise<EvmOutput<boolean>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
}

/**
 * Interface representing the Ethereum Virtual Machine (EVM) send structure for dataset requirements.
 * @interface
 */
interface DatasetRequirementSendEvm {
    /**
     * Submit replica requirement for a dataset
     * @param datasetId The ID of the dataset for which proof is submitted.
     * @param dataPreparers The client specified data preparer, which the client can either specify or not, but the parameter cannot be empty.
     * @param storageProviders The client specified storage provider, which the client can either specify or not, but the parameter cannot be empty.
     * @param regions The region specified by the client, and the client must specify a region for the replicas.
     * @param countrys The country specified by the client, and the client must specify a country for the replicas.
     * @param citys The citys specified by the client, when the country of a replica is duplicated, citys must be specified and cannot be empty.
     * @param amount The data preparer calculate fees.
     * @param options The options of transaction.
     */
    submitDatasetReplicaRequirements(
        datasetId: number,
        dataPreparers: string[][],
        storageProviders: string[][],
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][],
        _amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}
/**
 * Combined interface for EVM calls and transactions related to DatasetRequirement contract.
 */
export interface DatasetRequirementOriginEvm
    extends DatasetRequirementCallEvm,
        DatasetRequirementSendEvm {}

/**
 * Implementation of DatasetRequirementOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatasetReplicasCount",
    "getDatasetReplicaRequirement",
    "getDatasetRequirementCompleteHeight",
    "isDatasetRequirementTimeout",
    "roles",
])
@withSendMethod(["submitDatasetReplicaRequirements"])
export class DatasetRequirementOriginEvm extends EvmEx {}

/**
 * Extended class for DatasetRequirementEvm with additional message decoding.
 */
export class DatasetRequirementEvm extends DatasetRequirementOriginEvm {
    async getDatasetReplicaRequirement(
        datasetId: number,
        index: bigint
    ): Promise<EvmOutput<DatasetRequirement>> {
        const metaRes = await super.getDatasetReplicaRequirement(
            datasetId,
            index
        )
        if (metaRes.ok && metaRes.data) {
            let data = new DatasetRequirement({
                ...metaRes.data,
                index: index,
                datasetId: datasetId,
            })
            data.cityCodes = convertToNumberArray(data.cityCodes)

            return {
                ok: true,
                data: data,
            }
        }
        return metaRes
    }

    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetReplicaRequirements":
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
                break
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
