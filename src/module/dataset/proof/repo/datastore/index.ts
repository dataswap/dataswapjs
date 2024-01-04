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
import { DataStore } from "@unipackage/datastore"
import { ValueFields } from "@unipackage/utils"
import { DatasetProofMetadata, DatasetProofs } from "../../types"
import {
    DatasetProofMetadataDocument,
    DatasetProofMetadataModel,
    DatasetProofsDocument,
    DatasetProofsModel,
} from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"

/**
 * Class representing a MongoDB datastore for DatasetProofMetadata entities.
 * Extends the DataStore class with DatasetProofMetadata and DatasetProofMetadataDocument.
 * @class
 */
export class DatasetProofMetadataMongoDatastore extends DataStore<
    ValueFields<DatasetProofMetadata>,
    DatasetProofMetadataDocument
> {
    /**
     * Creates an instance of DatasetProofMetadataMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetProofMetadata>,
                DatasetProofMetadataDocument
            >(DatasetProofMetadataModel, connection)
        )
    }
}
/**
 * Class representing a MongoDB datastore for DatasetProofs entities.
 * Extends the DataStore class with DatasetProofs and DatasetProofsDocument.
 * @class
 */
export class DatasetProofsMongoDatastore extends DataStore<
    ValueFields<DatasetProofs>,
    DatasetProofsDocument
> {
    /**
     * Creates an instance of DatasetProofsMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetProofs>,
                DatasetProofsDocument
            >(DatasetProofsModel, connection)
        )
    }
}
