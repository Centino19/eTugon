import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Blank() {
  const router = useRouter();
  const [topTab, setTopTab] = useState<'my' | 'public'>('my');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('date');
  const [sortDirection, setSortDirection] = useState<'newest' | 'oldest'>('newest');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [nameSort, setNameSort] = useState<'a-z' | 'z-a'>('a-z');
  const [upvotesSort, setUpvotesSort] = useState<'most' | 'least'>('most');
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [upvotedReports, setUpvotedReports] = useState<number[]>([]);

  const myReports = [
    { id: 1, image: require('@/assets/images/sample1.jpg'), title: 'Broken Street Light', description: 'Street light near Barangay Hall is broken.', upvotes: 3, comments: 1, date: '2025-05-15', status: 'In Progress' },
    { id: 2, image: require('@/assets/images/sample2.jpg'), title: 'Flooded Road', description: 'Road near the river floods during heavy rain.', upvotes: 5, comments: 2, date: '2025-06-20', status: 'Completed' },
  ];

  const publicReports = [
    { id: 3, image: require('@/assets/images/sample3.jpg'), title: 'Overflowing Garbage', description: 'Garbage bins near market overflow every week.', upvotes: 12, comments: 5, date: '2025-04-10', status: 'Pending' },
    { id: 4, image: require('@/assets/images/sample4.jpg'), title: 'Damaged Pavement', description: 'Pavement cracked near the school entrance.', upvotes: 8, comments: 2, date: '2025-07-05', status: 'In Progress' },
  ];

  const handleCreateReport = () => {
    try {
      router.push('/create_report');
    } catch (error) {
      Alert.alert('Navigation Error', 'Cannot navigate to create report page');
      console.error('Navigation error:', error);
    }
  };

  const sortOptions = [
    { id: 'progress', label: 'Progress', options: ['All', 'Pending', 'In Progress', 'Completed'] },
    { id: 'date', label: 'Date Created', options: ['Newest to Oldest', 'Oldest to Newest'] },
    { id: 'name', label: 'Name', options: ['A to Z', 'Z to A'] },
    { id: 'upvotes', label: 'Upvotes', options: ['Most to Least', 'Least to Most'] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#ff4d4d'; // Red
      case 'In Progress': return '#ff9800'; // Orange
      case 'Completed': return '#4cd137'; // Green
      default: return '#666';
    }
  };

  const toggleFilter = (filterId: string) => {
    if (expandedFilter === filterId) {
      setExpandedFilter(null);
    } else {
      setExpandedFilter(filterId);
    }
  };

  const selectFilterOption = (filterId: string, option: string) => {
    if (filterId === 'progress') {
      setStatusFilter(option === 'All' ? null : option);
    } else if (filterId === 'date') {
      setSortDirection(option === 'Newest to Oldest' ? 'newest' : 'oldest');
    } else if (filterId === 'name') {
      setNameSort(option === 'A to Z' ? 'a-z' : 'z-a');
    } else if (filterId === 'upvotes') {
      setUpvotesSort(option === 'Most to Least' ? 'most' : 'least');
    }
    setExpandedFilter(null);
  };

  const getSelectedOptionLabel = (filterId: string) => {
    if (filterId === 'progress') {
      return statusFilter || 'All';
    } else if (filterId === 'date') {
      return sortDirection === 'newest' ? 'Newest to Oldest' : 'Oldest to Newest';
    } else if (filterId === 'name') {
      return nameSort === 'a-z' ? 'A to Z' : 'Z to A';
    } else if (filterId === 'upvotes') {
      return upvotesSort === 'most' ? 'Most to Least' : 'Least to Most';
    }
    return '';
  };

  const toggleUpvote = (reportId: number, currentUpvotes: number) => {
    if (upvotedReports.includes(reportId)) {
      setUpvotedReports(upvotedReports.filter(id => id !== reportId));
    } else {
      setUpvotedReports([...upvotedReports, reportId]);
    }
  };

  const getUpvoteCount = (reportId: number, baseUpvotes: number) => {
    return upvotedReports.includes(reportId) ? baseUpvotes + 1 : baseUpvotes;
  };

  const navigateToReport = (reportId: number) => {
    switch(reportId) {
      case 1:
        router.push('/report1');
        break;
      case 2:
        router.push('/report2');
        break;
      case 3:
        router.push('/report3');
        break;
      case 4:
        router.push('/report4');
        break;
      default:
        router.push('/report1');
    }
  };

  // Function to filter and sort reports
  const getFilteredAndSortedReports = (reports: any[]) => {
    let filtered = [...reports];

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'date':
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortDirection === 'newest' ? dateB - dateA : dateA - dateB;

        case 'name':
          const nameA = a.title.toLowerCase();
          const nameB = b.title.toLowerCase();
          if (nameSort === 'a-z') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }

        case 'upvotes':
          const upvotesA = getUpvoteCount(a.id, a.upvotes);
          const upvotesB = getUpvoteCount(b.id, b.upvotes);
          return upvotesSort === 'most' ? upvotesB - upvotesA : upvotesA - upvotesB;

        default:
          return 0;
      }
    });

    return filtered;
  };

  const renderCard = (report: any, isMyReports: boolean) => {
    const isUpvoted = upvotedReports.includes(report.id);
    const displayUpvotes = getUpvoteCount(report.id, report.upvotes);

    return (
      <TouchableOpacity
        key={report.id}
        style={styles.card}
        onPress={() => navigateToReport(report.id)}
      >
        <Image source={report.image} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{report.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
                <Text style={styles.statusText}>{report.status}</Text>
              </View>
            </View>

            <Text style={styles.cardDescription}>{report.description}</Text>
            <Text style={styles.cardDate}>Created: {report.date}</Text>
          </View>

          <View style={styles.cardButtons}>
            {!isMyReports && (
              <TouchableOpacity
                style={[styles.iconWithCount, isUpvoted && styles.upvotedIcon]}
                onPress={(e) => {
                  e.stopPropagation();
                  toggleUpvote(report.id, report.upvotes);
                }}
              >
                <FontAwesome
                  name="arrow-up"
                  size={20}
                  color={isUpvoted ? "#004a89" : "#aaa"}
                />
                <Text style={[styles.countText, isUpvoted && styles.upvotedCount]}>
                  {displayUpvotes}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.iconWithCount}>
              <FontAwesome name="comment" size={20} color="#004a89" />
              <Text style={styles.countText}>{report.comments}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const applyFilters = () => {
    // Determine which sort criteria to use based on the selected options
    if (statusFilter || statusFilter === null) {
      setSelectedSort('progress');
    }
    if (sortDirection) {
      setSelectedSort('date');
    }
    if (nameSort) {
      setSelectedSort('name');
    }
    if (upvotesSort) {
      setSelectedSort('upvotes');
    }

    setSortModalVisible(false);
  };

  // Get the current reports to display
  const currentReports = topTab === 'my' ? myReports : publicReports;
  const filteredReports = getFilteredAndSortedReports(currentReports);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#e6f0fa', '#ffffff']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Combined Oval Tabs */}
        <View style={styles.ovalTabsContainer}>
          <View style={styles.ovalTabs}>
            <TouchableOpacity
              style={[styles.ovalTab, topTab === 'my' && styles.activeOvalTab]}
              onPress={() => setTopTab('my')}
            >
              <Text style={[styles.ovalTabText, topTab === 'my' && styles.activeOvalTabText]}>My Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ovalTab, topTab === 'public' && styles.activeOvalTab]}
              onPress={() => setTopTab('public')}
            >
              <Text style={[styles.ovalTabText, topTab === 'public' && styles.activeOvalTabText]}>Public Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Floating Sort & Filter Icon - No Circle */}
        <View style={styles.fixedSortContainer}>
          <TouchableOpacity
            style={styles.floatingSortButton}
            onPress={() => setSortModalVisible(true)}
          >
            <FontAwesome name="sliders" size={20} color="#004a89" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {filteredReports.length > 0
            ? filteredReports.map(report => renderCard(report, topTab === 'my'))
            : <View style={styles.emptyState}>
                <FontAwesome name={topTab === 'my' ? "file-text" : "users"} size={50} color="#ccc" />
                <Text style={styles.emptyText}>
                  {topTab === 'my'
                    ? "You haven't created any reports yet."
                    : "No public reports match your filters."}
                </Text>
                {topTab === 'my' && (
                  <TouchableOpacity style={styles.createFirstButton} onPress={handleCreateReport}>
                    <Text style={styles.createFirstButtonText}>Create Your First Report</Text>
                  </TouchableOpacity>
                )}
              </View>
          }
        </ScrollView>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleCreateReport}
          activeOpacity={0.8}
        >
          <FontAwesome name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Enhanced Sort Modal with Dropdown Style */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={sortModalVisible}
          onRequestClose={() => setSortModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sort & Filter</Text>
                <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                  <FontAwesome name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                {sortOptions.map(option => (
                  <View key={option.id} style={styles.filterGroup}>
                    <Text style={styles.filterLabel}>{option.label}</Text>

                    <TouchableOpacity
                      style={styles.filterDropdown}
                      onPress={() => toggleFilter(option.id)}
                    >
                      <Text style={styles.filterSelectedText}>
                        {getSelectedOptionLabel(option.id)}
                      </Text>
                      <FontAwesome
                        name={expandedFilter === option.id ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#666"
                      />
                    </TouchableOpacity>

                    {expandedFilter === option.id && (
                      <View style={styles.dropdownOptions}>
                        {option.options.map((opt, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={styles.dropdownOption}
                            onPress={() => selectFilterOption(option.id, opt)}
                          >
                            <Text style={styles.dropdownOptionText}>{opt}</Text>
                            {(option.id === 'progress' && (opt === 'All' ? !statusFilter : statusFilter === opt)) ||
                             (option.id === 'date' && (
                               (opt === 'Newest to Oldest' && sortDirection === 'newest') ||
                               (opt === 'Oldest to Newest' && sortDirection === 'oldest')
                             )) ||
                             (option.id === 'name' && (
                               (opt === 'A to Z' && nameSort === 'a-z') ||
                               (opt === 'Z to A' && nameSort === 'z-a')
                             )) ||
                             (option.id === 'upvotes' && (
                               (opt === 'Most to Least' && upvotesSort === 'most') ||
                               (opt === 'Least to Most' && upvotesSort === 'least')
                             )) ? (
                              <FontAwesome name="check" size={16} color="#004a89" />
                            ) : null}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.bottomTabButton}
          onPress={() => router.push('/blank')}
        >
          <FontAwesome name="list" size={24} color="#004a89" />
          <Text style={[styles.bottomTabText, { color: '#004a89' }]}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTabButton}
          onPress={() => router.push('/new_blank')}
        >
          <FontAwesome name="user" size={24} color="gray" />
          <Text style={styles.bottomTabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  ovalTabsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ovalTabs: {
    flexDirection: 'row',
    backgroundColor: '#e6f0fa',
    borderRadius: 30,
    padding: 10,
     marginTop: 30, // Move it down by 50 pixels
  },
  ovalTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOvalTab: {
    backgroundColor: '#004a89',
    shadowColor: '#004a89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  ovalTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeOvalTabText: {
    color: '#fff',
  },
  // Fixed Sort Container - Outside ScrollView
  fixedSortContainer: {
    position: 'absolute',
    top: 125,
    right: 20,
    zIndex: 10,
  },
  // Sort Button - No Circle Background
  floatingSortButton: {
    padding: 10,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 80
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  createFirstButton: {
    backgroundColor: '#004a89',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createFirstButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },
  bottomTabButton: {
    alignItems: 'center'
  },
  bottomTabText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4
  },
  floatingButton: {
    position: 'absolute',
    bottom: 35,
    left: width / 2 - 30,
    backgroundColor: '#004a89',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 1000
  },
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  cardContent: {
    padding: 15,
  },
  textContainer: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e6f0fa'
  },
  upvotedIcon: {
    backgroundColor: '#cce4ff',
    borderWidth: 1,
    borderColor: '#004a89',
  },
  countText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#004a89',
    fontWeight: '600'
  },
  upvotedCount: {
    color: '#004a89',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004a89',
  },
  modalScroll: {
    maxHeight: '70%',
  },
  filterGroup: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  filterSelectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOptions: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#004a89',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});