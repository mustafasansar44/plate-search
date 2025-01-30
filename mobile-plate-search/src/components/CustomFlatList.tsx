import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatListProps, ListRenderItemInfo, FlatList } from 'react-native';

const CustomFlatList = <ItemT,>({
  renderItem: originalRenderItem,
  itemsToFadeIn = 10,
  initialDelay = 1000,
  durationPerItem = 500,
  parallelItems = 1,
  ItemSeparatorComponent,
  data,
  ...props
}: FlatListProps<ItemT> & {
  itemsToFadeIn?: number;
  initialDelay?: number;
  durationPerItem?: number;
  parallelItems?: number;
}): React.ReactElement => {
  const animationValues = useRef<Animated.Value[]>([]);
  const [animatedData, setAnimatedData] = useState<ItemT[]>([]);

  // Update animation values and ensure the list matches
  useEffect(() => {
    if (data) {
      const newValues = data.map((_, index) => animationValues.current[index] || new Animated.Value(0));
      animationValues.current = newValues;
      setAnimatedData(data);
    }
  }, [data]);

  const fadeInAnimation = useCallback((index: number) => {
    Animated.timing(animationValues.current[index], {
      toValue: 1,
      useNativeDriver: true,
      duration: durationPerItem,
      delay: index * durationPerItem,
      easing: Easing.linear,
    }).start();
  }, [durationPerItem]);

  useEffect(() => {
    animatedData.forEach((_, index) => {
      if (animationValues.current[index]._value === 0) {
        fadeInAnimation(index);
      }
    });
  }, [animatedData, fadeInAnimation]);

  const FadeInComponent: FC<{ index: number }> = useCallback(
    ({ index, children }): React.ReactElement => (
      <Animated.View
        style={{
          opacity: animationValues.current[index] || new Animated.Value(0),
        }}>
        {children}
      </Animated.View>
    ),
    [],
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ItemT>) => (
      <FadeInComponent index={info.index}>{originalRenderItem!(info)}</FadeInComponent>
    ),
    [originalRenderItem],
  );

  return (
    <FlatList
      {...props}
      data={animatedData}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

export default CustomFlatList;