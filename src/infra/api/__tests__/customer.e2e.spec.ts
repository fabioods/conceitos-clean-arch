import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua dos Bobos',
          city: 'São Paulo',
          number: 1,
          zipcode: '12345678'
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual('John Doe')
    expect(response.body.address.street).toEqual('Rua dos Bobos')
    expect(response.body.address.city).toEqual('São Paulo')
    expect(response.body.address.number).toEqual(1)
    expect(response.body.address.zipcode).toEqual('12345678')
  })

  it('should not create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe'
      })
    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua dos Bobos',
          city: 'São Paulo',
          number: 1,
          zipcode: '12345678'
        }
      })
    await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Rua dos amigos',
          city: 'PG',
          number: 2,
          zipcode: '00000000'
        }
      })

    const response = await request(app).get('/customer')

    expect(response.status).toBe(200)
    expect(response.body.customers.length).toEqual(2)
    expect(response.body.customers[0].name).toEqual('John Doe')
    expect(response.body.customers[0].address.street).toEqual('Rua dos Bobos')
    expect(response.body.customers[0].address.city).toEqual('São Paulo')
    expect(response.body.customers[0].address.number).toEqual(1)
    expect(response.body.customers[0].address.zip).toEqual('12345678')

    const responseInXML = await request(app).get('/customer').set('Accept', 'application/xml').send()
    expect(responseInXML.status).toBe(200)
    expect(responseInXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(responseInXML.text).toContain('<customers>')
    expect(responseInXML.text).toContain('<customer>')
    expect(responseInXML.text).toContain('<name>John Doe</name>')
    expect(responseInXML.text).toContain('<address>')
    expect(responseInXML.text).toContain('<street>Rua dos Bobos</street>')
    expect(responseInXML.text).toContain('<city>São Paulo</city>')
    expect(responseInXML.text).toContain('<number>1</number>')
    expect(responseInXML.text).toContain('<zip>12345678</zip>')
    expect(responseInXML.text).toContain('</address>')
    expect(responseInXML.text).toContain('</customer>')
    expect(responseInXML.text).toContain('<name>Jane Doe</name>')
    expect(responseInXML.text).toContain('<street>Rua dos amigos</street>')
    expect(responseInXML.text).toContain('</customers>')
  })
})
