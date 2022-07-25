const { serviceDocs } = require('./service')

class HandleDocs {
    async get_files(req, res) {
        try {
            let files = await serviceDocs.prototype.get_files()
            res.json(files)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async get_text_pdf(req, res) {
        try {

            let { base64, filename } = req.body
            let data = await serviceDocs.prototype.get_text_pdf({ base64, filename })
            res.json(data)

        } catch (error) {
            console.log('error', error)
            res.status(500).json(error)
        }

    }
}

module.exports = {
    HandleDocs
}