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

import { SubmitMetadataTestKit } from "../../testkits/module/datasets/DatasetsMetadataTestKit"
import { SubmitRequirementTestKit } from "../../testkits/module/datasets/DatasetsRequirementTestKit"
import {
    SubmitDatasetProofRootTestKit,
    SubmitDatasetProofTestKit,
    SubmitDatasetProofCompletedTestKit,
} from "../../testkits/module/datasets/DatasetsProofTestKit"
import { SubmitDatasetChallengeTestKit } from "../../testkits/module/datasets/DatasetsChallengeTestKit"
import {
    getContractsManager,
    getGenerator,
    getDatasetsHelper,
} from "../../fixtures"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
/**
 * Test suite for the Datasets functionality.
 */
describe("datasets", async () => {
    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        this.sharedData.datasetHelper = getDatasetsHelper()
        this.sharedData.datasetsAssertion = new DatasetsAssertion(
            this.sharedData.contractsManager
        )
    })

    /**
     * Tests successful submission of dataset metadata.
     */
    it("submitDatasetMetadata", async function () {
        const testKit = new SubmitMetadataTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetsHelper!
        )
        this.sharedData.datasetId = await testKit.run()
    })

    /**
     * Tests submission of dataset requirements.
     */
    it("submitDatasetRequirement", async function () {
        try {
            const testKit = new SubmitRequirementTestKit(
                this.sharedData.datasetsAssertion!,
                this.sharedData.generator!,
                this.sharedData.contractsManager!
            )
            this.sharedData.datasetId = await testKit.run(
                this.sharedData.datasetId
            )
        } catch (error) {
            throw error
        }
    })

    it("submitDatasetProofRoot", async function () {
        const testKit = new SubmitDatasetProofRootTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper
        )
        this.sharedData.datasetId = await testKit.run(this.sharedData.datasetId)
    })

    /**
     * Tests successful submission of dataset proof.
     */
    it("submitDatasetProof", async function () {
        const testKit = new SubmitDatasetProofTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper
        )

        this.sharedData.datasetId = await testKit.run(this.sharedData.datasetId)
    })

    /**
     * Tests submission of dataset proof completed.
     */
    it("submitDatasetProofCompleted", async function () {
        const testKit = new SubmitDatasetProofCompletedTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper
        )

        this.sharedData.datasetId = await testKit.run(this.sharedData.datasetId)
    })

    /**
     * Tests submission of dataset challenge.
     */
    it("submitDatasetChallengeProof", async function () {
        const testKit = new SubmitDatasetChallengeTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper()
        )
        this.sharedData.datasetId = await testKit.run(this.sharedData.datasetId)
    })
})
