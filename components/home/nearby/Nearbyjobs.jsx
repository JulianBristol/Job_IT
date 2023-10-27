import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';
/* Production Mode: Delete the next line */
import dummy from './test.json';

const Nearbyjobs = () => {

  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  /* Production Mode: Delete the next line */
   const datas = dummy;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
          /* Production Mode: On the next line, set false to "error" */
        ) : false ? (
          <Text>Something went wrong...</Text>
        ) :(
          /* Production Mode: On the next line, set datas to "data" */
          datas?.map((job) => (
            <NearbyJobCard
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs