const request = require('supertest')
const { app } = require('../server')
const Product = require("../model/Product");
const {redisClient} = require("../redisProvider");

jest.mock("../model/Product")

describe('Testing Get Products API', function(done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('checking response status', function(done) {    
        const mocktotalProducts = [
            {
            "_id": "651b0fcc02f51f99f02c84fc",
            "productName": "Angled Sink",
            "productModel": "Sink Cock",
            "productModelNumber": "B877G23",
            "productPrice": 17999,
            "productImage": "http://res.cloudinary.com/drlqa8duh/image/upload/v1699038084/carbon/jcpb710h4zimfvbxfb3r.jpg",
            "__v": 0
            },
            {
            "_id": "651b10d3c25fd38e783d088d",
            "productName": "Hatch Back",
            "productModel": "Sink Cock",
            "productModelNumber": "AEH123",
            "productPrice": 24999,
            "productImage": "http://res.cloudinary.com/drlqa8duh/image/upload/v1699037984/carbon/rgky7bmjnot1en3rkium.jpg",
            "__v": 0
            },
        ]

        Product.find.mockResolvedValueOnce(mocktotalProducts);

        request(app)
            .get("/getAllproducts")
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mocktotalProducts);
                done();
            });
    })
});

describe('Testing Get Single Product API', function(done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('checking response status and result', function(done) {    
        const mocktotalProducts = {
            "_id": "651b10d3c25fd38e783d088d",
            "productName": "Hatch Back",
            "productModel": "Sink Cock",
            "productModelNumber": "AEH123",
            "productPrice": 24999,
            "productImage": "http://res.cloudinary.com/drlqa8duh/image/upload/v1699037984/carbon/rgky7bmjnot1en3rkium.jpg",
            "__v": 0
        }

        Product.findOne.mockResolvedValueOnce(mocktotalProducts);

        request(app)
            .get("/products/651b10d3c25fd38e783d088d")
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.product).toEqual(mocktotalProducts);
                done();
            });
    })
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    redisClient.quit();
    done();
});


