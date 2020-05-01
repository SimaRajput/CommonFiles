import React, { Component } from 'react';
import { View, StyleSheet,Alert,TouchableOpacity,Text } from 'react-native';
const PaymentRequest = require('react-native-payments').PaymentRequest;

// const METHOD_DATA = [{
//   supportedMethods: ['apple-pay'],
//   data: {
//     merchantIdentifier: 'merchant.apple.test',
//     supportedNetworks: ['visa', 'mastercard', 'amex'],
//     countryCode: 'US',
//     currencyCode: 'USD'
//   }
// }];

const METHOD_DATA = [{
  supportedMethods: ['android-pay'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    currencyCode: 'USD',
    environment: 'TEST', // defaults to production
    paymentMethodTokenizationParameters: {
      tokenizationType: 'NETWORK_TOKEN',
      parameters: {
        publicKey: 'BKmbVIGwZw3TUITg1NIppTrWXCGuXt1YdfAnY0ToqYaNzxdkY5ZUNO0WN8Q35rcnrQavsAfRtWYKKoXAcZ7MOVQ' //cutsome public key
      }
    }
  }
}];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: { currency: 'USD', value: '15.00' }
    },
    {
      label: 'Grocery',
      amount: { currency: 'USD', value: '5.00' }
    }
  ],
  shippingOptions: [{
    id: 'economy',
    label: 'Economy Shipping',
    amount: { currency: 'USD', value: '0.00' },
    detail: 'Arrives in 3-5 days' // `detail` is specific to React Native Payments
  }],
  total: {
    label: 'Enappd Store',
    amount: { currency: 'USD', value: '20.00' }
  }
};
const OPTIONS = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
  requestShipping: true
};
const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

paymentRequest.addEventListener('shippingaddresschange', e => {
  const updatedDetails = getUpdatedDetailsForShippingAddress(paymentRequest.shippingAddress);

  e.updateWith(updatedDetails);
});

paymentRequest.addEventListener('shippingoptionchange', e => {
  const updatedDetails = getUpdatedDetailsForShippingOption(paymentRequest.shippingOption);

  e.updateWith(updatedDetails);
});



class Pay extends Component {
    check = () => {
      console.log('Heloooo')
      paymentRequest.canMakePayments().then((canMakePayment) => {
        if (canMakePayment) {
          Alert.alert(
            'Android Pay',
            'Android Pay is available in this device'
          );
        }
      })
    }
    
    pay = () => {
    try{
        paymentRequest.canMakePayments().then((canMakePayment) => {
        if (canMakePayment) {
          console.log(canMakePayment,'paymentRequest')
          console.log('Can Make Payment')
          paymentRequest.show().then((response) => {
            console.log('response',response)
        })
      }
        else {
          console.log('Cant Make Payment')
        }
      })
    }
    catch{(error) => console.log('error',error);
    }
    }

    render() {
       return (
            <View style={styles.container}>
                <View style={styles.button}>
                  <Text style={{padding:10}}>{'Android and Apple Pay Example'}</Text>
                  <TouchableOpacity style={styles.checkButton} activeOpacity={0.8} onPress={this.check}>
                  <Text style={styles.checkText}>{'Check Android Pay'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.payButton} activeOpacity={0.8} onPress={this.pay}>
                  <Text style={styles.payText}>{'Pay with Android Pay'}</Text>
                  </TouchableOpacity>
            </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button:{
        alignSelf:'center',
        width:'100%',
        alignItems:'center',
        flex:1,
        justifyContent:'center'
    },
    checkButton:{
      width:'90%',
      alignItems:'center',
      backgroundColor:'skyblue',
      height:40,
      justifyContent:'center'
    },
    checkText:{
      color:'#fff',
      fontWeight:'900'
    },
    payButton:{
      width:'90%',
      alignItems:'center',
      backgroundColor:'skyblue',
      height:40,
      justifyContent:'center',
      top:20
    },
    payText:{
      color:'#fff',
      fontWeight:'900'
    }
});

export default Pay;
