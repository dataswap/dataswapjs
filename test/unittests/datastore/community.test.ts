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
import { MemberMongoDatastore } from "../../../src/core/community/repo/datastore"
import { Member, FinanceAccount } from "../../../src/core/community/types"
import { FIL } from "../../../src/shared/types/financeType"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const sampleMembers: ValueFields<Member> = new Member()

/**
 * Test suite for the community MemberMongoDatastore functionality.
 */
describe("MembersMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new MemberMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of MemberMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(MemberMongoDatastore)
        })
    })

    describe("save", () => {
        it.skip("should save a Members to the datastore", async () => {
            const createRes =
                await datastore.CreateOrupdateByUniqueIndexes(sampleMembers)
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [
                    { totalDatasetsSubmitted: 0, storageClient: false },
                ],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)

            await datastore.createOrUpdateMember(
                new Member({
                    address: "0",
                    totalDatasetsSubmitted: 1,
                    totalChallengeSubmitted: 0,
                    totalDisputeSubmitted: 0,
                    totalMatchingSubmitted: 0,
                    totalProofSubmitted: 0,
                    storageClient: true,
                    storageProvider: false,
                    datasetAuditer: false,
                    datasetPreparer: false,
                    financeAccounts: [
                        new FinanceAccount({
                            datasetId: 1,
                            matchingId: 1,
                            token: FIL,
                        }),
                    ],
                })
            )
            const addRes = await datastore.find({
                conditions: [
                    { totalDatasetsSubmitted: 1, storageClient: true },
                ],
            })
            console.log(addRes)
            expect(addRes.ok).to.be.true
            expect(addRes.data).to.be.not.undefined
            expect(addRes.data?.length).to.deep.equal(1)
            expect(addRes.data![0].financeAccounts![0].matchingId).to.be.equal(
                1
            )

            await datastore.createOrUpdateMember(
                new Member({
                    address: "0",
                    totalDatasetsSubmitted: 1,
                    totalChallengeSubmitted: 1,
                    totalDisputeSubmitted: 0,
                    totalMatchingSubmitted: 0,
                    totalProofSubmitted: 0,
                    storageClient: true,
                    storageProvider: false,
                    datasetAuditer: true,
                    datasetPreparer: false,
                    financeAccounts: [
                        new FinanceAccount({
                            datasetId: 1,
                            matchingId: 2,
                            token: FIL,
                        }),
                        new FinanceAccount({
                            datasetId: 1,
                            matchingId: 1,
                            token: FIL,
                        }),
                    ],
                })
            )
            const addRes1 = await datastore.find({
                conditions: [
                    { totalDatasetsSubmitted: 2, storageClient: true },
                ],
            })
            console.log(addRes1, addRes1.data![0].financeAccounts)
            expect(addRes1.ok).to.be.true
            expect(addRes1.data).to.be.not.undefined
            expect(addRes1.data?.length).to.deep.equal(1)
            expect(addRes1.data![0].financeAccounts![1].matchingId).to.be.equal(
                1
            )
            expect(addRes1.data![0].financeAccounts![0].matchingId).to.be.equal(
                2
            )
        })
    })
})
