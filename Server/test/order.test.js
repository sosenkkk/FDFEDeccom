const request = require("supertest")

const baseURL = "http://localhost:8080";

let token = "";

describe('POST /login', () => {
    it('should return 201 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('/login')
            .send({ email: 'amit@careermilaap.com', password: 'amit@admin_password' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });
})

describe('POST /my-orders', () => {
    it('should return 201 OK and a list of orders', async () => {
        const response = await request(baseURL)
            .get('/my-orders')
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('orders');
    });
});

describe('POST /my-order/:orderId', () => {
    it('should return 201 OK and the specified order', async () => {
        const response = await request(baseURL)
            .get('/my-order/663078db4647a6c31bdb301b')
            .set("Authorization", `Bearer ${token}`)
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('order');
    });
});