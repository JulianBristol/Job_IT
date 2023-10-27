import React, { useCallback, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
/* Production Mode: Delete the next line */
import dummy from '../../components/home/nearby/test.json';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => { }

    const displayTabContent = () => {
        switch (activeTab){
            case "Qualifications":
                return <Specifics
                title="Qualifications"
                /* Production Mode: On the next line, set "datas" to "data" */
                points={datas[0].job_highlights?.qualifications ?? ['N/A']}
                />
            case "About":
            case "Responsibilities":
            default:
                break;
        }
    }

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })

/* Production Mode: Delete the next line */
    const datas = dummy;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, margin: 'auto' }}>
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite,  },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitle: "",
            headerLeft: () => (
                <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="60%"
                />
            )
        }}
        />
        <>
        <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }
        >
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary}/>
                /* Production Mode: On the next line, set false to "error" */
            ): false ? (
                <Text>Something went wrong...</Text>
                /* Production Mode: On the next line, set "datas" to "data" */
            ) : datas.length === 0 ? (
                <Text>No Data</Text>
            ) : (
                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company 
          /* Production Mode: On the next line, set "datas" to "data" */
                    companyLogo={datas[0].employer_logo}
                    /* Production Mode: On the next line, set "datas" to "data" */
                    jobTitle={datas[0].job_title}
                    /* Production Mode: On the next line, set "datas" to "data" */
                    companyName={datas[0].employer_name}
                    /* Production Mode: On the next line, set "datas" to "data" */
                    location={datas[0].job_country}
                    />
                    <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    />
                    {displayTabContent()}
                </View>
            )}
        </ScrollView>
        </>
    </SafeAreaView>
  )
}

export default JobDetails
