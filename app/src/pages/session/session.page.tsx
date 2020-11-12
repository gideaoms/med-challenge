import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/axios/axios.service';

const Session = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Atenção', 'Preencha todos os campos');
        return;
      }
      setLoading(true);
      const response = await api.post('sessions', { email, password });
      navigation.navigate('Groups', {
        token: response.data.token,
        userGroupId: response.data.user.groupId,
      });
    } catch (err) {
      Alert.alert('Erro', 'Erro ao fazer login, verifique suas credenciais');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={signIn}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },

  input: {
    color: '#1E555C',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#1E555C',
    borderWidth: 1,
    marginBottom: 15,
  },

  button: {
    padding: 15,
    backgroundColor: '#1E555C',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Session;
