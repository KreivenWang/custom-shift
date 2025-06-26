import React from 'react';
import { getMonthName } from '../utils/calendarUtils';
import { View, Text } from '@tarojs/components';

interface MonthNavigationProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <View className="flex items-center justify-between bg-white rounded-2xl shadow-lg mx-4 mb-6 p-4">
      <button
        onClick={onPrevMonth}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 active:scale-95"
      >
        <View className="w-6 h-6 text-gray-600" />
      </button>

      <View className="text-center">
        <Text className="text-xl font-bold text-gray-800">
          {year}年 {getMonthName(month)}
        </Text>
      </View>

      <button
        onClick={onNextMonth}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 active:scale-95"
      >
        <View className="w-6 h-6 text-gray-600" />
      </button>
    </View>
  );
};

export default MonthNavigation;