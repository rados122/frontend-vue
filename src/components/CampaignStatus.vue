<script setup lang="ts">
import { computed, ref } from 'vue';
import { Status } from '../models/Campaign';
const props = defineProps<{
  campaignStatusId: number;
}>();

const getStatusLabel = computed(() => {
  return Status.getStatusLabel(props.campaignStatusId);
});
</script>
<template>
  <span :class="`customer-badge status-${getStatusLabel}`">
    {{ getStatusLabel }}
  </span>
</template>
