import { Text, View } from '@tarojs/components';
import React from 'react';
import { ShiftType } from '../types/schedule';
import { getShiftColor } from '../utils/scheduleCalculator';

const ShiftLegend: React.FC = () => {
  const shifts: ShiftType[] = ['值', '休', '中', '日', '门'];
  
  return (
    <View className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-4">
      <Text className="text-lg font-bold text-gray-800 mb-3 text-center">班次说明</Text>
      <View className="grid grid-cols-2 gap-3">
        {shifts.map((shift) => (
          <View
            key={shift}
            className={`
              rounded-xl border-2 p-3 text-center transition-all duration-200
              ${getShiftColor(shift)}
              ${shift === '门' ? 'col-span-2' : ''}
            `}
          >
            <Text className="font-bold text-lg mb-1">{shift}</Text>
            <Text className="text-xs">
              {shift === '值' && '值班'}
              {shift === '休' && '休息日'}
              {shift === '中' && '中班'}
              {shift === '日' && '日班'}
              {shift === '门' && '固定门诊：周四上午下午、周六上午'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ShiftLegend;