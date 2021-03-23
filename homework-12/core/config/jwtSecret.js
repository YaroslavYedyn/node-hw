module.exports = {
    JWT_SECRET: {
        user: process.env.JWT_SECRET_USER || 'adkadfjnfknfio;eqjlfnsdkfj',
        admin: process.env.JWT_SECRET_ADMIN || 'adkadfLOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQLfvZylPMAB0u2b$10fnsdkfj',
        superAdmin: process.env.JWT_SECRET_SUPER_ADMIN || 'adLOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQLfvZylPMAB0u2b$10j',
    },
    JWT_REFRESH_SECRET: {
        user: process.env.JWT_REFRESH_SECRET_USER || 'dsndkjafnbfklanbadijklna',
        admin: process.env.JWT_REFRESH_SECRET_ADMIN || 'dsndkjaLOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQLfvZy0adijklna',
        superAdmin: process.env.JWT_REFRESH_SECRET_SUPER_ADMIN || 'LOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQdijklna',
    },
    JWT_ACTIVATE_SECRET: {
        user: process.env.JWT_ACTIVATE_SECRET_USER || 'asdjahbfihe1892eu39ehfuihkbfmam0q9pi3',
        admin: process.env.JWT_ACTIVATE_SECRET_ADMIN || 'asdjaLOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQLfv10am0q9pi3',
        superAdmin: process.env.JWT_ACTIVATE_SECRET_SUPER_ADMIN || 'LOrJnyqa89.hu0uaOoFodsVBuJcmqEPmVQLfvq9pi3',
    }
};
