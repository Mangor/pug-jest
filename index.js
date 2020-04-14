const pug = require('pug');

function transformPugToHtml(src, filePath, baseDir) {
  const options = {
    compileDebug: false,
    pretty: true,
    filename: filePath,
  };

  if (baseDir) {
    options.baseDir = baseDir;
  }

  try {
    const template = pug.compile(src, options);
    const html = template();
    const content = JSON.stringify(html);
    return `module.exports = ${content};`;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  process(src, filePath, options) {
    const baseDir = options.roots ? options.roots[0] : false;

    return transformPugToHtml(src, filePath, baseDir);
  }
};
