import React, { createContext, useContext, useMemo, useState, } from 'react';
import { EPermission } from 'src/enum/EPermission';
import { ESharedCaseFilter } from 'src/enum/ESharedCaseFilter';
import { useGetCases } from 'src/hooks/useCases';
import { useAuth } from './AuthContext';
import { useGetDoctors } from 'src/hooks/useUsers';
import { EUsersFilter } from 'src/enum/EUsersFilter';

interface ISharedDashboardContext {
  doctorId: number | null;
  permission: EPermission;
  isEditor: boolean;
  doctorName: string;
}

const SharedDashboardContext = createContext<ISharedDashboardContext>({
  doctorId: null,
  permission: EPermission.VIEWER,
  isEditor: false,
  doctorName: '',
});

interface SharedDashboardProviderProps {
  doctorId: number;
  children: React.ReactNode;
}

export const useSharedDashboard = () => useContext(SharedDashboardContext);

export const SharedDashboardProvider: React.FC<SharedDashboardProviderProps> = ({ children, doctorId }) => {
  const { user } = useAuth();
  const [permission, setPermission] = useState<EPermission>(EPermission.VIEWER);
  const { data } = useGetCases({
    userId: doctorId,
    page: 0,
    pageLimit: 0,
    filter: ESharedCaseFilter.ALL
  }, {
    onSuccess: (data: any) => {
      if (data?.data?.permission) {
        setPermission(data.data.permission);
      }
    }
  })

  const { data: dashboard } = useGetDoctors({
    userId: user.id,
    filter: EUsersFilter.MY_TEAMS,
  })

  const isEditor = useMemo(() => {
    return permission != EPermission.VIEWER;
  }, [permission]);

  const currentDoctor = useMemo(() => {
    return dashboard?.doctors?.filter((d: any) => d.id == doctorId)[0]
  }, [dashboard, doctorId]);

  const isDoctor = useMemo(() => {
    if (currentDoctor) {
      return currentDoctor.user_role?.name == 'SPECIALIST' || currentDoctor.user_role?.name == 'FELLOW' || currentDoctor.user_role?.name == 'RESIDENT';
    }
    return false;
  }, [currentDoctor]);

  const doctorName = useMemo(() => {
    const doctor = dashboard?.doctors?.filter((d: any) => d.id == doctorId)[0];
    if (doctor?.name) {
      const name = isDoctor ? `Dr. ${currentDoctor.name}` : `${currentDoctor.name}`;
      return name;
    }
    return '';
  }, [dashboard]);

  return (
    <SharedDashboardContext.Provider value={{ doctorId, permission, isEditor, doctorName }}>
      {children}
    </SharedDashboardContext.Provider>
  );
};
