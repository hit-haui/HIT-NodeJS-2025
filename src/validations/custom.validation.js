const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('Định dạng ID không hợp lệ.');
  }

  return value;
};

module.exports = {
  objectId,
};
