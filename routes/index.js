'use strict';

const express = require('express');
const { UserMediaController, StripeController } = require('../controllers');
const { validateAuthToken } = require('../libs/auth');

//dependencia para responder como rest
const api = express.Router();

api.get('/authImageKit', UserMediaController.authImageKit);
// api.post('/mercadoPago', MercadoPagoController.isPayed);

api.post('/stripe/checkout', [validateAuthToken], StripeController.checkout);

module.exports = api;
