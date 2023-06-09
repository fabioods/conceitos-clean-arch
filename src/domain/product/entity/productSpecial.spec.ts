import { ProductSpecial } from './productSpecial'

describe('Product Special tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new ProductSpecial('', 'Product 01', 10)
    }).toThrowError('product: Product id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new ProductSpecial('1', '', 10)
    }).toThrowError('product: Product name is required')
  })

  it('should throw error when price is zero or lower', () => {
    expect(() => {
      const product = new ProductSpecial('1', 'p1', -1)
    }).toThrowError('product: Product price is invalid')
  })

  it('should throw error when all values are invalid', () => {
    expect(() => {
      const product = new ProductSpecial('', '', -1)
    }).toThrowError('product: Product id is required, product: Product name is required, product: Product price is invalid')
  })

  it('should throw error when price is invalid', () => {
    expect(() => {
      const product = new ProductSpecial('1', 'p1', null)
    }).toThrowError('product: Product price is invalid')
  })

  it('should change a product name', () => {
    const product = new ProductSpecial('1', 'p1', 10)
    product.changeName('p2')
    expect(product.name).toBe('p2 - Special')
    expect(product.id).toBe('1')
  })

  it('should change a product price', () => {
    const product = new ProductSpecial('1', 'p1', 10)
    product.changePrice(20)
    expect(product.price).toBe(200)
  })
})
