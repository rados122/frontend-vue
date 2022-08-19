<script setup lang="ts">
import { Campaign } from '../models/Campaign';
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CampaignService from '../services/CampaignService';
import CampaignDialog from './CampaignDialog.vue';

const campaigns = ref<Campaign[]>([]);
const campaignService = ref<CampaignService>(new CampaignService());
const campaignDialog = ref<InstanceType<typeof CampaignDialog> | null>(null);
const toast = useToast();

const openCampaign = (data?: Campaign): void => {
  if (campaignDialog.value) {
    campaignDialog.value.open(data);
  }
};

const getCampaigns = (): void => {
  campaigns.value = campaignService.value.getCampaigns();
};

const changeStatus = (campaignId: number, statusId: number): void => {
  campaignService.value.changeStatus(campaignId, statusId);
  const msg =
    statusId === 0
      ? 'Campaign deleted successfully'
      : 'Campaign active successfully';
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 3000,
  });
  getCampaigns();
};

onMounted(getCampaigns);
</script>
<template>
  <DataTable :value="campaigns" responsiveLayout="scroll">
    <template #header>
      <Button
        label="New"
        icon="pi pi-plus"
        class="p-button-success"
        @click="openCampaign()"
      />
    </template>
    <Column field="campaign_name" header="Name" :sortable="true"></Column>
    <Column field="campaign_type" header="Type" :sortable="true">
      <template #body="{ data: { campaign_type } }">
        {{ Campaign.convertCampaignTypeLabel(campaign_type) }}
      </template>
    </Column>
    <Column field="campaign_start_time" header="Start Date" :sortable="true">
      <template #body="{ data: { campaign_start_time } }">
        {{ Campaign.convertDateFormat(campaign_start_time) }}
      </template>
    </Column>
    <Column field="campaign_end_time" header="End Date" :sortable="true">
      <template #body="{ data: { campaign_end_time } }">
        {{ Campaign.convertDateFormat(campaign_end_time) }}
      </template>
    </Column>
    <Column field="campaign_status_id" header="Status" :sortable="true">
      <template #body="{ data: { campaign_status_id } }">
        <span
          :class="
            'customer-badge status-' +
            Campaign.convertCampaignStatusLabel(campaign_status_id)
          "
        >
          {{ Campaign.convertCampaignStatusLabel(campaign_status_id) }}
        </span>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-primary mr-2"
          @click="openCampaign(data)"
        />
        <Button
          v-if="data.campaign_status_id === 1"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="changeStatus(data.campaign_id, 0)"
        />
        <Button
          v-if="data.campaign_status_id === 0"
          icon="pi pi-check"
          class="p-button-rounded p-button-success"
          @click="changeStatus(data.campaign_id, 1)"
        />
      </template>
    </Column>
    <template #empty>No customers found.</template>
  </DataTable>
  <CampaignDialog
    ref="campaignDialog"
    @response="getCampaigns"
  ></CampaignDialog>
</template>
