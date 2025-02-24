import React, {FC, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useChannelCategories} from 'src/hooks/channel/useChannelCategories';

import {Pill} from '../pill';

type ChannelCategoriesProps = {
  onChangeCategory: (category: string) => void;
  value: string;
  disabled: boolean;
};

const ChannelCategories: FC<ChannelCategoriesProps> = ({
  onChangeCategory,
  value,
  disabled,
}) => {
  // Ref
  const scrollViewRef = useRef<ScrollView>(null);

  // Hooks
  const {isLoading, channelCategories} = useChannelCategories();

  // Scroll to start
  useEffect(() => {
    if (!isLoading && channelCategories?.length > 0) {
      const shouldScrollToStart = channelCategories[0].value === value;
      if (shouldScrollToStart && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          animated: true,
        });
      }
    }
  }, [value]);

  if (!isLoading && channelCategories?.length > 0) {
    return (
      <View style={styles.mainView}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewStyle}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {channelCategories.map((item, index) => (
            <Pill
              disabled={disabled || item.value === value}
              key={`${index}_pill_keys`}
              value={value}
              data={item}
              onChange={category => {
                onChangeCategory(category.value as string);
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
  return null;
};

export {ChannelCategories};

const styles = StyleSheet.create({
  mainView: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 16,
  },
  scrollViewStyle: {
    paddingHorizontal: 16,
  },
});
