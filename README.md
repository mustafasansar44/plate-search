## 🚘 Plaka Arama Uygulaması  
**Durum:** ✅ Tamamlandı  
**Teknolojiler:** Supabase · React Native 

### ✨ Özellikler ve Yapılanlar

#### 🎨 Arayüz ve Kullanıcı Deneyimi
- ✅ Ana sayfada diğer kullanıcıların yaptığı plaka yorumlar görünebiliyor. plaka veya yorum sayısı 3’ten fazlaysa dikey sürükleme özelliği eklendi.
- ✅ Plaka yorumları en yeni olacak şekilde sıralandı.
- ✅ Bir plakaya ait yorum sayısı 20’yi geçerse sayfalama (pagination) eklendi.

#### 🔍 Arama ve Veri Görüntüleme
- ✅ Dünyada en son yorumlanan 3 plaka ana sayfada gösterilecek şekilde getirildi.
- [ ] Kullanıcıların plaka arama sayısı (count) tutuldu.

#### 🗃️ Veri Yönetimi ve Kurallar
- ✅ Bir kullanıcı plaka yorumladığında eğer plaka sistemde kayıtlı değilse, `user_id = null` olacak şekilde otomatik olarak veritabanına eklendi.
- ✅ Kullanıcı bir plaka eklemeye çalıştığında, o plaka veritabanında varsa ve `user_id = null` ise, ilgili kullanıcı `user_id` olarak atandı.
- ✅ Kullanıcı kendi plakasını sildiğinde yalnızca `plate.user_id = null` olarak güncellendi. Plaka ve yorumları sistemde kalmaya devam etti.
- ✅ Bir kullanıcı en fazla 3 plaka ekleyebilecek şekilde SQL seviyesinde kısıtlama getirildi.

#### 🔐 Kimlik Doğrulama
- [ ] Google ile giriş özelliği entegre edildi.



<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>


## 🚘 License Plate Lookup App  
**Status:** ✅ Completed  
**Technologies:** Supabase · React Native  

### ✨ Features and Completed Tasks

#### 🎨 UI & User Experience
- ✅ On the home screen, users can view license plate comments made by others. If there are more than 3 plates or comments, vertical scrolling is enabled.
- ✅ Comments for a license plate are displayed in descending order by creation date (latest first).
- ✅ Pagination is implemented if a license plate has more than 20 comments.

#### 🔍 Search & Data Display
- ✅ The 3 most recently commented license plates from around the world are displayed on the home screen.
- [ ] The number of times a license plate is searched (count) is tracked.

#### 🗃️ Data Management & Business Rules
- ✅ When a user comments on a plate that does not exist in the database, it is automatically added with `user_id = null`.
- ✅ When a user adds a plate that already exists in the database with `user_id = null`, the plate is assigned to that user.
- ✅ When a user deletes their own plate, only the `user_id` field is set to null. The plate and its comments remain visible in the system.
- ✅ A user can own a maximum of 3 plates. This rule is enforced at the SQL level.

#### 🔐 Authentication
- [ ] Google Sign-In integration is implemented.
