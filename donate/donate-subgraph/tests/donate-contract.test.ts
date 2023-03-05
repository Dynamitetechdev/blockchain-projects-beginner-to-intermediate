import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { feeDonated } from "../generated/schema"
import { feeDonated as feeDonatedEvent } from "../generated/donateContract/donateContract"
import { handlefeeDonated } from "../src/donate-contract"
import { createfeeDonatedEvent } from "./donate-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let amountDonated = BigInt.fromI32(234)
    let donator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newfeeDonatedEvent = createfeeDonatedEvent(amountDonated, donator)
    handlefeeDonated(newfeeDonatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("feeDonated created and stored", () => {
    assert.entityCount("feeDonated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "feeDonated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountDonated",
      "234"
    )
    assert.fieldEquals(
      "feeDonated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "donator",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
