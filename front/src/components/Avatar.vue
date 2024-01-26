<template>
  <v-container fluid style="height: 300px">
    <v-row justify="center">
      <v-menu min-width="200px" rounded open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar
              color="brown"
              size="large"
              image="https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg"
            >
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
                image="https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg"
              ></v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
    <v-row>
      <div class="mx-auto text-center">
        <v-avatar
          color="brown"
          image="https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg"
        ></v-avatar>
        <h3>{{ user.fullName }}</h3>
      </div>
    </v-row>




    <v-row>


      <button type="button" class="v-btn v-btn--elevated v-btn--icon v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated" targetref="[object Object]" aria-haspopup="menu" aria-expanded="false" aria-owns="v-menu-19"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span class="v-btn__content" data-no-activator=""><div class="v-avatar v-theme--light bg-brown v-avatar--density-default v-avatar--size-large v-avatar--variant-flat"><div class="v-responsive v-img" aria-label=""><div class="v-responsive__sizer" style="padding-bottom: 100%;"></div><img class="v-img__img v-img__img--cover" src="https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg" alt="" style=""><!----><!----><!----><!----><!----></div><!----><span class="v-avatar__underlay"></span></div></span><!----><!----></button>

    </v-row>
  </v-container>
</template>
  <script>
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
};
</script>