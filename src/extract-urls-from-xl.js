const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");

// File path.
readXlsxFile("./catalog.xlsx").then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.

    const arts = [];

    rows.forEach((art, index) => {
        let artUrl = art[6];
        artUrl = artUrl.replace("/html","/art");
        artUrl = artUrl.replace(".html",".jpg");
        if (index > 0) arts.push(artUrl);
    });

    fs.writeFile("./urls.json", JSON.stringify(arts), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});
