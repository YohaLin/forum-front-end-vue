<template>
  <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="profile.image"
            width="300px"
            height="300px"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{profile.name}}</h5>
            <p class="card-text">{{profile.email}}</p>
            <ul class="list-unstyled list-inline">
              <li><strong>{{profile.Comments.length}}</strong> 已評論餐廳</li>
              <li><strong>{{profile.FavoritedRestaurants.length}}</strong> 收藏的餐廳</li>
              <li><strong>{{profile.Followings.length}}</strong> followings (追蹤者)</li>
              <li><strong>{{profile.Followers.length}}</strong> followers (追隨者)</li>
            </ul>
            <p>
              <router-link :to="{name: 'user-edit', params: {id: profile.id}}" v-if="profile.isAdmin">
                <button  type="submit" class="btn btn-primary">edit</button>
              </router-link>
                <template v-else>
                  <button 
                    v-if="profile.isFollowed" 
                    @click.stop.prevent="deleteFollow"
                    type="submit" 
                    class="btn btn-danger">
                    取消追蹤
                  </button>
                  <button 
                    v-else 
                    @click.stop.prevent="addFollow"
                    type="submit" 
                    class="btn btn-primary">
                    追蹤
                  </button>
                </template>
              
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfileCard',
  props: {
    initialProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      profile : this.initialProfile
    }
  },
  methods: {
    deleteFollow(){
      this.profile = {
        ...this.profile,
        isFollowed : false
      }
    },
    addFollow(){
      this.profile = {
        ...this.profile,
        isFollowed : true
      }
    }
  }
}
</script>