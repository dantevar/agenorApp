import { setupDynamicPage } from './dynamic_data.js';

setupDynamicPage({
  selectId: 'objekt-select',
  endpoint: '/api/water_additions',
  payloadKey: 'additions',
  dateFieldName: 'addition_date',
  valueFieldName: 'capacity'
});
  