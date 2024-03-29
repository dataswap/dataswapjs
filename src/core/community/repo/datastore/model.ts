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

import { Schema, Document } from "mongoose"
import { ValueFields } from "@unipackage/utils"
import { Member } from "../../types"

/**
 * Interface representing a MemberDocument, extending Member and Document.
 * @interface
 */
interface MemberDocument extends ValueFields<Member>, Document {}

/**
 * Schema definition for the Member collection.
 * @constant
 */
const MemberSchema = new Schema<MemberDocument>({
    address: {
        type: String,
        required: [true, "Please provide the address"],
        index: { unique: true },
    },
    totalDatasetsSubmitted: {
        type: Number,
    },
    totalProofSubmitted: {
        type: Number,
    },
    totalChallengeSubmitted: {
        type: Number,
    },
    totalMatchingSubmitted: {
        type: Number,
    },
    totalDisputeSubmitted: {
        type: Number,
    },
    storageClient: {
        type: Boolean,
    },
    storageProvider: {
        type: Boolean,
    },
    datasetPreparer: {
        type: Boolean,
    },
    datasetAuditer: {
        type: Boolean,
    },
    financeAccounts: {
        type: [Object],
    },
})

export { MemberSchema }
export type { MemberDocument }
