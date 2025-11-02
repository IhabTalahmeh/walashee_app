import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Purchases from 'react-native-purchases';

export default function SubscriptionScreen() {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const getOfferings = async () => {
      const offerings: any = await Purchases.getOfferings();
      const packages = offerings.current.availablePackages;
      setPackages(packages);
    }
    getOfferings();
  })

  const onPurchase = async (pkg: any) => {
    try {
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pkg);
      if (customerInfo.entitlements.active['your_entitlement_id']) {
        // Success!
        Alert.alert('Thank you!', 'You are now subscribed.');
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Purchase failed', e.message);
      }
    }
  };


  return (
    <View>
      {packages.map((pkg) => (
        <View key={pkg.identifier}>
          <Text>{pkg.product.title}</Text>
          <Button title="Buy" onPress={() => onPurchase(pkg)} />
        </View>
      ))}

    </View>
  )
}