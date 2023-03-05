import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { feeDonated } from "../generated/donateContract/donateContract"

export function createfeeDonatedEvent(
  amountDonated: BigInt,
  donator: Address
): feeDonated {
  let feeDonatedEvent = changetype<feeDonated>(newMockEvent())

  feeDonatedEvent.parameters = new Array()

  feeDonatedEvent.parameters.push(
    new ethereum.EventParam(
      "amountDonated",
      ethereum.Value.fromUnsignedBigInt(amountDonated)
    )
  )
  feeDonatedEvent.parameters.push(
    new ethereum.EventParam("donator", ethereum.Value.fromAddress(donator))
  )

  return feeDonatedEvent
}
