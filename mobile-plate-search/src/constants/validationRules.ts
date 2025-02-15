import * as Yup from 'yup';

export const yupValidationRules = {
  first_name: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s-]+$/,
      'Ad sadece harfler ve boşluklar içerebilir.' // tire de içerebiliyor. Düzelt
    )
    .min(2, 'Ad en az 2 karakter olmalıdır.')
    .max(16, 'Ad en fazla 16 karakter olmalıdır.')
    .required('Ad alanı zorunludur.'),

  last_name: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s-]+$/,
      'Soyad sadece harfler ve boşluklar içerebilir.' // tire de içerebiliyor. Düzelt
    )
    .min(2, 'Soyad en az 2 karakter olmalıdır.')
    .max(16, 'Soyad en fazla 16 karakter olmalıdır.')
    .required('Soyad alanı zorunludur.'),

  username: Yup.string()
    .matches(
      /^[A-Za-z0-9_.]+$/,
      'Kullanıcı adı sadece harfler, rakamlar, alt çizgi ve nokta içerebilir.'
    )
    .min(6, 'Kullanıcı adı en az 3 karakter olmalıdır.')
    .max(16, 'Kullanıcı adı en fazla 16 karakter olmalıdır.')
    .required('Kullanıcı adı zorunludur.'),

  email: Yup.string()
    .email('Lütfen geçerli bir e-posta adresi giriniz.')
    .max(50, 'E-posta en fazla 50 karakter olmalıdır.')
    .required('E-posta alanı zorunludur.'),

  password: Yup.string()
    .min(8, 'Şifre en az 8 karakter olmalıdır.')
    .max(16, 'Şifre en fazla 16 karakter olmalıdır.')
    .required('Şifre alanı zorunludur.'),

  tcno: Yup.string()
    .matches(/^\d{11}$/, 'TC Kimlik No tam olarak 11 rakam olmalıdır.')
    .nullable(), // İsteğe bağlı alan

  phone: Yup.string()
    .matches(
      /^\+?\d{10,15}$/,
      'Telefon numarası 10 ile 15 rakam arasında olmalı ve + ile başlayabilir.'
    )
    .required('Telefon numarası zorunludur.'),

  date_of_birth: Yup.date()
    .max(new Date(), 'Doğum tarihi gelecekte olamaz.')
    .test(
      'is-adult',
      'En az 18 yaşında olmalısınız.',
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
    .required('Doğum tarihi zorunludur.'),

  address: Yup.string()
    .min(10, 'Adres en az 10 karakter olmalıdır.')
    .max(160, 'Adres en fazla 100 karakter olmalıdır.')
    .required('Adres alanı zorunludur.'),

  city: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/,
      'Şehir sadece harfler ve boşluklar içerebilir.'
    )
    .required('Şehir alanı zorunludur.'),

  postal_code: Yup.string()
    .matches(/^\d{5}$/, 'Posta kodu tam olarak 5 rakam olmalıdır.')
    .required('Posta kodu zorunludur.'),

  country: Yup.string()
    .matches(
      /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/,
      'Ülke sadece harfler ve boşluklar içerebilir.'
    )
    .required('Ülke alanı zorunludur.'),
};

export const validationRules = {

}

export const plate_regex = {
  tr: /^(0[1-9]|[1-7][0-9]|81)[A-Z]{1,3}\d{1,4}$/,
  
}