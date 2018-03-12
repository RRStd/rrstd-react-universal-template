
function cfgUrlLoaderImages(opts) {
  opts = opts || {};
  return {
    test: /\.(png|jpg|gif|svg|mp4|webm)$/,
    loader: 'url-loader',
    options: {
      limit: opts.limit || 8192,
    },
  };
}


const fontTypes = [
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
];

function cfgUrlLoaderFonts(/* opts */) {
  const res = [];
  fontTypes.forEach( (font) => {
    const extension = font[0];
    const mimetype = font[1];

    res.push({
      test    : new RegExp(`\\.${ extension }$`),
      loader  : 'url-loader',
      options : {
        name  : 'fonts/[name].[ext]',
        limit : 10000,
        mimetype,
      },
    });
  });
  return res;
}

function cfgUrlLoader(opts) {
  const a = [ cfgUrlLoaderImages(opts) ];
  a.push(...cfgUrlLoaderFonts(opts));
  return a;
}


module.exports = cfgUrlLoader;
