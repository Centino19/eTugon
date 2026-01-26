import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Report4() {
  const [currentStatus, setCurrentStatus] = useState('In Progress');

  // Sample data for the report
  const reportData = {
    image: require('@/assets/images/sample4.jpg'),
    title: 'Damaged Pavement',
    barangay: 'Bacsil',
    category: 'Infrastructure',
    reporter: 'Liza Ramos',
    dateReported: 'July 5, 2025',
    description: 'The pavement near the school entrance has significant cracks and uneven surfaces, creating a tripping hazard for students and pedestrians. The damage appears to be worsening with recent heavy rains. Several students have reported minor injuries from tripping on the uneven pavement.',
    upvotes: 9,
    comments: 4
  };

  // Progress timeline data - First two steps completed, third in progress
  const progressSteps = [
    {
      time: '10:20am',
      date: 'July 5, 2025',
      title: 'Issue reported',
      description: '',
      status: 'completed'
    },
    {
      time: '02:45pm',
      date: 'July 5, 2025',
      title: 'Issue assigned to Repair team',
      description: 'Engineer Santos - Assessment shows need for pavement repair and leveling.',
      status: 'completed'
    },
    {
      time: '09:30am',
      date: 'July 6, 2025',
      title: 'Repair in progress',
      description: 'Team dispatched to site. Materials delivered. Work underway to fix damaged pavement.',
      status: 'current'
    },
    {
      time: '--:--',
      date: 'Pending',
      title: 'Repair completion',
      description: 'Work will be completed after current repairs are finished.',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#ff4d4d'; // Red
      case 'In Progress': return '#ff9800'; // Orange
      case 'Completed': return '#4cd137'; // Green
      default: return '#666';
    }
  };

  const handleComplete = () => {
    setCurrentStatus('Completed');
    // Update the progress steps to reflect completion
    progressSteps[3].status = 'completed';
    progressSteps[2].status = 'completed';
    Alert.alert('Repair Completed', 'The pavement repair has been marked as completed.');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Problem Image */}
        <Image source={reportData.image} style={styles.problemImage} />

        {/* Title and Status Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{reportData.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentStatus) }]}>
            <Text style={styles.statusText}>{currentStatus}</Text>
          </View>
        </View>

        {/* Location and Category */}
        <View style={styles.metaSection}>
          <Text style={styles.metaText}>
            {reportData.barangay} • {reportData.category}
          </Text>
        </View>

        {/* Reporter and Date */}
        <View style={styles.reporterSection}>
          <Text style={styles.reporterText}>
            {reportData.reporter} • {reportData.dateReported}
          </Text>
        </View>

        {/* Spacing */}
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        {/* Report Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionLabel}>Report Description</Text>
          <Text style={styles.descriptionText}>{reportData.description}</Text>
        </View>

        {/* Engagement Metrics */}
        <View style={styles.engagementSection}>
          <View style={styles.engagementItem}>
            <FontAwesome name="arrow-up" size={20} color="#004a89" />
            <Text style={styles.engagementText}>{reportData.upvotes} Upvotes</Text>
          </View>
          <View style={styles.engagementItem}>
            <FontAwesome name="comment" size={20} color="#004a89" />
            <Text style={styles.engagementText}>{reportData.comments} Comments</Text>
          </View>
        </View>

        {/* Progress Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionLabel}>Progress Timeline</Text>

          {progressSteps.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Timeline connector */}
              <View style={styles.timelineConnector}>
                <View style={[
                  styles.timelineDot,
                  {
                    backgroundColor: step.status === 'completed' ?
                      (index === 0 ? '#ff4d4d' : index === 1 ? '#ff9800' : '#4cd137') :
                      step.status === 'current' ? '#ff9800' : '#e0e0e0'
                  }
                ]} />
                {index < progressSteps.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    {
                      backgroundColor: step.status === 'completed' ?
                        (index === 0 ? '#ff4d4d' : index === 1 ? '#ff9800' : '#4cd137') :
                        step.status === 'current' ? '#ff9800' : '#e0e0e0'
                    }
                  ]} />
                )}
              </View>

              {/* Timeline content */}
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={[
                    styles.timelineTime,
                    step.status === 'pending' && styles.pendingText
                  ]}>{step.time}</Text>
                  <Text style={[
                    styles.timelineDate,
                    step.status === 'pending' && styles.pendingText
                  ]}>{step.date}</Text>
                </View>
                <Text style={[
                  styles.timelineTitle,
                  step.status === 'current' && styles.currentStepText,
                  step.status === 'pending' && styles.pendingText
                ]}>{step.title}</Text>
                {step.description ? (
                  <Text style={styles.timelineDescription}>{step.description}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* In Progress Notice */}
        <View style={styles.inProgressSection}>
          <View style={styles.inProgressNotice}>
            <FontAwesome name="gears" size={24} color="#ff9800" />
            <Text style={styles.inProgressNoticeText}>Repair work is currently in progress</Text>
          </View>
        </View>
      </ScrollView>

      {/* Complete Button - Only show if status is still "In Progress" */}
      {currentStatus === 'In Progress' && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  problemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  reporterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reporterText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  spacing: {
    height: 16,
  },
  descriptionSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004a89',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  engagementSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#004a89',
    fontWeight: '500',
  },
  timelineSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineConnector: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  timelineLine: {
    width: 3,
    flex: 1,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timelineDate: {
    fontSize: 12,
    color: '#666',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  currentStepText: {
    color: '#ff9800',
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#999',
    fontStyle: 'italic',
  },
  timelineDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  inProgressSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff9eb',
  },
  inProgressNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressNoticeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#ff9800',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#004a89',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});