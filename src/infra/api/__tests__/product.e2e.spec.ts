import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual('Product 1')
    expect(response.body.price).toEqual(10)
  })

  it('should not create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1'
      })
    expect(response.status).toBe(500)
  })

  it('should list all products', async () => {
    await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10
      })
    await request(app)
      .post('/product')
      .send({
        name: 'Product 2',
        price: 20
      })
    const response = await request(app).get('/product')
    expect(response.status).toBe(200)
    expect(response.body.length).toEqual(2)
  })
})
