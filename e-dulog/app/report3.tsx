import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Report3() {
  const [currentStatus, setCurrentStatus] = useState('Pending');

  // Sample data for the report
  const reportData = {
    image: require('@/assets/images/sample3.jpg'),
    title: 'Overflowing Garbage',
    barangay: 'Bacsil',
    category: 'Sanitation',
    reporter: 'Carlos Reyes',
    dateReported: 'April 10, 2025',
    description: 'Garbage bins near the public market overflow every week, creating unsanitary conditions and attracting pests. The smell is affecting nearby businesses and residents. The garbage collection schedule seems insufficient for the volume of waste generated in this area.',
    upvotes: 15,
    comments: 7
  };

  // Progress timeline data - Only first step completed, others pending
  const progressSteps = [
    {
      time: '08:30am',
      date: 'April 10, 2025',
      title: 'Issue reported',
      description: '',
      status: 'completed'
    },
    {
      time: '--:--',
      date: 'Pending',
      title: 'Awaiting assignment',
      description: 'Report is in queue for review and assignment to appropriate team.',
      status: 'pending'
    },
    {
      time: '--:--',
      date: 'Pending',
      title: 'Maintenance pending',
      description: 'Action will be scheduled once assigned to maintenance team.',
      status: 'pending'
    },
    {
      time: '--:--',
      date: 'Pending',
      title: 'Resolution pending',
      description: 'Issue will be resolved after maintenance work is completed.',
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

  const handleEscalate = () => {
    // Function to escalate the pending issue
    Alert.alert('Issue Escalated', 'This report has been flagged for priority attention.');
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
                    backgroundColor: step.status === 'completed' ? '#ff4d4d' : '#e0e0e0'
                  }
                ]} />
                {index < progressSteps.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    {
                      backgroundColor: step.status === 'completed' ? '#ff4d4d' : '#e0e0e0'
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
                  step.status === 'pending' && styles.pendingText
                ]}>{step.title}</Text>
                {step.description ? (
                  <Text style={styles.timelineDescription}>{step.description}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Pending Notice */}
        <View style={styles.pendingSection}>
          <View style={styles.pendingNotice}>
            <FontAwesome name="clock-o" size={24} color="#ff4d4d" />
            <Text style={styles.pendingNoticeText}>This report is awaiting review and assignment</Text>
          </View>
          <TouchableOpacity style={styles.escalateButton} onPress={handleEscalate}>
            <Text style={styles.escalateButtonText}>Escalate Issue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  pendingText: {
    color: '#999',
    fontStyle: 'italic',
  },
  timelineDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  pendingSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff4f4',
  },
  pendingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pendingNoticeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#ff4d4d',
    fontWeight: '500',
  },
  escalateButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  escalateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});