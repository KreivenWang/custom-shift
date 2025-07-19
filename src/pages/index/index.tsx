import { View, Text } from '@tarojs/components'
import { useLoad, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MonthNavigation from './components/MonthNavigation';
import CalendarGrid from './components/CalendarGrid';
import TodayHighlight from './components/TodayHighlight';
import ShiftLegend from './components/ShiftLegend';
import { generateCalendarMonth } from './utils/calendarUtils';
import { CalendarMonth, ScheduleDay } from './types/schedule';
import './index.css'


export default function Index() {
  useLoad(() => {
    console.log('Index Page loaded.')
  })

  useShareAppMessage(() => {
    console.log('Index Page onShareAppMessage.')
    return {
      title: '高桥取暖器作息表',
      path: '/pages/index/index',
    }
  })

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarMonth | null>(null);
  const [todayData, setTodayData] = useState<ScheduleDay | null>(null);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthData = generateCalendarMonth(year, month);
    setCalendarData(monthData);

    // 查找今日数据
    const today = new Date();
    // today.setDate(today.getDate() -3) // for today debug
    today.setHours(0, 0, 0, 0);
    const todayInfo = monthData.days.find(day =>
      day.date.getTime() === today.getTime()
    );
    setTodayData(todayInfo || null);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  if (!calendarData) {
    return (
      <View className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <View className="text-gray-600 text-lg font-medium">加载中...</View>
      </View>
    );
  }

  return (
    // <Header />

    <View className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <MonthNavigation
        year={calendarData.year}
        month={calendarData.month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarGrid days={calendarData.days} />

      <TodayHighlight todayData={todayData} />

      <ShiftLegend />
    </View>
    // <View>Hello</View>
  );
}
