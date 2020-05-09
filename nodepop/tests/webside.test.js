'use strict';

require('dotenv').config();

const request = require('supertest');
const app = require('../app');


describe("rutas webside", function () {

    it("[NO AUTH] / should return status 200", function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    })
})