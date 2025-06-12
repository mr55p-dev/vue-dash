<script setup>
import { ref } from 'vue';
defineProps(['notifications', 'loading', 'hasUnread'])
const emit = defineEmits(['read'])
const showNotif = ref(false);
function readAll() {
	showNotif.value = false
	emit('read')
}
</script>

<template>
	<nav class="container glass">
		<div />
		<p class="header">University Portal</p>
		<div class="notif-wrapper">
			<button :disabled="loading" @click="() => showNotif = !showNotif"
				:class="{ 'nav-icon': true, notif: true, 'has-unread': !!hasUnread }">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bell"
					viewBox="0 0 16 16">
					<path
						d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
				</svg>
			</button>

			<Transition>
				<div class="notif-win glass" v-show="showNotif">
					<ul class="separated-list scrolling">
						<li v-for="notif in $props.notifications" :class="{ read: notif.read }" :key="notif.id">
							<p>{{ notif.message }}</p>
						</li>
					</ul>
					<footer>
						<button @click="readAll()" class="read-all">Read all</button>
					</footer>
				</div>
			</Transition>
		</div>
	</nav>
</template>
<style scoped>
.notif-wrapper {
	position: relative;
	z-index: 10;
}

.notif-win {
	position: absolute;
	z-index: 10;
	top: calc(100% + 12px);
	right: 0;
	background-color: hsl(0, 0%, 100%);

	min-height: 200px;
	max-height: 350px;
	min-width: 250px;
	width: fit-content;

	text-align: left;
	padding: 8px 12px;
}

.read {
	color: hsl(0, 0%, 50%);
}

footer {
	width: 100%;
	display: grid;
	place-items: center;
}

.read-all {
	position: relative;
	margin: 0 auto;
	padding: 8px;
	border-radius: 2px;
}

.read-all:hover {
	background: hsla(0, 0%, 90%, 1);
	color: black;
}

nav {
	margin-top: 12px;
	margin-bottom: 24px;
	display: grid;
	grid-template-columns: max-content 1fr max-content;
	text-align: center;
	align-items: baseline;

	&>* {
		margin: auto 0;
	}

	.header {
		font-weight: 600;
	}

	button {
		border-radius: 50%;
		border: none;
		background: none;
		padding: 4px;
		transition: background 0.25s ease;
	}

	button:hover {
		background-color: hsla(0, 0%, 15%, 0.25);
	}
}

.nav-icon {
	width: 50px;
	height: 50px;
	place-self: center;
	display: grid;
	place-items: center;
}

.nav-icon.notif {
	position: relative;
}

.nav-icon.notif.has-unread::after {
	content: '';
	position: absolute;
	bottom: 10%;
	right: 15%;
	background: hsla(0, 90%, 50%, 0.95);
	border-radius: 100%;
	height: 12px;
	width: 12px;
}

.v-enter-active,
.v-leave-active {
	transition:
		opacity 0.5s ease,
		transform 0.5s ease,
		backdrop-filter 0.5s ease;
}

.v-enter-to,
.v-leave-from {
	opacity: 1;
	transform: scale(1);
	backdrop-filter: blur(3px);
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: scale(0.95);
	backdrop-filter: blur(0px);
}
</style>
