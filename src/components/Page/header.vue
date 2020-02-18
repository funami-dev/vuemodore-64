<template>
  <V64Head>
    <V64Text>**** COMMODORE 64 BASIC V2 ****</V64Text>
    <V64Text>64K RAM SYSTEM 38911 BASIC BYTES FREE</V64Text>
  </V64Head>
</template>
<script>
import styled from 'vue-styled-components';

const V64Head = styled.div`
  text-align: center;
`;

const V64Text = styled.pre`
  margin: 16px 0;
  color: ${props => props.speed};
`;

export default {
  components: {
    V64Head,
    V64Text,
  },
};
</script>
