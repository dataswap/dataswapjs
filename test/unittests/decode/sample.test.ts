/*******************************************************************************
 *   (c) 2023 unipackage
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

import "mocha"
import {
    ChainFilecoinRPC,
    Message,
    ChainService,
    MessageMongoDatastore,
    BlockMongoDatastore,
    TipsetMongoDatastore,
    AddressesFilterReplayStrategy,
} from "@unipackage/filecoin" // Replace with the actual path to your TypeScript file
import { DatasetMetadataEvm } from "../../../src/module/dataset/metadata/repo/evm"
import datasetMetaAbi from "@dataswapcore/contracts/abi/v0.8/Datasets.json"
import { Context } from "mocha"
import { expect } from "chai"
import * as dotenv from "dotenv"
import assert from "assert"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { ValueFields } from "@unipackage/utils"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { createTargetMessage } from "../../shared/utils"
dotenv.config()

describe("ContractMessageDecoder", () => {
    const expectDecodeResult = {
        ok: true,
        data: {
            cid: {
                "/": "bafy2bzacebnjyelld3l7nxbtzqxg7ljs7sjsbkalz3szorwmu3wkulaqph6mm",
            },
            height: 1213438,
            timestamp: "",
            from: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
            to: "f410fai7exftlsq6igc35jsxij7twcza3feadlmtrjla",
            value: "0",
            method: "submitDatasetMetadata",
            params: {
                client: BigInt(1420),
                title: "title-0i4zeet",
                industry: "industry-0i4zeet",
                name: "dataset-0i4zeet",
                description: "description-0i4zeet",
                source: "aws://sdfa.com-0i4zeet",
                accessMethod: "dataswap.com/test-0i4zeet",
                sizeInBytes: BigInt(5120000),
                isPublic: true,
                version: BigInt(1),
                submitter: "0x15B2896f76Cee4E2C567e7bC671bB701D7339B30",
                createdBlockNumber: 1213438,
                datasetId: 1,
                status: DatasetState.MetadataSubmitted,
            },
            status: 0,
            return: "0x0000000000000000000000000000000000000000000000000000000000000001",
            datasetId: 1,
        },
    }

    const datasetmetaEvm = new DatasetMetadataEvm(
        datasetMetaAbi,
        "0x023e4b966b943c830b7d4cae84fe761641b29003",
        "https://api.calibration.node.glif.io/rpc/v1"
    )

    let message: Message

    beforeEach("Get origin Message", async () => {
        message = createTargetMessage({
            params: "WQLEkl3YoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA10aXRsZS0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQaW5kdXN0cnktMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2RhdGFzZXQtMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABNkZXNjcmlwdGlvbi0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWYXdzOi8vc2RmYS5jb20tMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGWRhdGFzd2FwLmNvbS90ZXN0LTBpNHplZXQAAAAAAAAA",
            returns: "WCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==",
        })
    })

    describe("#decoder-sample-code", () => {
        it("should ok", async function (this: Context) {
            this.timeout(10000)
            const contractMessage = datasetmetaEvm.decodeMessage(message)
            assert.deepStrictEqual(
                contractMessage.data,
                expectDecodeResult.data
            )
            expect(contractMessage.data.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data.params
            )
        })
    })
})
