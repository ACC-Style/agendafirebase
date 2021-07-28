<template>
  <div id="app">
    <div id="nav  " class="bg_black-6 shadow_bevel-light p_3 c_white">
      <span class="font_bold m-r_3">ACC: Agenda Management</span>
      <router-link class="c_white-7 h:c_white" to="/">Program</router-link> |
      <router-link class="c_white-7 h:c_white" to="/Channels">Channels</router-link> |
      <router-link class="c_white-7 h:c_white" to="/Sessions">Sessions</router-link>
    </div>
    <router-view/>
  </div>
</template>


