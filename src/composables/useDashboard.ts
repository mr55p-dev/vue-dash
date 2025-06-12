import { ref, onMounted, type Ref } from 'vue';

type Student = { id: string, name: string }
type Course = { id: string, name: string, startsAt: string }
type Event = { id: string, title: string, location: string, startTime: string }
type Notification = { id: string, message: string, read: boolean }

type Response = {
  student: Student,
  enrolledCourses: Course[],
  upcomingEvents: Event[],
  notifications: Notification[],
}

export default function useDashboard(): {
  student: Ref<Student | null>,
  courses: Ref<Course[]>,
  events: Ref<Event[]>,
  notifications: Ref<Notification[]>,
  isLoading: Ref<boolean>,
} {
  const student = ref<Student | null>(null)
  const courses = ref<Course[]>([])
  const events = ref<Event[]>([])
  const notifications = ref<Notification[]>([])
  const isLoading = ref(true)

  async function getStudentInfo() {
    try {
      const res = await fetch('/response.json')
      const data: Response = await res.json()
      student.value = data.student
      events.value = data.upcomingEvents
      courses.value = data.enrolledCourses
	  notifications.value = data.notifications
    } catch (e) {
      console.error('Failed to fetch', e)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => setTimeout(async () => {
    await getStudentInfo()
    isLoading.value = false
  }, 1000))

  return { student, courses, events, notifications, isLoading }
}
