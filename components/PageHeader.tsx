import React from 'react';
import { GestureResponderEvent, Pressable, Text, View, ViewProps } from 'react-native';
//import { headerTextStyle } from './textStyles';

type PageHeaderProps = {
  leftNode?: JSX.Element;
  rightNode?: JSX.Element;
  headerText?: string;
  handleOnPressLeftNode?: (event: GestureResponderEvent) => void;
  handleOnPressRightNode?: (event: GestureResponderEvent) => void;
  rightContainerStyle?: ViewProps['style'] | null;
  leftContainerStyle?: ViewProps['style'] | null;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  leftNode = null,
  rightNode = null,
  headerText = '',
  handleOnPressLeftNode = null,
  rightContainerStyle = null,
  leftContainerStyle = null,
}) => {
  return (
    <View className="flex flex-row items-center justify-between border-b border-gray-200">
      <Pressable onPress={handleOnPressLeftNode} style={leftContainerStyle} className="flex-1 pl-4 py-4">
        {leftNode}
      </Pressable>
    <View className="flex-1 py-4">
      <Text style={[headerTextStyle.FS17_SEMIBOLD]} className="text-center">{headerText}</Text>
    </View>
    <Pressable onPress={handleOnPressRightNode} style={rightContainerStyle} className="flex-1 pr-4 items-end py-4"> {rightNode}
    </Pressable>
    </View>
  );
};

export default PageHeader;
