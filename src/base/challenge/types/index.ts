import { Address, Cid } from "@unipackage/filecoin"

export interface Challenge {
    submitter: Address
    msgCid: Cid
    randomSeed: number
    challenge: string
}

export interface DatasetChallenges {
    count: number
    [id: number]: Challenge
}
