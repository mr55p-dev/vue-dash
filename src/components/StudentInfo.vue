<script setup>
const { name, id } = defineProps(['name', 'id'])
</script>

<template>
	<div id="student-info" class="grid-card glass">
		<header>Your info</header>
		<h4>Hi, {{ name }}</h4>
		<pre>{{ id }}</pre>
		<p>Check your upcoming classes, notifications and enrolled courses here.</p>
	</div>
</template>
