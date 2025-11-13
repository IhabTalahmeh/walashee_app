import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StickerScanner from 'src/components/Case/StickerScanner/StickerScanner'
import IDScanner from 'src/components/User/IDScanner/IDScanner';

export default function AcceptInvitationForm({ props }: any) {

  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    if (identity !== null) {
      // refetch();
      console.log('identity', identity);
    }
  }, [identity]);

  const onIdentityScan = async (path: string) => {    
    setIdentity(path);
  }


  return (
    <View>
      <View>
        <IDScanner
          onSelect={onIdentityScan}
          onCancel={() => console.log('cance')} />
      </View>
    </View>
  )
}