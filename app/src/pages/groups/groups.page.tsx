import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/axios/axios.service';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Group = {
  id: number;
  name: string;
};

type Params = {
  token: string;
  userGroupId: number;
};

const Groups = () => {
  const route = useRoute();
  const [groups, setGroups] = useState<Group[]>([]);
  const { token, userGroupId: groupId } = route.params as Params;
  const [userGroupId, setUserGroupId] = useState(groupId);

  useEffect(() => {
    api
      .get('groups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGroups(response.data);
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao buscar grupos');
      });
  }, []);

  const associate = (groupId: number) => {
    api
      .put(`groups/${groupId}/users`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUserGroupId(groupId);
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao associar grupo');
      });
  };

  return (
    <FlatList
      contentContainerStyle={{ padding: 15 }}
      data={groups}
      keyExtractor={(group) => String(group.id)}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.itemContainer}>
          <View>
            <Text style={styles.itemTitle}>{item.name}</Text>
          </View>
          {userGroupId === item.id ? (
            <Text style={styles.itemCurrentGroup}>Associado</Text>
          ) : (
            <TouchableOpacity
              onPress={() => associate(item.id)}
              style={styles.itemButton}
              disabled={userGroupId === item.id}>
              <Text style={styles.itemButtonTitle}>Associar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 14,
    color: '#1E555C',
  },

  itemButton: {
    backgroundColor: '#1E555C',
    padding: 10,
    borderRadius: 5,

    flexGrow: 1,
  },

  itemButtonTitle: {
    color: '#fff',
  },

  itemCurrentGroup: {
    color: '#1E555C',
    fontSize: 14,
    marginVertical: 10
  },
});

export default Groups;
