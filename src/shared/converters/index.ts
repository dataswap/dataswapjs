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

import { CarstoreEvm } from "../../core/carstore/repo/evm"
import { CarReplica } from "../../core/carstore/types"
import { MatchingTarget } from "../../module/matching/target/types"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaState } from "../types/carstoreType"

/**
 * Converts the provided data to an array of CarReplica objects using the specified options.
 *
 * @param options - An object containing the necessary parameters for conversion.
 * @returns A Promise resolving to an array of CarReplica objects.
 */
export async function convertToCarReplicasArray(options: {
    carstorEvm: CarstoreEvm
    target: MatchingTarget
}): Promise<CarReplica[]> {
    let ret: CarReplica[] = []

    for (let index = 0; index < options.target.cars.length; index++) {
        options.carstorEvm.getCarsSize
        ret.push(
            new CarReplica({
                matchingId: options.target.matchingId,
                carId: options.target.cars[index],
                state: CarReplicaState.None,
                filecoinClaimId: BigInt(0),
            } as ValueFields<CarReplica>)
        )
    }
    return ret
}