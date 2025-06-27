import React from 'react';
import { View } from '@tarojs/components';

const Header: React.FC = () => {
  return (
    <View className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-4 shadow-lg">
      <View className="max-w-md mx-auto">
        <View className="flex items-center justify-center gap-3 mb-2">
          <View className="w-8 h-8" >⭐</View>
          <View className="text-2xl font-bold">日程时刻</View>
          <View className="w-6 h-6 text-gray-300" >💉</View>
        </View>
        <View className="text-center text-gray-200 text-sm font-medium">
          日夜无殊，准时下班
        </View>
      </View>
    </View>
  );
};

export default Header;