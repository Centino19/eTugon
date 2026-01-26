import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Define types for our form data
type ReportCategory = 'Crime & Safety' | 'Health & Sanitation' | 'Traffic & Infrastructure' | 'Environment & Disasters' | 'Community Concerns' | 'Others';
type ReportStatus = 'Pending' | 'In Progress' | 'Completed';

interface ReportFormData {
  title: string;
  description: string;
  category: ReportCategory | '';
  images: string[];
  location: string;
  isAnonymous: boolean;
  status: ReportStatus;
}

export default function CreateReport() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    category: '',
    images: [],
    location: '',
    isAnonymous: false,
    status: 'Pending',
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [dropdownType, setDropdownType] = useState<'category' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [filterOption, setFilterOption] = useState('all');

  const categories: ReportCategory[] = [
    'Crime & Safety',
    'Health & Sanitation',
    'Traffic & Infrastructure',
    'Environment & Disasters',
    'Community Concerns',
    'Others'
  ];

  const openDropdown = (type: 'category') => {
    setDropdownType(type);
    setShowCategoryDropdown(true);
  };

  const closeDropdown = () => {
    setDropdownType(null);
    setShowCategoryDropdown(false);
  };

  const selectCategory = (category: ReportCategory) => {
    setFormData({ ...formData, category });
    closeDropdown();
  };

  const toggleAnonymous = () => {
    setFormData({ ...formData, isAnonymous: !formData.isAnonymous });
  };

  // Simulate image upload from gallery
  const simulateUploadFromGallery = () => {
    if (formData.images.length < 4) {
      const newImage = `gallery-image-${Date.now()}`;
      setFormData({
        ...formData,
        images: [...formData.images, newImage]
      });
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 4 images');
    }
  };

  // Simulate taking a photo with camera
  const simulateTakePhoto = () => {
    if (formData.images.length < 4) {
      const newImage = `camera-image-${Date.now()}`;
      setFormData({
        ...formData,
        images: [...formData.images, newImage]
      });
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 4 images');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title for your report');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!formData.category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (formData.images.length === 0) {
      Alert.alert('Error', 'Please add at least one image');
      return;
    }

    if (!formData.location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    try {
      setIsSubmitting(true);

      // Replace with actual user ID from your auth system
      const userId = 1; // This should come from your login state

      const reportData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        photo_urls: formData.images,
        location: formData.location,
        is_anonymous: formData.isAnonymous,
        status: "Pending",
        user_id: userId
      };

      // ACTUAL API CALL TO YOUR FASTAPI BACKEND
      const response = await fetch('http://10.10.19.221:8087/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit report');
      }

      const newReport = await response.json();
      console.log('Report created:', newReport);

      // Show success notification
      setShowSuccess(true);

      // Start rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigation.goBack();
  };

  const renderDropdownModal = () => {
    if (!dropdownType) return null;

    const options = categories;
    const selectedValue = formData.category;

    return (
      <Modal
        visible={showCategoryDropdown}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownModal}>
              <Text style={styles.dropdownModalTitle}>Select Category</Text>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalOption,
                    selectedValue === option && styles.modalOptionSelected
                  ]}
                  onPress={() => selectCategory(option)}
                >
                  <Text style={selectedValue === option ? styles.modalOptionTextSelected : styles.modalOptionText}>
                    {option}
                  </Text>
                  {selectedValue === option && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const renderSortFilterModal = () => {
    return (
      <Modal
        visible={showSortFilter}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortFilter(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSortFilter(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.sortFilterModal}>

              <View style={styles.sortFilterSection}>
                <TouchableOpacity
                  style={[styles.sortFilterOption, sortOption === 'newest' && styles.sortFilterOptionSelected]}
                  onPress={() => setSortOption('newest')}
                >
                  <Text style={sortOption === 'newest' ? styles.sortFilterOptionTextSelected : styles.sortFilterOptionText}>
                    Newest First
                  </Text>
                  {sortOption === 'newest' && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sortFilterOption, sortOption === 'oldest' && styles.sortFilterOptionSelected]}
                  onPress={() => setSortOption('oldest')}
                >
                  <Text style={sortOption === 'oldest' ? styles.sortFilterOptionTextSelected : styles.sortFilterOptionText}>
                    Oldest First
                  </Text>
                  {sortOption === 'oldest' && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.sortFilterSection}>
                <Text style={styles.sortFilterSubtitle}>Filter By</Text>
                <TouchableOpacity
                  style={[styles.sortFilterOption, filterOption === 'all' && styles.sortFilterOptionSelected]}
                  onPress={() => setFilterOption('all')}
                >
                  <Text style={filterOption === 'all' ? styles.sortFilterOptionTextSelected : styles.sortFilterOptionText}>
                    All Reports
                  </Text>
                  {filterOption === 'all' && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sortFilterOption, filterOption === 'pending' && styles.sortFilterOptionSelected]}
                  onPress={() => setFilterOption('pending')}
                >
                  <Text style={filterOption === 'pending' ? styles.sortFilterOptionTextSelected : styles.sortFilterOptionText}>
                    Pending Only
                  </Text>
                  {filterOption === 'pending' && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sortFilterOption, filterOption === 'completed' && styles.sortFilterOptionSelected]}
                  onPress={() => setFilterOption('completed')}
                >
                  <Text style={filterOption === 'completed' ? styles.sortFilterOptionTextSelected : styles.sortFilterOptionText}>
                    Completed Only
                  </Text>
                  {filterOption === 'completed' && (
                    <FontAwesome name="check" size={16} color="#004a89" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowSortFilter(false)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#ffffff', '#e6f0fa', '#ffffff']}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header with Sort & Filter Button */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create New Report</Text>
            <Text style={styles.headerSubtitle}>Help improve your community by reporting issues</Text>
          </View>


        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Category Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => openDropdown('category')}
            >
              <View style={styles.dropdownContent}>
                <FontAwesome name="folder" size={18} color="#004a89" style={styles.dropdownIcon} />
                <Text style={formData.category ? styles.dropdownText : styles.placeholderText}>
                  {formData.category || 'Select a category'}
                </Text>
              </View>
              <FontAwesome name="chevron-down" size={16} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Report Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="pencil" size={18} color="#004a89" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter a title for your report"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Report Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="align-left" size={18} color="#004a89" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the issue in detail..."
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Upload Images */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Images *</Text>
            <Text style={styles.subLabel}>Add at least one photo of the issue</Text>

            <View style={styles.imageButtons}>
              <TouchableOpacity style={styles.imageButton} onPress={simulateUploadFromGallery}>
                <FontAwesome name="upload" size={20} color="#004a89" />
                <Text style={styles.imageButtonText}>Upload Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageButton} onPress={simulateTakePhoto}>
                <FontAwesome name="camera" size={20} color="#004a89" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Display selected images */}
            {formData.images.length > 0 && (
              <View style={styles.imagesContainer}>
                <Text style={styles.selectedCount}>
                  {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} selected
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {formData.images.map((uri, index) => (
                    <View key={index} style={styles.imagePreviewContainer}>
                      <View style={styles.imagePlaceholder}>
                        <FontAwesome name="photo" size={24} color="#004a89" />
                        <Text style={styles.placeholderText}>Image {index + 1}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <FontAwesome name="times" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="map-marker" size={18} color="#004a89" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter the exact location of the issue"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Anonymous Checkbox */}
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleAnonymous}
            >
              <View style={[styles.checkbox, formData.isAnonymous && styles.checkboxChecked]}>
                {formData.isAnonymous && <FontAwesome name="check" size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>Post as anonymous</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <FontAwesome name="paper-plane" size={18} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Dropdown Modals */}
        {renderDropdownModal()}
        {renderSortFilterModal()}

        {/* Success Notification Modal */}
        <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          onRequestClose={closeSuccess}
        >
          <TouchableWithoutFeedback onPress={closeSuccess}>
            <View style={styles.successOverlay}>
              <View style={styles.successContent}>
                <View style={styles.checkCircle}>
                  <FontAwesome name="check" size={40} color="#fff" />
                </View>

                <Text style={styles.successTitle}>Report Submitted Successfully!</Text>

                <View style={styles.winkingContainer}>
                  <Animated.View style={{ transform: [{ rotate }] }}>
                    <FontAwesome name="smile-o" size={30} color="#fff" />
                  </Animated.View>
                  <Text style={styles.winkingText}>Help is on the way!</Text>
                </View>

                <Text style={styles.tapText}>Tap anywhere to continue</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 0,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  header: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004a89',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  // Sort & Filter Styles
  sortFilterContainer: {
    marginTop: 5,
  },
  sortFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004a89',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  sortFilterButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  sortFilterModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  sortFilterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004a89',
    textAlign: 'center',
  },
  sortFilterSection: {
    marginBottom: 20,
  },
  sortFilterSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sortFilterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortFilterOptionSelected: {
    backgroundColor: '#e6f0fa',
    borderRadius: 8,
  },
  sortFilterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  sortFilterOptionTextSelected: {
    fontSize: 14,
    color: '#004a89',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#004a89',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Rest of the styles remain the same
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
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
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f0fa',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  imageButtonText: {
    color: '#004a89',
    fontWeight: '500',
    fontSize: 14,
  },
  imagesContainer: {
    marginTop: 15,
  },
  selectedCount: {
    fontSize: 14,
    color: '#004a89',
    fontWeight: '500',
    marginBottom: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 10,
    width: 90,
    height: 90,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4d4d',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#004a89',
    borderColor: '#004a89',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },
  submitButton: {
    backgroundColor: '#004a89',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#004a89',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#7fa8d1',
  },
  buttonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxHeight: '60%',
  },
  dropdownModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004a89',
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionSelected: {
    backgroundColor: '##e6f0fa',
    borderRadius: 8,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalOptionTextSelected: {
    fontSize: 16,
    color: '#004a89',
    fontWeight: '600',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: '#004a89',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4cd137',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  winkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  winkingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  tapText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
});