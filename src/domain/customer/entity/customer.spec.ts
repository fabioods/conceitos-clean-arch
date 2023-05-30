/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from '../valueObject/address'
import { Customer } from './customer'

describe('Customer tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'Fábio')
    }).toThrowError('customer: ID is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('1', '')
    }).toThrowError('customer: Name is required')
  })

  it('should throw error when name and id are empty', () => {
    expect(() => {
      const customer = new Customer('', '')
    }).toThrowError('customer: ID is required, customer: Name is required')
  })

  it('should throw error when address is empty', () => {
    const customer = new Customer('1', 'Fabio')
    expect(() => {
      customer.defineAddress(null)
    }).toThrowError('customer: Customer address is required')
  })

  it('should throw error when try to active a customer with no address', () => {
    const customer = new Customer('1', 'Fabio')
    expect(() => {
      customer.activate()
    }).toThrowError('customer: Customer address is required')
  })

  it('should change a customer name', () => {
    const customer = new Customer('1', 'Fábio')
    customer.changeName('Fábio dos Santos')
    expect(customer.name).toBe('Fábio dos Santos')
  })

  it('should change a customer status', () => {
    const customer = new Customer('1', 'Fábio')
    const address = new Address('Rua 1', 1, 'São Paulo', 'SP')
    expect(customer.isActive()).toBe(false)
    customer.defineAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
    customer.inactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should throw an error when address is in a invalid state', () => {
    expect(() => {
      const address = new Address('', 1, 'São Paulo', 'SP')
    }).toThrowError('Street is required')

    expect(() => {
      const address = new Address('Rua A', null, 'São Paulo', 'SP')
    }).toThrowError('Number is required')

    expect(() => {
      const address = new Address('Rua A', 1, null, 'SP')
    }).toThrowError('Zip is required')

    expect(() => {
      const address = new Address('Rua A', 1, '84030-000', null)
    }).toThrowError('City is required')
  })

  it('should create a valid address', () => {
    const address = new Address('Rua A', 1, 'São Paulo', 'SP')
    expect(address.toString()).toBe('Rua A, 1, São Paulo, SP')
  })
})
