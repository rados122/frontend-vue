<script setup lang="ts">
import { Campaign } from '../models/Campaign';
import { useCampaignStore } from '../stores/campaign';
import { useToast } from 'primevue/usetoast';

defineEmits(['edit']);
const props = defineProps<{ campaign: Campaign }>();
const campaignStore = useCampaignStore();
const toast = useToast();

function deleteClicked(campaign_status_id: number): void {
  const newCampaign = { ...props.campaign, campaign_status_id };
  campaignStore.editCampaign(newCampaign);
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Campaign deleted successfully',
    life: 3000,
  });
}
</script>
<template>
  <Button
    icon="pi pi-pencil"
    class="p-button-rounded p-button-secondary mr-2"
    @click="$emit('edit', campaign)"
  />
  <Button
    v-if="campaign.campaign_status_id === 1"
    icon="pi pi-check"
    class="p-button-rounded p-button-success"
    @click="deleteClicked(0)"
  />
  <Button
    v-else
    icon="pi pi-trash"
    class="p-button-rounded p-button-danger"
    @click="deleteClicked(1)"
  />
</template>
