import { setupDynamicPage } from './dynamic_data.js';

setupDynamicPage({
  selectId: 'object-select',
  endpoint: '/api/pool_visits',
  payloadKey: 'visits',
  dateFieldName: 'visit_date',
  valueFieldName: 'n_visitors'
});
