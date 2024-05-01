const request = require("supertest")

const baseURL = "http://localhost:8080";

describe('POST /login', () => {
    it('should return 200 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('/login')
            .send({ email: 'amit@careermilaap.com', password: 'amit@admin_password' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it("should return 403 Error and a error if password is wrong", async () => {
        const response = await request(baseURL)
            .post('/login')
            .send({ email: 'amit@careermilaap.com', password: 'test' });

            
        expect(response.status).toBe(433);
        expect(response.body.message).toBe("User entered Incorrect password");
    })
});