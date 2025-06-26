import { ScheduleDay, CalendarMonth } from '../types/schedule';
import { calculateShift } from './scheduleCalculator';

export function generateCalendarMonth(year: number, month: number): CalendarMonth {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  const days: ScheduleDay[] = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const { shift, clinicSchedule, morningDisplay, afternoonDisplay, isSplitDisplay } = calculateShift(date);
    const isToday = date.getTime() === today.getTime();
    
    days.push({
      date,
      shift,
      isToday,
      clinicSchedule,
      morningDisplay,
      afternoonDisplay,
      isSplitDisplay
    });
  }
  
  return {
    year,
    month,
    days
  };
}

export function getMonthName(month: number): string {
  const months = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];
  return months[month];
}

export function getWeekdayName(date: Date): string {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return weekdays[date.getDay()];
}