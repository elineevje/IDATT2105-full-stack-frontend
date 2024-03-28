<template>
    <div class="home">
        <Calculator msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

export default {
    name: "HomeView",
    components: {
        Calculator
    }
};
</script>
