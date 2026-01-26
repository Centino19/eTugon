import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Alert, ActivityIndicator
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const municipalities = [
  { label: 'City of San Fernando', value: 'San Fernando' },
];

const sanFernandoBarangays = [
  { label: 'Abut', value: 'Abut' },
  { label: 'Apaleng', value: 'Apaleng' },
  { label: 'Bacsil', value: 'Bacsil' },
  { label: 'Baraoas', value: 'Baraoas' },
  { label: 'Bato', value: 'Bato' },
  { label: 'Cabaroan', value: 'Cabaroan' },
  { label: 'Cabarsican', value: 'Cabarsican' },
  { label: 'Cadacad', value: 'Cadacad' },
  { label: 'Cagayaoan', value: 'Cagayaoan' },
  { label: 'Calabugao', value: 'Calabugao' },
  { label: 'Camansi', value: 'Camansi' },
  { label: 'Canaoay', value: 'Canaoay' },
  { label: 'Carlatan', value: 'Carlatan' },
  { label: 'Catbangen', value: 'Catbangen' },
  { label: 'Dallangayan', value: 'Dallangayan' },
  { label: 'Dalumpinas', value: 'Dalumpinas' },
  { label: 'Ilocanos Sur', value: 'Ilocanos Sur' },
  { label: 'Ilocanos Norte', value: 'Ilocanos Norte' },
  { label: 'Langiden', value: 'Langiden' },
  { label: 'Lingsat', value: 'Lingsat' },
  { label: 'Mameltac', value: 'Mameltac' },
  { label: 'Masicong', value: 'Masicong' },
  { label: 'Nagyubuyuban', value: 'Nagyubuyuban' },
  { label: 'Namtutan', value: 'Namtutan' },
  { label: 'Narra', value: 'Narra' },
  { label: 'Paagan', value: 'Paagan' },
  { label: 'Pagdalagan', value: 'Pagdalagan' },
  { label: 'Pagdaraoan', value: 'Pagdaraoan' },
  { label: 'Pagbangkeruan', value: 'Pagbangkeruan' },
  { label: 'Paguudpudan', value: 'Paguudpudan' },
  { label: 'Pao Norte', value: 'Pao Norte' },
  { label: 'Pao Sur', value: 'Pao Sur' },
  { label: 'Paratong', value: 'Paratong' },
  { label: 'Pias', value: 'Pias' },
  { label: 'Poro', value: 'Poro' },
  { label: 'Sacyud', value: 'Sacyud' },
  { label: 'Sagayad', value: 'Sagayad' },
  { label: 'San Agustin', value: 'San Agustin' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'San Vicente', value: 'San Vicente' },
  { label: 'Santiago', value: 'Santiago' },
  { label: 'Saoay', value: 'Saoay' },
  { label: 'Sevilla', value: 'Sevilla' },
  { label: 'Siboan', value: 'Siboan' },
  { label: 'Taboc', value: 'Taboc' },
  { label: 'Tanqui', value: 'Tanqui' },
  { label: 'Tanquigan', value: 'Tanquigan' },
];

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (isLoading) return;

    if (!name || !email || !password || !confirmPassword || !houseNumber || !municipality || !barangay) {
      Alert.alert("Notice", "Please complete all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Notice", "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Notice", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://10.10.19.221:8087/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          house_number: houseNumber,
          municipality,
          barangay
        })
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Account created successfully!");
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setHouseNumber('');
        setMunicipality('');
        setBarangay('');
      } else {
        Alert.alert("Notice", data.detail || "Registration unsuccessful");
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      Alert.alert("Notice", "Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient
        colors={['#ffffff', '#e6f0fa', '#ffffff']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Image source={require('@/assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join our community and report issues</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Personal Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>

                <View style={styles.inputContainer}>
                  <FontAwesome name="user" size={20} color="#004a89" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <FontAwesome name="envelope" size={20} color="#004a89" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Password Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Security</Text>

                <View style={styles.inputContainer}>
                  <FontAwesome name="lock" size={20} color="#004a89" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#004a89" />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <FontAwesome name="lock" size={20} color="#004a89" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                    <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#004a89" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Address Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>

                <View style={styles.inputContainer}>
                  <FontAwesome name="home" size={20} color="#004a89" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="House Number & Street"
                    value={houseNumber}
                    onChangeText={setHouseNumber}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <FontAwesome name="building" size={20} color="#004a89" style={styles.pickerIcon} />
                  <View style={styles.pickerWrapper}>
                    <RNPickerSelect
                      onValueChange={(value) => setMunicipality(value)}
                      items={municipalities}
                      placeholder={{ label: 'Select Municipality', value: null }}
                      style={pickerSelectStyles}
                    />
                  </View>
                </View>

                {municipality === 'San Fernando' && (
                  <View style={styles.pickerContainer}>
                    <FontAwesome name="map-marker" size={20} color="#004a89" style={styles.pickerIcon} />
                    <View style={styles.pickerWrapper}>
                      <RNPickerSelect
                        onValueChange={(value) => setBarangay(value)}
                        items={sanFernandoBarangays}
                        placeholder={{ label: 'Select Barangay', value: null }}
                        style={pickerSelectStyles}
                      />
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <FontAwesome name="user-plus" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Register</Text>
                  </>
                )}
              </TouchableOpacity>

              <Text style={styles.termsText}>
                By registering, you agree to our{' '}
                <Text style={styles.termsLink}>Terms and Conditions</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004a89',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004a89',
    marginBottom: 15,
    paddingLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    padding: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  eyeIcon: {
    padding: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pickerIcon: {
    padding: 15,
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  button: {
    backgroundColor: '#004a89',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#004a89',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#7fa8d1',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: '#004a89',
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#2c3e50',
    padding: 15,
    fontSize: 16,
    paddingLeft: 0,
  },
  inputAndroid: {
    color: '#2c3e50',
    padding: 15,
    fontSize: 16,
    paddingLeft: 0,
  },
  placeholder: {
    color: '#999',
  },
});