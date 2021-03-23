module.exports = {
    USER_STRING: {
        NAME: 'name',
        AGE: 'age',
        EMAIL: 'email',
    },
    ADDRESS_STRING: {
        CITY: 'city',
        STREET: 'street',
        HOUSE: 'house'
    },
    ROLE: {
        USER: process.env.USER_ROLE || 'user',
        ADMIN: process.env.ADMIN_ROLE || 'ADMIN',
        SUPER_ADMIN: process.env.SUPER_ADMIN_ROLE || 'superPuperAdmin'
    }

};
