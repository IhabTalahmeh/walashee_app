// src/context/PeriodFilterContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ECaseFilter } from 'src/enum/ECaseFilter';
import { PeriodFilterItem } from 'src/types/types/Types';



type PeriodFilterContextType = {
  visible: boolean;
  selected: PeriodFilterItem;
  show: () => void;
  hide: () => void;
  select: (item: PeriodFilterItem) => void;
  data: PeriodFilterItem[];
};

const PeriodFilterContext = createContext<PeriodFilterContextType | undefined>(undefined);

export const PeriodFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = [
    { id: '1', title: 'Today', route: ECaseFilter.TODAY },
    { id: '2', title: 'This Week', route: ECaseFilter.THIS_WEEK },
    { id: '3', title: 'This Month', route: ECaseFilter.THIS_MONTH },
  ];

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<PeriodFilterItem>(data[0]);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const select = useCallback((item: PeriodFilterItem) => {
    setSelected(item);
    hide();
  }, [hide]);

  return (
    <PeriodFilterContext.Provider value={{ visible, selected, show, hide, select, data }}>
      {children}
    </PeriodFilterContext.Provider>
  );
};

export const usePeriodFilter = () => {
  const context = useContext(PeriodFilterContext);
  if (!context) throw new Error('usePeriodFilter must be used within a PeriodFilterProvider');
  return context;
};
