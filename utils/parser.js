const tryParse = (stringObj, defaultObj) => {
    try {
        return JSON.parse(stringObj);
    }
    catch {
        return defaultObj || {};
    }
};

module.exports = {
    tryParse: tryParse
};