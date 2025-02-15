// TODO: ImagePicker

TODO: NotFound'u dene
register olurken loading varken loading'i göster
Pagination kullan.
Dark tema gelmeli!
Stil düzenlemeleri gelmeli

todo: Kullanıcı kayıt olurken plakayı da kayıt etmeli ya da plakasız kayıt olmalı!
kullanıcı bilgilerini public yaparsa direkt görünecek, protected yaparsa istek, private yaparsa kimseye görünmemeli.

login register icon
anasayfayı az düzelt
üst tarafta şarj felan çıkmıyor.
login sonrası index'e yönlendirmemeli! Direkt home sayfasına yönlendir
Plaka değiştiğinde kişi bilgileri de değişecek. 
dünyada yorumlanan son 5 plakayı getirt.
ScreenView gibi yap home'yi
başta index'ten başlıyor. Onu düzeltdirekt login'e atsın.
database tarafında mesela username'a constraints'ler ekle
plakayı aratanlar count

Register butonuna basınca loading
plate'i unique yap
home sayfasındaki plaka ve yorumlar 3 ten fazla olursa sürüklemeli görelim.  eğer yorumlar 3'ten fazla ise sürükleme olsun.
plate_no plate_name aynı şey düzelt

login bugunu kontrol et 
plaka, bir user_id'ye sahip olmak zorunda değil.
bir user kayıt olduktan sonra plaka eklerken eğer o plaka var ise ve user_id'si yoksa direkt atanabilir
tüm butonlar, eğer formlar valid değilse disabled

veritabanına kaydettiğin alanlardan hangileri hashlenmeli ?
yorumu düzenlenin yanında iptal butonu olmalı!
plaka formatı hatalı ise kullanıcıyı bilgilendir.
eğer user.plate >=3 ise ekleme yapamamalı SQL'de ayarla
plate oluşturulduğunda plate_comments oluşturmaya gerek yok fakat böyle bir yapıda plate_comments'leri çekerken null gelecek.
null constraints'i SQL'de ayarla

en son tc'yi zorunlu yap ve kontrol et
google ile giriş
plate_no unique olmalı
plakayı sildiğimizde eğer son gönderilen yorumlarda varsa kaldırsın. 

ÖNEMLİ
her kullanıcı günde max 20 yorum yapabilsin.
telefon no unique

galeri ara
login olurken önce hata varsa yansıtmalı. Network request failed, mail verification message

ADMIN'i düzelt
plate yorumlarını getirirken önce en yenilerini getirmeli



invalid refresh token error'u düzelt
plaka eklerken tarih eklenmiyor. DTO'ları düzelt

PLAKA SILINSE BILE YORUMLAR SILINMEMELI
her şehrin bir plaka rank'ı olabilir.
plaka yorumu silerken uyarı versin önce direkt silmesin.
yorum güncellendi * ekle


// ŞUAN YAP
login'deki bilgileri sil.