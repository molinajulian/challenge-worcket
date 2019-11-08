exports.mapEntity = results => results.map(({ url, name }) => ({ id: url.replace(/\D/g, ''), name }));
