import { Entity } from '../../shared/entity/entity.abstract'
import { NotificationError } from '../../shared/notification/notification.error'
import { Address } from '../valueObject/address'

export class Customer extends Entity {
  private _name: string

  private _address: Address

  private _active = false

  private _rewardPoints = 0

  constructor (id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
  }

  // Isso é errado, pois assim o customer será criado de maneira inconsistente
  // constructor(id: string) {
  //   this.id = id;
  // }

  get name () {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get address (): Address {
    return this._address
  }

  isActive () {
    return this._active
  }

  defineAddress (address: Address) {
    if (!address) {
      this.notification.addError({
        message: 'Customer address is required',
        context: 'customer'
      })
      throw new NotificationError(this.notification.getErrors())
    }
    this._address = address
  }

  validate () {
    if (!this._name) {
      this.notification.addError({
        message: 'Customer name is required',
        context: 'customer'
      })
    }

    if (!this.id) {
      this.notification.addError({
        message: 'Customer id is required',
        context: 'customer'
      })
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  activate () {
    if (!this._address) {
      this.notification.addError({
        message: 'Customer address is required to active customer',
        context: 'customer'
      })
      throw new NotificationError(this.notification.getErrors())
    }
    this._active = true
  }

  inactivate () {
    this._active = false
  }

  addRewardPoints (points: number) {
    this._rewardPoints += points
  }
}
