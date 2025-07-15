import { h } from 'vue'
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, Circle, XCircle, HelpCircle, Clock } from 'lucide-vue-next'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(HelpCircle),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(Circle),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(Clock),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircle2),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(XCircle),
  },
]

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(ArrowDown),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(ArrowRight),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(ArrowUp),
  },
]
