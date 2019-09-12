// In order to import non-code into typescript, you'll need to declare a module for each file type being imported.
// This will allow WebPack to package up assets and embed in the final javascript.
// Ref: https://webpack.js.org/guides/typescript/

declare module "*.txt" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}
