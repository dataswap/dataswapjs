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
import chai from "chai"
import { DatasetProofMetadataMongoDatastore } from "../../../src/module/dataset/proof/repo/datastore"
import { DatasetProofMetadata } from "../../../src/module/dataset/proof/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const connection = DatabaseConnection.getInstance(
    "mongodb://127.0.0.1:27017/datastore"
)
const sampleDatasetProofMetadata: ValueFields<DatasetProofMetadata> = {
    datasetId: 5,
    datasetSize: BigInt(10),
    dataType: 1,
    mappingFilesAccessMethod: "0174kxc",
    rootHash:
        "0x000000000000000000000000000000000000000000000000000000000000012c",
    valid: true,
}
/**
 * Test suite for the DatasetsProof contract DatasetProofMetadataMongoDatastore functionality.
 */
describe("DatasetProofMetadataMongoDatastore", () => {
    const datastore = new DatasetProofMetadataMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of DatasetProofMetadataMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(
                DatasetProofMetadataMongoDatastore
            )
        })
    })

    describe("save", () => {
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a DatasetProofMetadata to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleDatasetProofMetadata
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ datasetId: 5 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
