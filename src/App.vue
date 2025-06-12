<script setup lang="ts">
import StudentInfo from './components/StudentInfo.vue';
import Header from './components/Header.vue';
import useDashboard from './composables/useDashboard';
import { computed } from 'vue';

const { student, courses, events, notifications, isLoading: loading } = useDashboard()

function formatDate(dt: string): string {
	return new Date(dt).toLocaleString()
}

function handleRead() {
	notifications.value.forEach(n => n.read = true)
}

const hasUnread = computed(() => notifications.value.some(n => !n.read))

</script>

<template>
	<Header :loading :notifications="notifications" :hasUnread="hasUnread" @read="handleRead" />
	<Transition>
		<div v-if="!loading" class="main-grid container">
			<StudentInfo :name="student?.name" :id="student?.id" />
			<div id="courses" class="grid-card glass">
				<header>Your courses</header>
				<ul class="separated-list scrolling">
					<li v-for="course of courses" :key="course.id">
						<p>{{ course.name }}</p>
						<small>From {{ formatDate(course.startsAt) }}</small>
					</li>
				</ul>
			</div>
			<div id="timetable" class="grid-card glass">
				<header>Events</header>
				<ul class="separated-list">
					<li v-for="event of events" :key="event.id">
						<p>{{ event.title }}</p>
						<p class="location">{{ event.location }}</p>
						<small>At {{ formatDate(event.startTime) }}</small>
					</li>
				</ul>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.main-grid {
	position: relative;
	display: grid;
	z-index: -1;
	grid-template-columns: min(300px, 50%) 1fr;
	grid-template-rows: repeat(2, auto);
	grid-template-areas: "student-info courses"
		"timetable timetable";
	gap: 24px;
	height: 100%;
	width: 100%;
	margin: 0 auto 48px auto;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-template-areas: "student-info"
			"courses"
			"timetable";
		gap: 8px;
	}
}

.grid-card {
	height: 100%;
	min-height: 240px;
	width: 100%;
	padding: 1rem;

	@media (max-width: 768px) {
		padding: 1rem;
	}

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


.grid-card#student-info {
	grid-area: student-info;

}

.grid-card#courses {
	grid-area: courses;

}

.grid-card#timetable {
	grid-area: timetable;
}

.location {
	color: hsl(0, 0%, 40%);
}
</style>
