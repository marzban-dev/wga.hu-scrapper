const fs = require("fs");
const path = require("path");
const probe = require("probe-image-size");

const filePath = path.join(__dirname, "start.html");

fs.readFile("./urls.json", { encoding: "utf-8" }, async (err, data) => {
    const parsedUrls = JSON.parse(data);

    fs.writeFile("./results.json", "[", () => console.log("Start scrapping\n\n"));

    let index = 0;

    for (let url of parsedUrls) {
        if (index < 10) {
            const result = await probe(url);
            const artPictureInfo = {
                url: result.url,
                width: result.width,
                height: result.height,
            };

            fs.appendFile("./results.json", JSON.stringify(artPictureInfo) + ",", () =>
                console.log(artPictureInfo.url + " - Scrapped\n")
            );

            index += 1;
        } else break;
    }

    fs.appendFile("./results.json", "]", () => {});

    console.log("\n\n\n\nFinish ***");

    /*
    {
        width: xx,
        height: yy,
        type: 'jpg',
        mime: 'image/jpeg',
        wUnits: 'px',
        hUnits: 'px',
        url: 'http://example.com/image.jpg'
    }
    */

    if (err) {
        console.log(err);
    }
});
