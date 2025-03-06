import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';
import { navigationRef, RootStackParamList } from './Navigation';

const navigate = (name: keyof RootStackParamList, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

const toggleDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};

const openDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
};

const push = (...args: Parameters<typeof StackActions.push>) => {
  if (args.length === 1) {
    args.push({});
  }
  navigationRef.current?.dispatch(StackActions.push(...args));
};

const pop = (...args: Parameters<typeof StackActions.pop>) => {
  navigationRef.current?.dispatch(StackActions.pop(...args));
};

const goBack = () => {
  navigationRef?.current?.dispatch(CommonActions.goBack());
};

const reset = (...args: Parameters<typeof CommonActions.reset>) => {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
};

const replace = (...args: Parameters<typeof StackActions.replace>) => {
  navigationRef.current?.dispatch(StackActions.replace(...args));
};

const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

export {
  navigate,
  toggleDrawer,
  openDrawer,
  closeDrawer,
  push,
  pop,
  goBack,
  reset,
  replace,
  popToTop,
};
