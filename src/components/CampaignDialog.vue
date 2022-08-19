<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { Campaign, CampaignType } from '../models/Campaign';
import CampaignService from '../services/CampaignService';

const displayDialog = ref<boolean>(false);
const form = ref<{
  campaign_name: string;
  range_date: Date[];
  campaign_type: number;
}>({
  campaign_name: '',
  range_date: [],
  campaign_type: 1,
});
const campaign = ref<Campaign | undefined>();
const campaignService = ref<CampaignService>(new CampaignService());
const isLoading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const emit = defineEmits(['response']);
const toast = useToast();
const submitted = ref<boolean>(false);

const open = (data?: Campaign): void => {
  displayDialog.value = true;
  initForm();
  if (data) {
    campaign.value = data;
    isEdit.value = true;
    populateForm(data);
  }
};

const close = (): void => {
  displayDialog.value = false;
};

const populateForm = (data: Campaign): void => {
  const {
    campaign_name,
    campaign_start_time,
    campaign_end_time,
    campaign_type,
  } = data;
  form.value = {
    campaign_name,
    range_date: [new Date(campaign_start_time), new Date(campaign_end_time)],
    campaign_type,
  };
};

const onSubmit = (): void => {
  submitted.value = true;
  if (!validForm.value) {
    return;
  }
  isEdit.value ? editCampaign() : createCampaign();
};

const editCampaign = (): void => {
  const { campaign_name, range_date, campaign_type } = form.value;
  let [startDate, endDate] = range_date;
  const campaign_start_time = startDate.getTime();
  const campaign_end_time = endDate.getTime();
  const newCampaign = {
    ...campaign.value,
    campaign_name,
    campaign_type,
    campaign_start_time,
    campaign_end_time,
  };
  campaignService.value.editCampaign(newCampaign);
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Campaign edited successfully',
    life: 3000,
  });
  emit('response');
  submitted.value = false;
  close();
};

const createCampaign = (): void => {
  const { campaign_name, range_date, campaign_type } = form.value;
  const [campaign_start_time, campaign_end_time] = range_date;
  const newCampaign = new Campaign(
    campaign_name,
    campaign_start_time,
    campaign_end_time,
    campaign_type
  );
  campaignService.value.createCampaign(newCampaign);
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Campaign added successfully',
    life: 3000,
  });
  emit('response');
  submitted.value = false;
  close();
};

const validForm = computed(() => {
  return (
    form.value.campaign_name && form.value.campaign_type && validDate.value
  );
});

const validDate = computed(() => {
  return (
    form.value.range_date.length &&
    form.value.range_date.filter((date) => !!date).length === 2
  );
});

const initForm = (): void => {
  form.value = {
    campaign_name: '',
    range_date: [],
    campaign_type: 1,
  };
  submitted.value = false;
};

defineExpose({
  open,
});
</script>
<template>
  <Dialog
    v-model:visible="displayDialog"
    :style="{ width: '450px' }"
    header="Create campaign"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Name</label>
      <InputText
        id="name"
        required="true"
        v-model="form.campaign_name"
        :class="{ 'p-invalid': submitted && !form.campaign_name }"
      />
      <small class="p-error" v-if="submitted && !form.campaign_name">
        Name is required.
      </small>
    </div>
    <div class="field">
      <label for="range">Start Date - End Date</label>
      <Calendar
        id="range"
        v-model="form.range_date"
        selectionMode="range"
        :showIcon="true"
        :class="{ 'p-invalid': submitted && !validDate }"
      />
      <small class="p-error" v-if="submitted && !validDate">
        Please select the date range.
      </small>
    </div>
    <div class="field">
      <label for="type">Type</label>
      <Dropdown
        id="type"
        required="true"
        :options="CampaignType"
        optionLabel="label"
        option-value="value"
        v-model="form.campaign_type"
      />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="close"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        autofocus
        :disabled="!validForm && submitted"
        :loading="isLoading"
        @click="onSubmit"
      />
    </template>
  </Dialog>
</template>
