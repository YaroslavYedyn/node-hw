const searchService = require('../service/search.service')

module.exports = {
    searchUser: (req, res) => {
        const searchUser = searchService.searchUser(req.query)
        res.json(searchUser)
    }
}
