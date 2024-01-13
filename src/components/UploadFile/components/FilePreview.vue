<template>
	<component :is="tag" class="file-preview" :class="checked ? 'checked' : ''" title="Xem file">
		<div @click="$emit('remove', file)" class="close-icon" title="xóa">&times;</div>
		<img @click="$emit('preview', file)" :src="imageTypes.includes(file.file.type) ? file.url : defaultFile" :alt="file.file.name" :title="file.file.name" />
		<div class="name-file-preview" v-if="!imageTypes.includes(file.file.type)">
			<p>{{ !imageTypes.includes(file.file.type) ? file.file.name : file.file.type}}</p>
		</div>
		<span class="status-indicator loading-indicator" v-show="file.status == 'loading'">In Progress</span>
		<span class="status-indicator success-indicator" v-show="file.status == true">Uploaded</span>
		<span class="status-indicator failure-indicator" v-show="file.status == false">Error</span>
	</component>
</template>

<script setup>
const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const defaultFile = '/assets/images/file.png'
defineProps({
	file: { type: Object, required: true },
	tag: { type: String, default: 'li' },
	checked: { type: String, default: '' },
})

defineEmits(['remove', 'preview'])
</script>