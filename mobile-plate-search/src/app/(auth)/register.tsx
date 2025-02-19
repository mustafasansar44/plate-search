import React, { useState, useRef } from 'react';
import { Alert, StyleSheet, View, ScrollView, Text, Linking } from 'react-native';
import { Button, Input, CheckBox } from '@rneui/themed';
import { supabase } from '@/lib/supabase';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-input';
import { yupValidationRules } from '@/constants/validationRules';

// Type definition for form values
interface RegisterFormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  tcno?: string;
  termsAccepted: boolean;
}

// Validation schema
const RegisterSchema = Yup.object().shape({
  first_name: yupValidationRules.first_name,
  last_name: yupValidationRules.last_name,
  username: yupValidationRules.username,
  email: yupValidationRules.email,
  password: yupValidationRules.password,
  tcno: yupValidationRules.tcno,
});

// Kullanım koşulları ve gizlilik politikası metni
const termsAndPrivacyText = `
PLAKA ARAMA UYGULAMASI KULLANIM KOŞULLARI VE GİZLİLİK POLİTİKASI

1. GİRİŞ Bu Kullanım Koşulları ve Gizlilik Politikası, Plaka Arama Uygulaması’nın kullanımına ilişkin hüküm ve şartları belirlemektedir. Uygulamayı kullanmadan önce lütfen bu Koşulları dikkatlice okuyunuz. Uygulamaya üye olarak veya kullanarak, bu Koşulları kabul ettiğinizi beyan etmiş olursunuz.

2. HİZMET TANIMI Plaka Arama, kullanıcıların araç plakalarını aratarak, ilgili plakaya yapılan yorumları görebilmelerini ve yeni yorumlar ekleyebilmelerini sağlayan bir platformdur. Bu hizmet, yalnızca bilgilendirme amacı taşımaktadır ve araç sahiplerinin kimlik bilgilerini içermemektedir.

3. KULLANICI SORUMLULUKLARI 3.1. Kullanıcılar, Uygulamayı hukuka uygun, genel ahlaka aykırı olmayan ve başkalarının haklarını ihlal etmeyecek şekilde kullanmalıdır. 3.2. Kullanıcılar, herhangi bir kişi veya kurum hakkında hakaret içeren, tehdit edici, iftira niteliğinde veya kişisel gizlilik haklarını ihlal eden içerikler paylaşmamayı kabul eder. 3.3. Kullanıcılar, paylaştıkları tüm içeriklerden bizzat sorumludur. Plaka Arama, kullanıcılar tarafından paylaşılan içerikler üzerinde kontrol sağlamakla yükümlü değildir ve bu içeriklerden sorumlu tutulamaz.

4. HUKUKİ VE CEZAİ SORUMLULUK 4.1. Kullanıcılar, paylaştıkları içeriklerin yürürlükteki mevzuata aykırı olmamasını sağlamakla yükümlüdür. 4.2. 5237 sayılı Türk Ceza Kanunu ve 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun kapsamında, kullanıcıların yasadışı paylaşımlar yapması halinde tüm hukuki ve cezai sorumluluk kendilerine aittir. 4.3. Plaka Arama, hukuka aykırı bir paylaşım tespit ettiğinde içeriği kaldırma ve gerektiğinde ilgili makamlara bildirimde bulunma hakkını saklı tutar.

5. ÜYELİK VE ONAY
5.1. Uygulamaya kayıt olabilmek için, kullanıcıların bu Kullanım Koşulları’nı okuduklarını ve kabul ettiklerini onaylamaları gerekmektedir.
5.2. Kullanıcılar, kayıt aşamasında onay kutucuğunu işaretleyerek bu Koşullar’ı kabul ettiğini beyan etmiş olur. Koşulları kabul etmeyen kullanıcılar, uygulamaya üye olamaz ve hizmetlerden yararlanamaz.

6. KİŞİSEL VERİLERİN KORUNMASI VE GİZLİLİK POLİTİKASI
6.1. Kullanıcıların kişisel verileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")’na uygun olarak işlenir.
6.2. Kullanıcıların yorumları anonim olarak saklanır ve paylaşım yapılan plakalarla eşleştirilerek görüntülenir.
6.3. Kullanıcılar, sistemden ayrılmak ve kişisel verilerini silmek istediklerinde destek ekibimizle iletişime geçebilirler.

7. UYGULAMA KAPATMA VE İÇERİK KALDIRMA HAKKI 7.1. Plaka Arama, herhangi bir nedenle hizmeti sona erdirme, kullanıcı hesaplarını askıya alma veya içeriği kaldırma hakkına sahiptir. 7.2. Kullanıcıların kurallara aykırı davrandığının tespit edilmesi halinde, hesapları kalıcı veya geçici olarak kapatılabilir.

8. FİKRİ MÜLKİYET HAKLARI 8.1. Uygulama içeriği ve tasarımı Plaka Arama’ya aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır. 8.2. Kullanıcılar, Uygulama içeriklerini izinsiz olarak çoğaltamaz, kopyalayamaz veya üçüncü taraflarla paylaşamaz.

9. UYUŞMAZLIKLARIN ÇÖZÜMÜ
9.1. İşbu Koşullar, Türkiye Cumhuriyeti yasalarına tabidir.
9.2. Taraflar arasında doğabilecek her türlü uyuşmazlıkta, İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.

10. GÜNCELLEME VE YÜRÜRLÜK 10.1. Plaka Arama, Kullanım Koşulları’nı ve Gizlilik Politikası’nı dilediği zaman güncelleme hakkına sahiptir. 10.2. Güncellenen şartlar, kullanıcıların erişimine sunulduktan sonra geçerli olur ve kullanıcılar güncellenen Koşullar’ı kabul etmiş sayılır.

İLETİŞİM Herhangi bir soru veya talebiniz için bizimle mustafasansar44@gmail.com üzerinden iletişime geçebilirsiniz.

Bu şartları okuyup kabul ettiğinizi onaylamadan sisteme üye olamazsınız.
`;

export default function RegisterScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const phoneInputRef = useRef<PhoneInput>(null);

  const openTermsAndPrivacyPolicy = () => {
    setShowTerms(true);
  };

  const handleSignUp = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    if (!phoneInputRef.current?.isValidNumber()) {
      Alert.alert('Geçersiz telefon numarası, lütfen telefon numaranızı düzeltin.');
      return;
    }

    setLoading(true);
    const phoneNumber = phoneInputRef.current?.getValue();
    const phoneCode = phoneInputRef.current?.getCountryCode();

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          tcno: values.tcno ?? undefined,
          phone: phoneNumber,
          phone_code: phoneCode,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session && !error) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      {showTerms ? (
        <View style={styles.termsContainer}>
          <ScrollView style={styles.termsScroll}>
            <Text style={styles.termsText}>{termsAndPrivacyText}</Text>
          </ScrollView>
          <Button
            title="Kapat"
            onPress={() => setShowTerms(false)}
            buttonStyle={styles.closeButton}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Hesap Oluştur</Text>
          <Formik<RegisterFormValues>
            initialValues={{
              first_name: '',
              last_name: '',
              username: '',
              email: '',
              password: '',
              phone: '',
              tcno: '',
              termsAccepted: false,
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSignUp}
          >
            {(formikProps) => (
              <View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="Adı"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={formikProps.handleChange('first_name')}
                    onBlur={formikProps.handleBlur('first_name')}
                    value={formikProps.values.first_name}
                    placeholder="Adı"
                    errorMessage={
                      formikProps.touched.first_name && formikProps.errors.first_name
                        ? formikProps.errors.first_name
                        : undefined
                    }
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="Soyadı"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={formikProps.handleChange('last_name')}
                    onBlur={formikProps.handleBlur('last_name')}
                    value={formikProps.values.last_name}
                    placeholder="Soyadı"
                    errorMessage={
                      formikProps.touched.last_name && formikProps.errors.last_name
                        ? formikProps.errors.last_name
                        : undefined
                    }
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="Kullanıcı Adı"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={formikProps.handleChange('username')}
                    onBlur={formikProps.handleBlur('username')}
                    value={formikProps.values.username}
                    placeholder="Kullanıcı Adı"
                    errorMessage={
                      formikProps.touched.username && formikProps.errors.username
                        ? formikProps.errors.username
                        : undefined
                    }
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                    value={formikProps.values.email}
                    placeholder="deneme@gmail.com"
                    autoCapitalize={'none'}
                    errorMessage={
                      formikProps.touched.email && formikProps.errors.email
                        ? formikProps.errors.email
                        : undefined
                    }
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="Parola"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={formikProps.handleChange('password')}
                    onBlur={formikProps.handleBlur('password')}
                    value={formikProps.values.password}
                    secureTextEntry={true}
                    placeholder="Parola"
                    autoCapitalize={'none'}
                    errorMessage={
                      formikProps.touched.password && formikProps.errors.password
                        ? formikProps.errors.password
                        : undefined
                    }
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Text style={styles.phoneLabel}>Telefon Numarası</Text>
                  <PhoneInput
                    ref={phoneInputRef}
                    initialCountry="tr"
                    style={styles.phoneInput}
                    textStyle={styles.phoneInputText}
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  {/* <Input
                    label="TC No (Optional)"
                    leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                    onChangeText={formikProps.handleChange('tcno')}
                    onBlur={formikProps.handleBlur('tcno')}
                    value={formikProps.values.tcno}
                    placeholder="TC No"
                    errorMessage={
                      formikProps.touched.tcno && formikProps.errors.tcno
                        ? formikProps.errors.tcno
                        : undefined
                    }
                  /> */}
                </View>
                <View style={styles.verticallySpaced}>
                  <CheckBox
                    title={
                      <Text>
                        <Text>Kullanım Koşullarını ve Gizlilik Politikasını </Text>
                        <Text style={styles.link} onPress={openTermsAndPrivacyPolicy}>
                          kabul ediyorum.
                        </Text>
                      </Text>
                    }
                    checked={formikProps.values.termsAccepted}
                    onPress={() => formikProps.setFieldValue('termsAccepted', !formikProps.values.termsAccepted)}
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Button
                    title="Kaydol"
                    disabled={loading || !formikProps.values.termsAccepted}
                    onPress={() => formikProps.handleSubmit()}
                    buttonStyle={{ marginTop: 10 }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  verticallySpaced: {
    marginBottom: 10,
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#86939e',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#86939e',
    borderRadius: 4,
    height: 50,
    paddingHorizontal: 10,
  },
  phoneInputText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  link: {
    color: '#2089dc',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  termsScroll: {
    flex: 1,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#2089dc',
  },
});