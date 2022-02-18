<template>
    <div>
        <Completion></Completion>
        <Employment></Employment>
        <Qualified></Qualified>
        <Education></Education>
    </div>
</template>

<script>
    import axios from "axios";
    import Completion from './Completion';
    import Employment from './Employment';
    import Qualified from './Qualified';
    import Education from './Education';
    export default {
        name: "Summary",
        components:{
            Completion,
            Employment,
            Qualified,
            Education
        }


    }
</script>

<style scoped>

</style>