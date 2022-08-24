<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { Campaign } from '../models/Campaign';
import { useCampaignStore } from '../stores/campaign';
import CampaignForm from './CampaignForm.vue';

const display = ref(false);
const campaignForm = ref<InstanceType<typeof CampaignForm> | null>(null);
const submitted = ref(false);
const campaignStore = useCampaignStore();
const campaign = ref<Campaign>();
const editMode = ref(false);
const toast = useToast();

const open = (data?: Campaign) => {
  display.value = true;
  submitted.value = false;
  campaign.value = data;
  editMode.value = data ? true : false;
};

const close = () => {
  display.value = false;
};

const onSubmit = () => {
  submitted.value = true;
  if (campaignForm.value?.isValidForm) {
    if (editMode.value) {
      editCampaign();
    } else {
      addCampaign();
    }
  }
};

const addCampaign = () => {
  if (campaignForm.value) {
    const { name, type, rangeDate } = campaignForm.value.form;
    const [startDate, endDate] = rangeDate;
    const newCampaign = new Campaign(name, type, startDate, endDate);
    campaignStore.addCampaign(newCampaign);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Campaign added successfully',
      life: 3000,
    });
    close();
  }
};

const editCampaign = () => {
  if (campaignForm.value) {
    const { name, type, rangeDate } = campaignForm.value.form;
    const [startDate, endDate] = rangeDate;
    const newCampaign = new Campaign(
      name,
      type,
      startDate,
      endDate,
      campaign.value?.campaign_status_id,
      campaign.value?.campaign_id
    );
    campaignStore.editCampaign(newCampaign);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Campaign edited successfully',
      life: 3000,
    });
    close();
  }
};

defineExpose({
  open,
});
</script>
<template>
  <Dialog
    :header="editMode ? 'Edit Campaign' : 'Add Campaign'"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    v-model:visible="display"
  >
    <CampaignForm
      v-if="display"
      ref="campaignForm"
      :submitted="submitted"
      :campaign="campaign"
    ></CampaignForm>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="close"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        autofocus
        @click="onSubmit"
        :disabled="!campaignForm?.isValidForm && submitted"
      />
    </template>
  </Dialog>
</template>
