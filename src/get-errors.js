const fs = require("fs/promises");

(async () => {
    const { default: chalk } = await import("chalk");

    let urls = await fs.readFile("./urls.json", { encoding: "utf-8" });
    urls = JSON.parse(urls);

    let scrapResult = await fs.readFile("./all-chunks.json", { encoding: "utf-8" });
    scrapResult = JSON.parse(scrapResult);

    const allErrors = [];

    urls.forEach((url, index) => {
        const isExist = scrapResult.find((scrapedUrl) => {
            return scrapedUrl.url === url;
        });

        if (isExist) console.log(chalk.green("Founded - " + index));
        else {
            console.log(chalk.red("Not found - " + index));
            allErrors.push(url);
        }
    });

    await fs.writeFile("./all-errors.json",JSON.stringify(allErrors));

    console.log(chalk.blueBright("\n******** Finish ********\n"));
})();
