import * as Yup from 'yup';

export const yupValidationRules = {
  first_name: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s-]+$/,
      'First name can only contain letters, spaces, and hyphens.'
    )
    .min(2, 'First name must be at least 2 characters.')
    .max(16, 'First name must be at most 16 characters.')
    .required('First name is required.'),

  last_name: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s-]+$/,
      'Last name can only contain letters, spaces, and hyphens.'
    )
    .min(2, 'Last name must be at least 2 characters.')
    .max(16, 'Last name must be at most 16 characters.')
    .required('Last name is required.'),

  username: Yup.string()
    .matches(
      /^[A-Za-z0-9_.]+$/,
      'Username can only contain letters, numbers, underscores, and dots.'
    )
    .min(6, 'Username must be at least 3 characters.')
    .max(16, 'Username must be at most 16 characters.')
    .required('Username is required.'),

  email: Yup.string()
    .email('Please enter a valid email address.')
    .max(50, 'Email must be at most 50 characters.')
    .required('Email is required.'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .max(16, 'Password must be at most 16 characters.')
    .required('Password is required.'),

  tcno: Yup.string()
    .matches(/^\d{11}$/, 'TC No must be exactly 11 digits.')
    .nullable(), // Optional field

  phone: Yup.string()
    .matches(
      /^\+?\d{10,15}$/,
      'Phone number must be between 10 and 15 digits, and can start with a +.'
    )
    .required('Phone number is required.'),

  date_of_birth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future.')
    .test(
      'is-adult',
      'You must be at least 18 years old.',
      (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 18;
        }
        return age >= 18;
      }
    )
    .required('Date of birth is required.'),

  address: Yup.string()
    .min(10, 'Address must be at least 10 characters.')
    .max(100, 'Address must be at most 100 characters.')
    .required('Address is required.'),

  city: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/,
      'City can only contain letters and spaces.'
    )
    .required('City is required.'),

  postal_code: Yup.string()
    .matches(/^\d{5}$/, 'Postal code must be exactly 5 digits.')
    .required('Postal code is required.'),

  country: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/,
      'Country can only contain letters and spaces.'
    )
    .required('Country is required.'),
};

export const validationRules = {

}

export const plate_regex = {
  tr: /^(0[1-9]|[1-7][0-9]|81)[A-Z]{1,3}\d{1,4}$/,
  
}