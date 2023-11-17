import { createAction } from '@reduxjs/toolkit';

const initialize = createAction('app/initialize');

const appActions =  { initialize };
export default appActions
