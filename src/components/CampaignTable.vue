<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCampaignStore } from '../stores/campaign';
import { Campaign, Type, Status } from '../models/Campaign';
import CampaignDialog from './CampaignDialog.vue';
import CampaignAction from './CampaignAction.vue';
import CampaignStatus from './CampaignStatus.vue';
import { useDateFormat } from '../use/useDateFormat';

const campaignStore = useCampaignStore();
const campaignDialog = ref<InstanceType<typeof CampaignDialog> | null>(null);

const openCampaignDialog = (data?: Campaign): void =>
  campaignDialog.value?.open(data);

onMounted(() => campaignStore.getCampaigns());
</script>
<template>
  <DataTable :value="campaignStore.campaigns" responsiveLayout="scroll">
    <template #header>
      <Button
        label="New"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="openCampaignDialog()"
      />
    </template>
    <Column field="campaign_name" header="Name" :sortable="true"></Column>
    <Column field="campaign_type" header="Type" :sortable="true">
      <template #body="{ data }">
        {{ Type.getTypeLabel(data.campaign_type) }}
      </template>
    </Column>
    <Column field="campaign_start_time" header="Start Date" :sortable="true">
      <template #body="{ data }">
        {{ useDateFormat(data.campaign_start_time) }}
      </template>
    </Column>
    <Column field="campaign_end_time" header="End Date" :sortable="true">
      <template #body="{ data }">
        {{ useDateFormat(data.campaign_end_time) }}
      </template>
    </Column>
    <Column field="campaign_status_id" header="Status" :sortable="true">
      <template #body="{ data }">
        <CampaignStatus
          :campaignStatusId="data.campaign_status_id"
        ></CampaignStatus>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <CampaignAction
          :campaign="data"
          @edit="(c) => openCampaignDialog(c)"
        ></CampaignAction>
      </template>
    </Column>
  </DataTable>
  <CampaignDialog ref="campaignDialog"></CampaignDialog>
</template>
