const searchService = require('../service/search.service');
const statusCode = require('../constant/errorCodes.enum')

module.exports = {
    searchUser: (req, res) => {
        try {
            const searchUser = searchService.searchUser(req.query);
            res.json(searchUser);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }

    }
}
