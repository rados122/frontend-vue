<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Campaign } from '../models/Campaign';
import TYPES from '../data/campaign_types.json';

const props = defineProps<{
  submitted: boolean;
  campaign: Campaign | undefined;
}>();

const form = ref({
  name: '',
  type: 1,
  rangeDate: [],
});

const types = ref(TYPES);

const isValidForm = computed(() => {
  return !!(form.value.name && form.value.type && isValidRangeDate.value);
});

const isValidRangeDate = computed(() => {
  return !!(
    form.value.rangeDate &&
    form.value.rangeDate.length &&
    form.value.rangeDate.filter((element) => !!element).length === 2
  );
});

const populateForm = (campaign: Campaign) => {
  const {
    campaign_name,
    campaign_type,
    campaign_start_time,
    campaign_end_time,
  } = campaign;
  const values = {
    name: campaign_name,
    type: campaign_type,
    rangeDate: [new Date(campaign_start_time), new Date(campaign_end_time)],
  };
  Object.assign(form.value, values);
};

onMounted(() => {
  if (props.campaign) {
    populateForm(props.campaign);
  }
});

defineExpose({
  form,
  isValidForm,
});
</script>
<template>
  <form class="p-fluid">
    <div class="field">
      <label for="name">Name</label>
      <InputText
        id="name"
        required="true"
        v-model="form.name"
        :class="{ 'p-invalid': submitted && !form.name }"
      />
      <small class="p-error" v-if="submitted && !form.name">
        Name is required.
      </small>
    </div>
    <div class="field">
      <label for="range">Start Date - End Date</label>
      <Calendar
        id="range"
        selectionMode="range"
        :showIcon="true"
        v-model="form.rangeDate"
        :class="{ 'p-invalid': submitted && !isValidRangeDate }"
      />
      <small class="p-error" v-if="submitted && !isValidRangeDate">
        Please select the date range.
      </small>
    </div>
    <div class="field">
      <label for="type">Type</label>
      <Dropdown
        id="type"
        required="true"
        optionLabel="label"
        option-value="id"
        :options="types"
        v-model="form.type"
      />
    </div>
  </form>
</template>
