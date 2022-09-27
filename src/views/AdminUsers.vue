<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.email}}</td>
          <td v-show="user.isAdmin">admin</td>
          <td v-show="user.isAdmin">
            <button @click.stop.prevent="toggleUserRole(user.id)" type="button" class="btn btn-link">set as user</button>
          </td>
          <td v-show="!user.isAdmin">user</td>
          <td v-show="!user.isAdmin">
            <button @click.stop.prevent="toggleUserRole(user.id)" type="button" class="btn btn-link">set as admin</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";

const dummyUser = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$NqpZERKF9t/0EfEYNvYUf.FpvIxql.3AotHscNvnhCrLUN4mVfDvO",
      isAdmin: true,
      image: null,
      createdAt: "2022-09-12T12:57:07.000Z",
      updatedAt: "2022-09-12T12:57:07.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$38X.UAUF.Vj/xRW2QqfPIOiuNE9PdLPpnLEg3jbawXvM8lJDRejAS",
      isAdmin: false,
      image: null,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$nOA5BFGS7IFzR0YTvk.zGuQ3Cpu7eW2EgI/DhNdAoEfStCGmihdeG",
      isAdmin: false,
      image: null,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
    },
  ],
};

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data(){
    return {
      users : []
    }
  },
  created(){
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      const { users } = dummyUser
      return this.users = users
    },
    toggleUserRole(userId){
      this.users = this.users.map ((user) => {
        if(user.id === userId) {
          return {
            ...user,
            isAdmin : !user.isAdmin
          }
        }
        //要記得加這行，因為map會去比對全部的user.id，他比對不到就會就會出現error
        return user
      })
    },
  }
};
</script>