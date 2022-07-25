const { get_files, textextract_pdf } = require('../../plugins/pdfnet')

class serviceDocs {
    get_files() {
        return new Promise(async (resolve, reject) => {
            try {
                let files = await get_files()
                resolve(files)
            } catch (error) {
                reject(error)
            }
        })
    }

    get_text_pdf({ base64, filename }) {

        return new Promise(async (resolve, reject) => {
            try {

                let data = await textextract_pdf({ filename, base64 })
                resolve(data)

            } catch (error) {
                reject(error)
            }
        })

    }
}

module.exports = {
    serviceDocs
}