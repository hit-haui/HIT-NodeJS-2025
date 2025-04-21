PASSWORD_PATTERN = new RegExp(
    '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
);

EMAIL_PATTERN = new RegExp(
);

module.exports = {
  PASSWORD_PATTERN,
  EMAIL_PATTERN,
};
