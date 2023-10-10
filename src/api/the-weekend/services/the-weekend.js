'use strict';

/**
 * the-weekend service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::the-weekend.the-weekend');
