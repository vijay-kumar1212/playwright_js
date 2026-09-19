const base = require('@playwright/test');

exports.customtest = base.test.extend({
        testDataForOrder : {
            username : "hv5217958@gmail.com",
            password : "Vikram@1805",
            productName: "ZARA COAT 3"
        }
    });