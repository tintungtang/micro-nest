const {
  createProjectGraphAsync,
  readCachedProjectGraph,
  detectPackageManager,
  writeJsonFile,
} = require('@nx/devkit');
const {
  createLockFile,
  createPackageJson,
  getLockFileName,
} = require('@nx/js');
const { writeFileSync } = require('fs');

async function main() {
  const outputDir = 'dist'; // You can replace this with the output directory you want to use
  // Detect the package manager you are using (npm, yarn, pnpm)
  const pm = detectPackageManager();
  let projectGraph = readCachedProjectGraph();
  if (!projectGraph) {
    projectGraph = await createProjectGraphAsync();
  }
  // You can replace <NX_TASK_TARGET_PROJECT> with the name of the project if you want.
  const projectName = process.env.NX_TASK_TARGET_PROJECT;
  const packageJson = createPackageJson(projectName, projectGraph, {
    isProduction: true, // Used to strip any non-prod dependencies
    root: projectGraph.nodes[projectName].data.root,
  });

  const lockFile = createLockFile(
    packageJson,
    projectGraph,
    detectPackageManager()
  );

  const lockFileName = getLockFileName(pm);

  writeJsonFile(`${outputDir}/package.json`, packageJson);
  writeFileSync(`${outputDir}/${lockFileName}`, lockFile, {
    encoding: 'utf8',
  });

  //... Any additional steps you want to run
}

main();
