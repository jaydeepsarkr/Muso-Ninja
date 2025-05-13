<template>

<form >
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit" @click.prevent="login">Login</button>
</form>
</template>

<script>
export default {

}
</script>

<style>

</style>
