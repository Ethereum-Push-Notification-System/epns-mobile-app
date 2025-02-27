import {Asset} from 'expo-asset';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import EPNSActivity from 'src/components/loaders/EPNSActivity';
import ImagePreviewFooter from 'src/components/ui/ImagePreviewFooter';
import {usePushApi} from 'src/contexts/PushApiContext';

import EmptyFeed from './EmptyFeed';
import NotificationItem from './NotificationItem';

export default function SpamFeed() {
  const {userPushSDKInstance} = usePushApi();

  const [initialized, setInitialized] = useState(false);
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const [loadedImages, setLoadedImages] = useState([]);
  const [renderGallery, setRenderGallery] = useState(false);
  const [startFromIndex, setStartFromIndex] = useState(0);

  // SET REFS
  const FlatListFeedsRef = useRef(null);

  useEffect(() => {
    if (userPushSDKInstance) {
      fetchInitializedFeeds();
    }
  }, []);

  // Refresh Feed
  const fetchInitializedFeeds = async () => {
    setInitialized(true);
    setRefreshing(true);
    await performTimeConsumingTask();

    FlatListFeedsRef.current.scrollToOffset({animated: true, offset: 0});
    fetchFeed(true);
  };

  // Perform some task to wait
  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 500),
    );
  };

  const showImagePreview = async fileURL => {
    let validPaths = [];
    let fileIndex = -1;

    // Add Image
    // Download the file if not done already
    await Asset.loadAsync(fileURL);

    // Push to valid path
    validPaths.push({
      uri: Asset.fromModule(fileURL).uri,
      id: fileURL,
    });

    fileIndex = validPaths.length - 1;

    setLoadedImages(validPaths);
    setRenderGallery(true);
    setStartFromIndex(fileIndex);
  };

  const fetchFeed = async rewrite => {
    if ((!endReached || rewrite === true) && userPushSDKInstance) {
      if (!loading) {
        setloading(true);
        const feeds = await userPushSDKInstance.notification.list('SPAM', {
          limit: 10,
          page: page,
        });

        if (feeds && feeds.length > 0) {
          // clear the notifs if present
          if (rewrite) {
            setFeed([...feeds]);
            setEndReached(false);
          } else {
            setFeed(prev => [...prev, ...feeds]);
          }
          setPage(prev => prev + 1);
          setEndReached(true);
        } else if (feeds && feeds.length === 0) {
          setFeed([]);
          setEndReached(true);
        }
        setloading(false);
        setRefreshing(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          ref={FlatListFeedsRef}
          data={feed}
          keyExtractor={(item, index) => `${item.sid}-${index}`}
          initialNumToRender={10}
          style={{flex: 1}}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <NotificationItem
                app={item.app}
                chainName={item.blockchain}
                cta={item.cta}
                icon={item.icon}
                image={item.image}
                url={item.url}
                notificationTitle={
                  item.secret ? item.notification['title'] : item.title
                }
                notificationBody={
                  item.secret ? item.notification['body'] : item.message
                }
              />
            );
          }}
          onEndReached={async () => (!endReached ? fetchFeed(false) : null)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setInitialized(false);
              }}
            />
          }
          ListEmptyComponent={
            !refreshing && (
              <EmptyFeed
                title="No spam notifications"
                subtitle="Notifications for channels you have not subscribed to will show up here."
              />
            )
          }
          ListFooterComponent={() => {
            return loading ? (
              <View style={{paddingBottom: 30, marginTop: 20}}>
                <EPNSActivity style={styles.activity} size="small" />
              </View>
            ) : (
              <View style={styles.footer} />
            );
          }}
        />
        <ImageView
          images={loadedImages}
          imageIndex={startFromIndex}
          visible={renderGallery}
          swipeToCloseEnabled={true}
          onRequestClose={() => {
            setRenderGallery(false);
          }}
          FooterComponent={({imageIndex}) => (
            <ImagePreviewFooter
              imageIndex={imageIndex}
              imagesCount={loadedImages.length}
              fileURI={loadedImages[imageIndex].uri}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  infodisplay: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoIcon: {
    height: 48,
    resizeMode: 'contain',
    margin: 10,
  },
  infoText: {
    marginVertical: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  footer: {
    paddingBottom: 100,
  },
});
