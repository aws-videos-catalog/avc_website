<template>
  <div>
    <div
      class="embed-responsive embed-responsive-16by9"
      style="border-radius:0.25rem"
    >
      <iframe
        class="embed-responsive-item"
        :src="embeddedUrl"
        frameborder="0"
        title="yt-video"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen />
    </div>
    <h3 class="mt-3"> {{ video.title }} </h3>
    <p> Posted at, {{ formattedDate }} </p>
  </div>
</template>

<script>
export default {
  name: 'MainVideoPlayer',

  props: {
    video: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    embeddedUrl () {
      return 'https://www.youtube.com/embed/' + this.video.id
    },

    formattedDate () {
      return new Date(this.video.date).toDateString()
    }
  }
}
</script>
