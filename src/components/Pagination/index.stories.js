import V64Pagination from './index.vue';

export default {
  title: 'Pagination',
  component: V64Pagination,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Pagination },
  data: () => ({ model: args.page }),
  template: '<V64Pagination v-bind="$props" v-model="model" @change="change" />',
});

export const FewPages = Template.bind({});
FewPages.args = { pages: 4, page: 1 };

export const ManyPages = Template.bind({});
ManyPages.args = { pages: 100, page: 50 };

export const WiderWindow = Template.bind({});
WiderWindow.args = { pages: 100, page: 50, around: 3 };
