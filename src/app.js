const fs = require("fs/promises");
const path = require("path");
const probe = require("probe-image-size");

const questions = [
    {
        type: "input",
        name: "startIndex",
        message: "Enter start index :",
    },
    {
        type: "input",
        name: "endIndex",
        message: "Enter end index :",
    },
];

(async () => {
    const { default: inquirer } = await import("inquirer");
    const { default: chalk } = await import("chalk");

    const answers = await inquirer.prompt(questions);

    const data = await fs.readFile("./all-errors.json", { encoding: "utf-8" });
    console.log("\nStart scrap process\n");

    const parsedUrls = JSON.parse(data);

    for (let urlIndex in parsedUrls) {
        if (urlIndex >= Number(answers.startIndex) && urlIndex < Number(answers.endIndex)) {
            try {
                const result = await probe(parsedUrls[urlIndex]);
                const artPictureInfo = {
                    url: result.url,
                    width: result.width,
                    height: result.height,
                };

                await fs.appendFile(
                    `./chunk-${answers.startIndex}-${answers.endIndex}.json`,
                    JSON.stringify(artPictureInfo) + ",\n"
                );

                console.log(artPictureInfo.url + " - Scrapped - " + urlIndex + "\n");
            } catch (e) {
                console.log(chalk.red(parsedUrls[urlIndex] + " - Error - " + urlIndex + "\n"));

                await fs.appendFile(
                    `./chunk-${answers.startIndex}-${answers.endIndex}-errors.json`,
                    `"${parsedUrls[urlIndex]}",\n`
                );
            }
        } else continue;
    }

    console.log("\n\nFinish ***");

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
})();
