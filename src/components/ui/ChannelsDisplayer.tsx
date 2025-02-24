import '@ethersproject/shims';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import StylishLabel from 'src/components/labels/StylishLabel';
import EPNSActivity from 'src/components/loaders/EPNSActivity';
import ChannelItem from 'src/components/ui/ChannelItem';
import {usePushApi} from 'src/contexts/PushApiContext';
import {useSheets} from 'src/contexts/SheetContext';
import ENV_CONFIG from 'src/env.config';
import {ChainHelper} from 'src/helpers/ChainHelper';
import useChannels from 'src/hooks/channel/useChannels';
import useSubscriptions from 'src/hooks/channel/useSubscriptions';
import {
  Channel,
  selectChannels,
  selectIsLoadingSubscriptions,
} from 'src/redux/channelSlice';

import GLOBALS from '../../Globals';
import Globals from '../../Globals';
import {Dropdown, DropdownOption} from '../dropdown';
import {ChannelCategories} from './ChannelCategories';

const ChannelsDisplayer = () => {
  // Get allowed chains
  const chainList = ChainHelper.getSelectChains(ENV_CONFIG.ALLOWED_NETWORKS);

  // State
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Globals.CONSTANTS.ALL_CATEGORIES,
  );
  const [selectedChain, setSelectedChain] = useState<string>('');

  // Redux
  const channelResults = useSelector(selectChannels);
  const isLoadingSubscriptions = useSelector(selectIsLoadingSubscriptions);

  // Hooks
  const {isLoading, isLoadingMore, resetChannelData, loadMore} = useChannels({
    tag: selectedCategory,
    searchQuery: search,
    filter: selectedChain,
  });
  const {refreshSubscriptions} = useSubscriptions();
  const {userPushSDKInstance} = usePushApi();
  const {openSheet} = useSheets();

  useEffect(() => {
    if (userPushSDKInstance) {
      refreshSubscriptions();
    }
  }, [userPushSDKInstance]);

  const selectChannelForSettings = (channel: Channel) => {
    openSheet({name: 'NFSettingsSheet', channel});
  };

  const handleChannelSearch = async (searchQuery: string) => {
    setSearch(searchQuery);
    resetChannelData();
    setSelectedCategory(Globals.CONSTANTS.ALL_CATEGORIES);
  };

  const handleCategoryChange = (category: string) => {
    if (search.length) {
      setSearch('');
    }
    resetChannelData();
    setSelectedCategory(category as string);
    setSelectedChain('');
  };

  const handleChainChange = (option: DropdownOption) => {
    resetChannelData();
    setSelectedCategory(Globals.CONSTANTS.ALL_CATEGORIES);
    setSelectedChain(chainList[0].value !== option.value ? option.value : '');
  };

  return (
    <View style={styles.container}>
      {/* Render Search Bar */}
      <View style={styles.searchBarWrapper}>
        {/* Render Search Bar */}
        <View style={styles.searchView}>
          <Image
            source={require('assets/ui/search.png')}
            style={styles.imageLogoStyle}
          />
          <TextInput
            style={styles.searchBar}
            onChangeText={e => {
              handleChannelSearch(e);
            }}
            value={search}
            placeholder={'Search for channel name...'}
            placeholderTextColor="#7D7F89"
          />
        </View>

        {/* Render Dropdown Field */}
        <Dropdown
          onChange={handleChainChange}
          style={styles.dropdownField}
          data={chainList}
          value={selectedChain}
        />
      </View>

      {/* Render Channel Categories(tags) */}
      <ChannelCategories
        disabled={isLoading}
        onChangeCategory={handleCategoryChange}
        value={selectedCategory}
      />

      {/* Render No Data View */}
      {channelResults?.length === 0 && (
        <View style={[styles.infodisplay]}>
          {!isLoading && !isLoadingSubscriptions ? (
            // Show channel not found label
            <StylishLabel
              style={styles.infoText}
              fontSize={16}
              title={
                search.length
                  ? '[dg:No channels match your query, please search for another name/address]'
                  : '[dg:No results available.]'
              }
            />
          ) : (
            // Show channel fetching label
            <>
              <EPNSActivity style={{}} size="small" />
              <StylishLabel
                style={styles.infoText}
                fontSize={16}
                title="[dg:Fetching Channels!]"
              />
            </>
          )}
        </View>
      )}

      {/* Render Channel List */}
      {channelResults?.length !== 0 && !isLoadingSubscriptions && (
        <FlatList
          data={channelResults}
          style={styles.channels}
          contentContainerStyle={styles.channelListContentContainerStyle}
          keyExtractor={(item, index) => `${item.name}-${index}-channel-key`}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          renderItem={({item: channel}) => (
            <ChannelItem
              {...{
                channel,
                selectChannelForSettings,
              }}
            />
          )}
          ListFooterComponent={() => {
            return isLoading || isLoadingMore ? (
              <View style={styles.footerLoadingView}>
                <EPNSActivity style={{}} size="small" />
              </View>
            ) : null;
          }}
        />
      )}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBALS.COLORS.WHITE,
  },
  channels: {
    flex: 1,
    width: '100%',
  },
  channelListContentContainerStyle: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 100 : 140, // Add some padding to the bottom to display last item content
    paddingHorizontal: 16,
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
  searchBarWrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: GLOBALS.COLORS.BG_SEARCH_BAR,
    height: 48,
    paddingHorizontal: 12,
    width: '73%',
  },
  searchBar: {
    fontSize: 14,
    color: GLOBALS.COLORS.DARKER_GRAY,
    flex: 1,
  },
  imageLogoStyle: {
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  seperator: {
    borderBottomWidth: 1,
    borderColor: GLOBALS.COLORS.BORDER_SEPARATOR,
    marginVertical: 24,
  },
  footerLoadingView: {paddingVertical: 10},
  dropdownField: {
    width: '23%',
  },
});

export default ChannelsDisplayer;
