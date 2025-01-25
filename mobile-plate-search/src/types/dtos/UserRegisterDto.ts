export interface UserRegisterDto{
    first_name: string; // maksimum 16 karakter
    last_name: string; // maksimum 16 karakter
    username: string; // maksimum 16 karakter
    password: string; // maksimum 16 karakter
    email: string; // maksimum 50 karakter, mail adresi olmalı
    tcno?: string; // burayı işlemeni istemiyorum. Belki daha sonra yaparız.
    phone_code: string; //  burayı bir select option şeklinde ülkelerden seçmeli
    phone: string; 
}