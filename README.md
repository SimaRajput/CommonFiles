

1) Google pay and Android pay intigration.

 #) Android --
  a)run npm install react-native-payments
  b)Edit android/app/src/main/AndroidManifest.xml file.

  Add these line in <application>
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />

  c) add this line in android/app/build.gradle in your dependencies
   implementation 'com.google.android.gms:play-services-wallet:17.0.0'  

