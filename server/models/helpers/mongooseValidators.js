const DEFAULT_VALIDATION = {
    type: String,
    required: [true, 'שדה זה הוא חובה'],
    minLength: [2, 'השדה חייב להכיל לפחות 2 תווים'],
    maxLength: [256, 'השדה לא יכול לעלות על 256 תווים'],
    trim: true,
};

const EMAIL = {
    type: String,
    required: [true, 'כתובת אימייל היא שדה חובה'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/), 'נא להזין כתובת אימייל תקינה']
};

module.exports = { DEFAULT_VALIDATION, EMAIL };