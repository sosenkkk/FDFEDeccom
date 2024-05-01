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

    it("should return 433 Error and a error if password is wrong", async () => {
        const response = await request(baseURL)
            .post('/login')
            .send({ email: 'amit@careermilaap.com', password: 'test' });


        expect(response.status).toBe(433);
        expect(response.body.message).toBe("User entered Incorrect password");
    })

    it("should return 403 Error and a error if user doesn't exists", async () => {
        const response = await request(baseURL)
            .post('/login')
            .send({ email: 'testdoes@gmail.com', password: 'test' });

            
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("No such user found.");
    })
});


describe('POST /signup', () => {
    // it('should return 200 OK and userId if successful', async () => {
    //     const response = await request(baseURL)
    //         .post('/signup')
    //         .send({ email: 'amit@test.com', password: 'admin_password' });
        
    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('userId');
    // });

    it("should return 433 Error and a error if user already exists", async () => {
        const response = await request(baseURL)
            .post('/signup')
            .send({ email: 'amit@careermilaap.com', password: 'test' });


        expect(response.status).toBe(433);
        expect(response.body.message).toBe("User already registered.");
    })
});