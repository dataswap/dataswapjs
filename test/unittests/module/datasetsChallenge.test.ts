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
    getContractsManager,
    getGenerator,
    getDatasetsHelper,
} from "../../fixtures"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import { ApproveDatasetTestKit } from "../../testkits/module/datasets/DatasetsMetadataTestKit"

/**
 * Test suite for the datasets challenge functionality.
 */
describe("datasetsChallenge", async () => {
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
     * Tests submit chanllenge proof of dataset.
     * This test case has already been covered in the 'approveDataset' test. Skipping it here.
     */
    it.skip("submitChallengeProof", async function () {
        const testKit = new ApproveDatasetTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper()
        )
        await testKit.run()
    })
})
