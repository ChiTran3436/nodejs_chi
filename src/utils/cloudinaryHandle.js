const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: 'dpu9umgsb',
    api_key: '629877869965413',
    api_secret: 'Jv9MZsj6Kxrht5zGegtRwfKQa2s' // Click 'View API Keys' above to copy your API secret

});

module.exports = { cloudinary }
