import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/Playlist/CreatePlaylist.vue";
import PlaylistDetails from "../views/Playlist/PlaylistDetails.vue";
import UserPlaylists from "../views/Playlist/UserPlaylists.vue";

import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  const unsubscribe = projectAuth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Auth state resolved: Logged in");
      next();
    } else {
      console.log("Auth state resolved: Not logged in");
      next({ name: "Login" });
    }
    unsubscribe(); // stop listening once we get the state
  });
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: requireAuth, // Ensure user is authenticated before accessing this route
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlist/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth, // Ensure user is authenticated before accessing this route
  },
  {
    path: "/playlist/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth, // Ensure user is authenticated before accessing this route
    props: true, // Pass route params as props to the component
  },
  {
    path: "/playlists/user",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth, // Ensure user is authenticated before accessing this route
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
