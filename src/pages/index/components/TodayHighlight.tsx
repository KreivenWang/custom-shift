import React from 'react';
// import { Calendar } from 'lucide-react';
import { ScheduleDay } from '../types/schedule';
import { getShiftColor } from '../utils/scheduleCalculator';
import { getWeekdayName } from '../utils/calendarUtils';
import { View } from '@tarojs/components';

interface TodayHighlightProps {
  todayData: ScheduleDay | null;
}

const TodayHighlight: React.FC<TodayHighlightProps> = ({ todayData }) => {
  if (!todayData) return null;
  
  const today = todayData.date;
  const shiftColorClass = getShiftColor(todayData.shift);
  const morningShiftColorClass = getShiftColor(todayData.morningDisplay);
  const afternoonShiftColorClass = getShiftColor(todayData.afternoonDisplay);
  
  return (
    <View className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg mx-4 mb-6 p-6 text-white">
      <View className="flex items-center gap-3 mb-4">
        {/* <Calendar className="w-6 h-6" /> */}
        <h3 className="text-lg font-bold">今日班次</h3>
      </View>
      
      <View className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
        <View className="text-center">
          <View className="text-3xl font-bold mb-2">
            {today.getMonth() + 1}月{today.getDate()}日
          </View>
          <View className="text-gray-200 mb-3">
            星期{getWeekdayName(today)}
          </View>
          
          {todayData.isSplitDisplay ? (
            /* 分上下午显示 - 只有周六上午门诊下午休息的情况 */
            <View className="space-y-2">
              <View className={`
                inline-block px-3 py-1 rounded-lg font-bold text-sm
                bg-white bg-opacity-90 ${morningShiftColorClass.split(' ')[1]}
              `}>
                上午: {todayData.morningDisplay}
              </View>
              <View className={`
                inline-block px-3 py-1 rounded-lg font-bold text-sm ml-2
                bg-white bg-opacity-90 ${afternoonShiftColorClass.split(' ')[1]}
              `}>
                下午: {todayData.afternoonDisplay}
              </View>
            </View>
          ) : (
            /* 统一显示 - 所有其他情况 */
            <View className={`
              inline-block px-4 py-2 rounded-lg font-bold text-lg
              bg-white bg-opacity-90 ${shiftColorClass.split(' ')[1]}
            `}>
              {todayData.morningDisplay || todayData.shift}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TodayHighlight;