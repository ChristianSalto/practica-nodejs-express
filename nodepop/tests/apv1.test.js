'use strict';

require('dotenv').config();

const request = require('supertest');
const app = require('../app');



describe("Authentication", () => {
    let token = "";
    it("[AUTH] POST /apiv1/authentication should return a token (string) and status 200", function (done) {
        request(app)
            .post('/apiv1/authentication')
            .send({
                "email": "user@example.com",
                "password": "1234"
            })
            .expect(200)
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    });

    it("[AUTH] GET /apiv1/adsnodepops?token=token should return status 200 and JSON", function (done) {
        request(app)
            .get(`/apiv1/adsnodepops?token=${token}`)
            .expect(200, done)
    })
});

