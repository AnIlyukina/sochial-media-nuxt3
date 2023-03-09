<template>
  <div>
    <div  class="pt-5 space-y-6">
      <UIInput
        v-model="data.username"
        label="Username"
        placeholder="Anna"
      />
      <UIInput
        v-model="data.password"
        label="Password"
        placeholder="********"
        type="password"
      />

      <div>
        <button @click="handleLogin">
          Login
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from "../../composables/useAuth";

const { login } = useAuth()
const data = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await login({
      username: data.username,
      password: data.password
    })

  } catch (error) {
    console.log(error)
  } finally {

  }
}

</script>
