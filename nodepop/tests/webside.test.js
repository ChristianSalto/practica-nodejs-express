'use strict';

require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const i18n = require('i18n');


describe("rutas webside", function () {

    it("[NO AUTH] GET / should return status 200", function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it("[NO AUTH] GET /listTags should return status 200", function (done) {
        request(app)
            .get('/listTags')
            .expect(200, done);
    });

    it("[NO AUTH] GET /cards should return status 200", function (done) {
        request(app)
            .get('/cards')
            .expect(200, done);
    });

    it("[NO AUTH] GET /change-locale should return status 302", function (done) {
        const locale = i18n.getLocale();
        request(app)
            .get(`/change-locale/${locale}`)
            .expect(302, done);
    });


    it("[NO AUTH] GET /login should return status 200", function (done) {
        request(app)
            .get('/login')
            .expect(200, done);
    });


    it("[NO AUTH] GET /private should return status 302", function (done) {
        request(app)
            .get('/private')
            .expect(302, done)
    });


    it("[AUTH] POST /login should return status 302", function (done) {
        request(app)
            .post("/login")
            .send({
                "email": "user@example.com",
                "password": "1234"
            })
            .expect(302, done);
    });
})