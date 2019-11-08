exports.mapEntity = results => results.map(({ url, name }) => ({ id: exports.getIdFromUrl(url), name }));

exports.getIdFromUrl = url => url.replace(/\D/g, '');
