STEP 1
1- Genel bir servis sınıfı yaz. Bu servis sınıfına supabase icin CRUD operasyonları yapmak için yazıyoruz. Daha sonra bu servisi 
TABLE_NAME, QUERY, EQUAL gibi 
bu parametrelere göre çağıracağız. Mesela servisin adı DenemeService olsun. 

Yani özetle, genel, dinamik bir supabase CRUD servisi yazmak istiyoruz.
STEP 1 BİTTİ



mobile-plate-search projesine admin paneli desteği gelmesi gerekiyor. 
Admin iken login olduğumuzda bazı ek feature'ler görmek istiyoruz.
1- Admin, bir plaka aratarak [plate_name].tsx sayfasına girdiğinde, yorumları silebilmeli.
2- Admin, bir plaka aratarak [plate_name].tsx sayfasına girdiğinde, yorumları güncelleyebilmeli.
3- Admin, bir user'i banlayabilmeli.

Admin olarak login olduğumuzda background rengi beyaz-gri tonlarında olmalı.


// TODO: ImagePicker
uselocalsearchparam vs global
link vs .push

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