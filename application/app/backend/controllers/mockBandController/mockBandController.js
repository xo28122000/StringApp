const mockBandQuerries = require("../../db/queries/mockBand");

const awsS3 = require("../../lib/aws/s3");

// const getFileName = (fileName, s3Contents ) => {
//   let fname = "bus/" +  "/img";
//   let isUnique = false;

//   while (!isUnique) {
//     fname += Math.floor(Math.random() * 90000) + 10000;
//     isUnique = true;
//     s3Contents.forEach(obj => {
//       if (obj.Key === fname) {
//         isUnique = false;
//       }
//     });
//   }

//   fname += "." + fileName.split(".").pop();
//   return fname;
// };

const createMockBand = async (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.numMembers || !req.file) {
    console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  try {
    let contents = await awsS3.getS3files(
      "csc648-string",
      "verticalPrototype/"
    );

    let fileName = "verticalPrototype/" + (contents.length + 1);
    fileName += "." + req.file.filename.split(".").pop();

    let fileData = await awsS3.getFileData(req.file);
    let result = await awsS3.addS3file("csc648-string", fileName, fileData);

    await mockBandQuerries.createBand(
      req.body.name,
      req.body.type,
      req.body.numMembers,
      fileName
    );

    await awsS3.clearFile(req.file);
    return res.send({ success: true });
  } catch (error) {
    await awsS3.clearFile(req.file);
    return res.send({ success: false });
  }
};

const searchMockBand = (req, res) => {
  var search = {
    name: req.body.name ? req.body.name + "%" : "%",
    type: req.body.type ? req.body.type : "%",
    numMembers: req.body.numMembers ? req.body.numMembers : 1
  };

  mockBandQuerries
    .searchBand(search.name, search.type, search.numMembers)
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      return res.send({ success: false, error: "internal error" });
    });
};

module.exports = { createMockBand, searchMockBand };
