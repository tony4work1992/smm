import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const minimalPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    types: "smm.es.d.ts",
    main: "smm.umd.js",
    module: "smm.es.js",
    peerDependencies: packageJson.peerDependencies,
    keywords: packageJson.keywords,
    author: packageJson.author,
    license: packageJson.license
};

fs.writeFileSync('./dist/package.json', JSON.stringify(minimalPackageJson, null, 2));
console.log('package.json created in dist folder!');
