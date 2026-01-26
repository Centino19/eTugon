import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Report2() {
  const [currentStatus, setCurrentStatus] = useState('Completed');

  // Sample data for the report
  const reportData = {
    image: require('@/assets/images/sample2.jpg'),
    title: 'Flooded Road',
    barangay: 'Bacsil',
    category: 'Infrastructure',
    reporter: 'Maria Santos',
    dateReported: 'June 20, 2025',
    description: 'The road near the river regularly floods during heavy rain, making it impassable for vehicles and dangerous for pedestrians. The flooding has been getting worse over the past few months, and several vehicles have been stranded during recent storms. Residents are requesting improved drainage systems in the area.',
    upvotes: 12,
    comments: 5
  };

  // Progress timeline data - All steps completed
  const progressSteps = [
    {
      time: '09:15am',
      date: 'June 20, 2025',
      title: 'Issue reported',
      description: '',
      status: 'completed'
    },
    {
      time: '02:30pm',
      date: 'June 20, 2025',
      title: 'Issue assigned to Public Works team',
      description: 'Engineer Rodriguez - Initial assessment shows need for drainage improvement and road elevation in affected area.',
      status: 'completed'
    },
    {
      time: '10:45am',
      date: 'June 21, 2025',
      title: 'Maintenance in progress',
      description: 'Drainage cleaning and temporary solutions implemented. Planning for permanent solution underway.',
      status: 'completed'
    },
    {
      time: '03:20pm',
      date: 'June 22, 2025',
      title: 'Repair completed',
      description: 'Drainage system improved and road elevation work completed. Area now passable during moderate rainfall.',
      status: 'completed'
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
                      '#e0e0e0'
                  }
                ]} />
                {index < progressSteps.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    {
                      backgroundColor: step.status === 'completed' ?
                        (index === 0 ? '#ff4d4d' : index === 1 ? '#ff9800' : '#4cd137') :
                        '#e0e0e0'
                    }
                  ]} />
                )}
              </View>

              {/* Timeline content */}
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTime}>{step.time}</Text>
                  <Text style={styles.timelineDate}>{step.date}</Text>
                </View>
                <Text style={styles.timelineTitle}>{step.title}</Text>
                {step.description ? (
                  <Text style={styles.timelineDescription}>{step.description}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Completion Confirmation Message */}
        <View style={styles.completionSection}>
          <View style={styles.completionBadge}>
            <FontAwesome name="check-circle" size={24} color="#4cd137" />
            <Text style={styles.completionText}>Issue resolved on June 22, 2025</Text>
          </View>
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
  timelineDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  completionSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f0f9f0',
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4cd137',
    fontWeight: '600',
  },
});