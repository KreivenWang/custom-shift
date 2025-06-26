import { ShiftType, ClinicSchedule } from '../types/schedule';

// 基准日期：2025年6月23日 (排班规律的第一天：值)
const BASE_DATE = new Date(2025, 5, 23); // 月份从0开始，所以5代表6月

// 6天循环：值 休 休 中 休 日
const SHIFT_CYCLE: ShiftType[] = ['值', '休', '休', '中', '休', '日'];

export function calculateShift(date: Date): { 
  shift: ShiftType; 
  clinicSchedule?: ClinicSchedule; 
  morningDisplay?: string;
  afternoonDisplay?: string;
  isSplitDisplay?: boolean;
} {
  // 先计算正常的6天循环班次
  const timeDiff = date.getTime() - BASE_DATE.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // 计算在6天循环中的位置
  let cyclePosition = daysDiff % 6;
  
  // 处理负数情况（日期在基准日期之前）
  if (cyclePosition < 0) {
    cyclePosition += 6;
  }
  
  const normalShift = SHIFT_CYCLE[cyclePosition];
  
  // 检查是否为周四或周六
  const dayOfWeek = date.getDay(); // 0=周日, 1=周一, ..., 6=周六
  
  if (dayOfWeek === 4) { // 周四：上午下午都有门诊
    if (normalShift === '休') {
      // 周四休息日，只显示门诊
      return {
        shift: '门',
        clinicSchedule: { morning: true, afternoon: true },
        isSplitDisplay: false
      };
    } else {
      // 周四其他班次，显示组合
      return {
        shift: normalShift,
        clinicSchedule: { morning: true, afternoon: true },
        morningDisplay: `门/${normalShift}`,
        isSplitDisplay: false
      };
    }
  } else if (dayOfWeek === 6) { // 周六：只有上午门诊
    if (normalShift === '休') {
      // 周六休息日，上午门诊下午休息，需要分上下午显示
      return {
        shift: '门',
        clinicSchedule: { morning: true, afternoon: false },
        morningDisplay: '门',
        afternoonDisplay: '休',
        isSplitDisplay: true
      };
    } else {
      // 周六其他班次，统一显示组合，不分上下午
      return {
        shift: normalShift,
        clinicSchedule: { morning: true, afternoon: false },
        morningDisplay: `门/${normalShift}`,
        isSplitDisplay: false
      };
    }
  }
  
  return { shift: normalShift };
}

export function getShiftColor(shift: ShiftType): string {
  switch (shift) {
    case '值':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case '休':
      return 'bg-green-100 text-green-700 border-green-200';
    case '日':
      return 'bg-red-100 text-red-700 border-red-200';
    case '中':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case '门':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

// 根据显示文本获取颜色（用于组合显示）
export function getDisplayColor(displayText: string): string {
  if (displayText.includes('值')) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (displayText.includes('日')) return 'bg-red-100 text-red-700 border-red-200';
  if (displayText.includes('中')) return 'bg-orange-100 text-orange-700 border-orange-200';
  if (displayText === '门') return 'bg-purple-100 text-purple-700 border-purple-200';
  if (displayText === '休') return 'bg-green-100 text-green-700 border-green-200';
  if (displayText.includes('门/')) return 'bg-purple-100 text-purple-700 border-purple-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
}