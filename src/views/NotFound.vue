<template>
  <div class="h-screen flex items-center justify-center px-4">
    <div class="grid-row grid-rows-6">
      <div class="row-span-3 row-start-2 flex justify-center">
        <img src="../../src/assets/img/404.png" width="700rem" alt="" />
      </div>
      <div class="row-span-2 text-center">
        <h1>Unauthorized Route</h1>
        <p class="w-full">
          Please Note this might be as a result an invalid route of an
          Unathourized Access, Kindly Visit our website for more Info
        </p>
        <button class="bg-purple-700 px-10 py-2 rounded text-white">
          More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
</style>