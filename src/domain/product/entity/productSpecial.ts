import { Entity } from '../../shared/entity/entity.abstract'
import { NotificationError } from '../../shared/notification/notification.error'
import { ProductInterface } from './productInterface'

export class ProductSpecial extends Entity implements ProductInterface {
  private _name: string
  private _price: number

  constructor (id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  get name (): string {
    return `${this._name} - Special`
  }

  get price (): number {
    return this._price * 10
  }

  validate () {
    if (!this._id) {
      this.notification.addError({
        context: 'product',
        message: 'Product id is required'
      })
    }
    if (!this._name) {
      this.notification.addError({
        context: 'product',
        message: 'Product name is required'
      })
    }
    if (!this._price || this._price <= 0) {
      this.notification.addError({
        context: 'product',
        message: 'Product price is invalid'
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

  changePrice (price: number) {
    this._price = price
    this.validate()
  }
}
