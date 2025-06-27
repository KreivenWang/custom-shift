import React from 'react';
import { getMonthName } from '../utils/calendarUtils';
import { View, Text, Button } from '@tarojs/components';

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
    <View className="flex items-center justify-between rounded-2xl m-4 py-4">
      <View
        onClick={onPrevMonth}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
      >
        <Text className='text-2xl'>&lt;</Text>
      </View>

      <View className="text-center">
        <Text className="text-2xl font-bold text-gray-800">
          {year}年 {getMonthName(month)}
        </Text>
      </View>

      <View
        onClick={onNextMonth}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
      >
        <Text className='text-2xl'>&gt;</Text>
      </View>
    </View>
  );
};

export default MonthNavigation;