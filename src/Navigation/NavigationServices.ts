import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';
import { navigationRef, RootStackParamList } from './Navigation';

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

export const toggleDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};

export const openDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
};

export const closeDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
};

export const push = (...args: Parameters<typeof StackActions.push>) => {
  if (args.length === 1) {
    args.push({});
  }
  navigationRef.current?.dispatch(StackActions.push(...args));
};
export const pop = (...args: Parameters<typeof StackActions.pop>) => {
  navigationRef.current?.dispatch(StackActions.pop(...args));
};

export const goBack = () => {
  navigationRef?.current?.dispatch(CommonActions.goBack());
};

export const reset = (...args: Parameters<typeof CommonActions.reset>) => {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
};

export const replace = (...args: Parameters<typeof StackActions.replace>) => {
  navigationRef.current?.dispatch(StackActions.replace(...args));
};

export const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};
