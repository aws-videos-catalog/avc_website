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
      <p><a href="https://legal.0x4447.com/avc/terms_of_service.pdf">Terms of Service</a></p>
      <p><a href="https://legal.0x4447.com/avc/privacy_policy.pdf">Privacy Policy</a> </p>
    </div>
  </div>
</div>
</template>

<style>
.body{
  min-height:100%;
  min-width:100%;
}

.ad{
  height:auto;
}

.listing-container{
  margin-top:2rem;
}

.footer{
  display:flex;
  flex-direction:row;
  justify-content: center;
  padding-top:30px;
  padding-bottom:30px;
  color: var(--color-font-elevated-02);
}

.footer p{
  margin:15px;
  margin-top:0px;
}

.footer a{
  text-decoration:none;
  color:inherit;
  font-weight:600;
}

</style>
