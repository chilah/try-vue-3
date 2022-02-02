<template>
  <div v-if="!user">Loading</div>

  <div v-else>{{ user.profile?.username }}</div>
</template>

<script lang="ts">
import useTest from "@/composable/useTest";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const { user, fetchProfile, state } = useTest();

    // onMounted(async () => {
    //   await fetchProfile();

    //   console.log("state", state.profile?.username);
    // });

    return {
      aaa:
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
