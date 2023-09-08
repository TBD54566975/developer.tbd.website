const fs = require("fs");
const path = require("path");

try {
  if (!fs.existsSync(".all-contributorsrc")) {
    throw new Error(".all-contributorsrc file does not exist.");
  }

  const rawData = fs.readFileSync(".all-contributorsrc", "utf-8");

  const parsedData = JSON.parse(rawData);
  if (!parsedData.contributors) {
    throw new Error("contributors key is missing in .all-contributorsrc");
  }

  const contributors = parsedData.contributors;

  const filteredContributors = contributors.map((contributor) => ({
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    contributions: contributor.contributions,
  }));

  const outputPath = path.join(__dirname, "src", "contributors.json");

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(filteredContributors, null, 2));

  console.log("Contributors data has been updated successfully.");
} catch (error) {
  console.error("Error while generating contributors data:", error.message);
  process.exit(1);
}
