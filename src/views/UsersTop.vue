<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <router-link :to="{ name:'user', params: {id: user.id}}">
          <img
            src="貼上引用圖片網址，同學可自行選擇圖片進行實作"
            width="140px"
            height="140px"
          >
        </router-link>
        <router-link :to="{ name:'user', params: {id: user.id}}">
          <h2>{{user.name}}</h2>
        </router-link>
        <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            @click.stop.prevent="deleteFollow(user.id)"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            v-else
            @click.stop.prevent="addFollow(user.id)"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'

const dummyUser = {
    "users": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$NqpZERKF9t/0EfEYNvYUf.FpvIxql.3AotHscNvnhCrLUN4mVfDvO",
            "isAdmin": true,
            "image": null,
            "createdAt": "2022-09-12T12:57:07.000Z",
            "updatedAt": "2022-09-12T12:57:07.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$38X.UAUF.Vj/xRW2QqfPIOiuNE9PdLPpnLEg3jbawXvM8lJDRejAS",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        },
        {
            "id": 3,
            "name": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$nOA5BFGS7IFzR0YTvk.zGuQ3Cpu7eW2EgI/DhNdAoEfStCGmihdeG",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        }
    ]
}

export default {
  name: 'UsersTop',
  components: {
    NavTabs
  },
  data(){
    return {
      users: dummyUser.users,
      isFollowed: false
    }
  },
  methods: {
    deleteFollow(id) {
      this.users.forEach(user =>{
        if(user.id === id)
        return user.isFollowed = false
      })
    },
    addFollow(id) {
      this.users.forEach(user =>{
        if(user.id === id)
        return user.isFollowed = true
      })
    }
  }
}
</script>