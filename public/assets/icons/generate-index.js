import fs from "fs/promises"; // Use fs/promises for async file operations
import path from "path";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the SVGs
const directoryPath = __dirname;

// Function to generate the index.js file
async function generateIndex() {
  try {
    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // Filter only SVG files
    const svgFiles = files.filter((file) => path.extname(file) === ".svg");

    // Generate export statements
    const exportsContent = svgFiles
      .map((file) => {
        const iconName = path.basename(file, ".svg"); // Remove the .svg extension
        return `export { default as ${iconName} } from "./${file}";`;
      })
      .join("\n");

    // Write the exports to the index.js file
    await fs.writeFile(path.join(directoryPath, "index.js"), exportsContent);

    console.log("index.js file updated with all SVGs!");
  } catch (error) {
    console.error("Error generating index.js:", error);
  }
}

generateIndex();
