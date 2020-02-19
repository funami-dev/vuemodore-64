import V64Page from '../components/Page/';
import V64Toggle from '../components/Toggle/';

export default {
  title: 'All',
};

export const wohooo = () => ({
  render: h => (
    <V64Page showHeader showCursor showReady>
      <V64Toggle label="Turn" />
    </V64Page>
  ),
});
