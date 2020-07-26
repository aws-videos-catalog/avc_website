<template>
<div>
  <div class="body">
    <nuxt />
  </div>
  
  <div class="footer container">
    <div class="footer">
      <!-- <img src="/company_logo_rectangle.svg" width="200px"> -->
      <p>Est.2016, Copr. <a href="https://0x4447.com">0x4447™</a> LLC.</p>
      <p>|</p>
      <p><a href="#">Terms of Service</a></p>
      <p><a href="#">Privacy Policy</a> </p>
    </div>
  </div>
</div>
</template>

<style>
.body{
  min-height:100%;
  min-width:100%;
}

.footer{
  display:flex;
  flex-direction:row;
  justify-content: center;
  padding-top:50px;
  padding-bottom:30px;
  color:#888888
}

.footer p{
  margin:15px;
}

.footer a{
  text-decoration:none;
  color:inherit;
  font-weight:600;
}


</style>
  