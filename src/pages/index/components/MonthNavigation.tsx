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
    <View className="flex items-center justify-between bg-white rounded-2xl shadow-lg m-4 p-4">
      <Button
        onClick={onPrevMonth}
        className="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-gray-800 transition-colors duration-200 border-none"
         >
        ◀
      </Button>

      <View className="text-center">
        <Text className="text-xl font-bold text-gray-800">
          {year}年 {getMonthName(month)}
        </Text>
      </View>

      <Button
        onClick={onNextMonth}
        className="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-gray-800 transition-colors duration-200 border-none"
      >
        ▶
      </Button>
    </View>
  );
};

export default MonthNavigation;