const fs = require('fs');
const path = require('path');
var os = require('os');

const { PDFNet } = require('@pdftron/pdfnet-node');
const filesPath = '../files';

const response_default = ({ status = true, message = "" } = {}) => {

    return {
        status: status ? status : false,
        message: message ? message : ""
    }
}

const get_files = () => {
    return new Promise((resolve, reject) => {
        const inputPath = path.resolve(__dirname, filesPath);
        fs.readdir(inputPath, function (err, files) {

            if (!err) resolve(response_default({ message: files }));
            else {
                reject(response_default({ status: false, message: "Unable to scan directory:" + String(err) }))
            }

        });
    })
}

const textextract_pdf = ({ filename, base64 }) => {
    return new Promise(async (resolve, reject) => {

        let data_pdf = []
        let buffer = []
        let inputPath = ""

        if (base64) buffer = Buffer.from(base64, 'base64');
        else inputPath = path.resolve(__dirname, filesPath, filename);


        const main = async () => {
            // initialize 
            const reader = await PDFNet.ElementReader.create();
            await PDFNet.initialize();
            await PDFNet.startDeallocateStack();

            // get doc
            let doc = ""

            if (buffer.length > 0) doc = await PDFNet.PDFDoc.createFromBuffer(buffer);
            else doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);

            doc.initSecurityHandler();

            // convert doc OCR
            let type_os = os.type()
            console.log(type_os)
            let path_ocr = `${__dirname}\\..\\Lib\\${type_os}`
            PDFNet.addResourceSearchPath(path_ocr);

            const useIRIS = await PDFNet.OCRModule.isIRISModuleAvailable();
            const opts = new PDFNet.OCRModule.OCROptions();
            if (useIRIS) opts.setOCREngine('iris');

            const json = await PDFNet.OCRModule.getOCRJsonFromPDF(doc, opts);
            await PDFNet.OCRModule.applyOCRJsonToPDF(doc, json);
            await PDFNet.OCRModule.processPDF(doc, opts)
            // console.log(PDFNet.SDFDoc.SaveOptions)

            // if (inputPath) await doc.save(inputPath, 0)

            // Example 1. Extract all text content from the document
            const itr = await doc.getPageIterator();

            for (itr; await itr.hasNext(); itr.next()) {
                const page = await itr.current();
                const index = await page.getIndex()

                const txt = await PDFNet.TextExtractor.create();
                txt.begin(page);

                let text = await txt.getAsText();
                let obj = { page: text, id: index }

                data_pdf.push(obj)
            }

            PDFNet.endDeallocateStack()
            return { data_pdf }
        }

        let key = 'demo:1657227902024:7a4519c30300000000296b74558ddd08967b11945cced0f24970a2682e'

        PDFNet.runWithCleanup(main, key)
            .then((e) => {
                resolve(response_default({ message: e.data_pdf }))
            })
            .catch(error => {
                reject(response_default({ status: false, message: error }))
            })
    })

}


module.exports = {
    get_files,
    textextract_pdf,
    response_default
}
