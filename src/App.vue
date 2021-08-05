<template>
  <div id="app">
    <div id="nav  " class="bg_black-6 shadow_bevel-light p_3 c_white">
      <span class="font_bold m-r_3">ACC: Agenda Management</span>
      <router-link class="c_white-7 h:c_white" to="/">Program</router-link> |
      <router-link class="c_white-7 h:c_white" to="/Channels">Channels</router-link> |
      <router-link class="c_white-7 h:c_white" to="/Agenda">Agenda</router-link>|
      <router-link class="c_white-7 h:c_white" to="/Session">Session</router-link> |
      <a href="https://whimsical.com/agenda-system-WVsXdajknU2oQuzCBuRPaz" target="_blank" class="link c_white-7 h:c_white">System Flow Document</a>
    </div>
    <router-view/>
  </div>
</template>


