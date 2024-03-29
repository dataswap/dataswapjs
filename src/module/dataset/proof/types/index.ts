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

import { Entity } from "@unipackage/ddd"
import { DataType } from "../../../../shared/types/dataType"

/**
 * Interface representing proofs information for a dataset.
 * @interface
 */
export interface DatasetProofs {
    datasetId: number
    dataType: DataType
    leafHashes: string[]
    leafIndex: bigint
    leafSizes: bigint[]
    completed: boolean
}

/**
 * Class representing a DatasetProofs entity.
 * @class
 * @extends Entity<DatasetProofs>
 */
export class DatasetProofs extends Entity<DatasetProofs> {}

/**
 * Interface representing proofs information for a dataset.
 * @interface
 */
export interface DatasetProofsWithhCarIds {
    datasetId: number
    dataType: DataType
    leaves: bigint[]
    leafIndex: bigint
    completed: boolean
}

/**
 * Class representing a DatasetProofs entity.
 * @class
 * @extends Entity<DatasetProofsWithhCarIds>
 */
export class DatasetProofsWithhCarIds extends Entity<DatasetProofsWithhCarIds> {}

/**
 * Interface representing proofs metadata information for a dataset.
 * @interface
 */
export interface DatasetProofMetadata {
    datasetId: number
    datasetSize: bigint
    dataType: DataType
    mappingFilesAccessMethod: string
    rootHash: string
    valid: boolean
    submitter?: string
}

/**
 * Class representing a DatasetProofMetadata entity.
 * @class
 * @extends Entity<DatasetProofMetadata>
 */
export class DatasetProofMetadata extends Entity<DatasetProofMetadata> {}
