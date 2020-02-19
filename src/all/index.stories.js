import V64Page from '../components/Page/';
import V64Toggle from '../components/Toggle/';
import V64Text from '../components/Text/';

export default {
  title: 'All',
};

export const wohooo = () => ({
  render: h => (
    <V64Page showHeader showCursor showReady>
      <V64Toggle label="Turn" />
      <V64Text>And i'm a text</V64Text>
    </V64Page>
  ),
});
