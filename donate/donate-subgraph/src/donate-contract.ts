import { feeDonated as feeDonatedEvent } from "../generated/donateContract/donateContract"
import { feeDonated } from "../generated/schema"

export function handlefeeDonated(event: feeDonatedEvent): void {
  let entity = new feeDonated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amountDonated = event.params.amountDonated
  entity.donator = event.params.donator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
