import { Pressable, StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return (
      <View style={styles.container}>
        <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
          <View>
            <FlatList
                data={contacts}
                renderItem={({ item }) => (
                    <View key={item.id}>
                      <Text>
                        {item.name}: {item?.phoneNumbers[0].number}
                      </Text>
                    </View>
                )}
            />
          </View>
          <View>
            <Pressable
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    elevation: 3,
                }}
            >
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>Get Contacts</Text>
            </Pressable>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
});
