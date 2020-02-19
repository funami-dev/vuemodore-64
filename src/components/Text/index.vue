<template>
  <V64Text><slot></slot></V64Text>
</template>
<script>
import styled from 'vue-styled-components';

const V64Text = styled.pre`
  margin: 16px 0;
  color: ${props => props.color};
`;

export default {
  components: {
    V64Text,
  },
};
</script>
