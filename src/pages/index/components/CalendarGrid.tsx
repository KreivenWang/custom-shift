import React from 'react';
import { ScheduleDay } from '../types/schedule';
import { getShiftColor, getDisplayColor } from '../utils/scheduleCalculator';
import { View, Text } from '@tarojs/components'

interface CalendarGridProps {
  days: ScheduleDay[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  
  // 获取月份第一天是星期几
  const firstDayWeekday = days[0]?.date.getDay() || 0;
  
  // 创建空白格子来对齐第一天
  const emptyDays = Array(firstDayWeekday).fill(null);
  
  return (
    <View className="bg-white rounded-2xl shadow-lg p-4 mx-4 mb-6">
      {/* 星期标题 */}
      <View className="grid grid-cols-7 gap-1 mb-3">
        {weekdays.map((day) => (
          <View key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </View>
        ))}
      </View>
      
      {/* 日历格子 */}
      <View className="grid grid-cols-7 gap-1">
        {/* 空白天数 */}
        {emptyDays.map((_, index) => (
          <View key={`empty-${index}`} className="aspect-square"></View>
        ))}
        
        {/* 实际天数 */}
        {days.map((day) => {
          const shiftColorClass = getShiftColor(day.shift);
          const isToday = day.isToday;
          
          return (
            <View
              key={day.date.toISOString()}
              className={`
                aspect-square rounded-xl border-2 flex flex-col transition-all duration-200 hover:scale-105 cursor-pointer
                ${!day.isSplitDisplay ? shiftColorClass : 'bg-white border-gray-200'}
                ${isToday ? 'ring-4 ring-gray-400 ring-opacity-50 shadow-lg' : ''}
              `}
            >
              {/* 日期数字 - 固定高度 */}
              <View className={`text-center py-1 h-8 flex items-center justify-center ${isToday ? 'text-gray-800 font-bold' : 'text-gray-600'}`}>
                <View className="flex flex-col items-center">
                  <span className="text-sm font-bold">{day.date.getDate()}</span>
                  {isToday && <View className="w-1 h-1 bg-gray-600 rounded-full mt-0.5"></View>}
                </View>
              </View>
              
              {/* 班次内容 - 剩余空间 */}
              <View className="flex-1 flex flex-col min-h-8">
                {day.isSplitDisplay ? (
                  /* 分上下午显示 - 只有周六上午门诊下午休息的情况 */
                  <>
                    {/* 上午 */}
                    <View className={`
                      flex-1 flex items-center justify-center text-xs font-medium rounded-t-lg border-b
                      ${getDisplayColor(day.morningDisplay || '')}
                    `}>
                      {day.morningDisplay}
                    </View>
                    {/* 下午 */}
                    <View className={`
                      flex-1 flex items-center justify-center text-xs font-medium rounded-b-lg
                      ${getDisplayColor(day.afternoonDisplay || '')}
                    `}>
                      {day.afternoonDisplay}
                    </View>
                  </>
                ) : (
                  /* 统一显示 - 所有其他情况 */
                  <View className="flex-1 flex items-center justify-center">
                    <View className="text-xs font-medium text-center">
                      {day.morningDisplay || day.shift}
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarGrid;