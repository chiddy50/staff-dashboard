<template> 
	<div class="row">
	<div class="col-md-12 flex justify-center ">
		<div class="h-32 w-32 relative">
			<i class="fal fa-pen cursor-pointer absolute bg-orange-500 text-white p-2 bottom-0 right-0 h-8 w-8 rounded-circle"
			></i>
			<img class="rounded-circle shadow-md" :src="imageurl" />
		</div>
		
	</div>
</div>

</template>
<script>
import Axios from 'axios';
export default {
	name: 'viewimage',
	data() {
		return {
			cropper: {},
			image_url: '',
		};
	},
	props: ['image', 'defaultimage', 'id', 'function', 'url'],
	computed: {
		imageurl() {
			if (!this.image) {
				return this.defaultimage;
			}
			return this.image;
		},
	},
	methods: {
		

		
	},
	mounted() {},
};
</script>
