export type ShiftType = '值' | '休' | '日' | '中' | '门';

export interface ClinicSchedule {
  morning: boolean;
  afternoon: boolean;
}

export interface ScheduleDay {
  date: Date;
  shift: ShiftType;
  isToday: boolean;
  clinicSchedule?: ClinicSchedule; // 门诊时间安排
  morningDisplay?: string; // 上午显示文本
  afternoonDisplay?: string; // 下午显示文本
  isSplitDisplay?: boolean; // 是否需要分上下午显示
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: ScheduleDay[];
}