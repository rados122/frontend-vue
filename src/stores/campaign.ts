import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Campaign } from '../models/Campaign';
import CampaignService from '../services/CampaignService';

export const useCampaignStore = defineStore('campaign', () => {
  const campaigns = ref<Campaign[]>([]);
  const campaignService = ref<CampaignService>(new CampaignService());

  function getCampaigns(): void {
    campaigns.value = campaignService.value.getCampaigns();
  }

  function addCampaign(newCampaign: Campaign): void {
    campaigns.value.push(newCampaign);
    campaignService.value.saveCampaigns(campaigns.value);
  }

  function editCampaign(newCampaign: Campaign): void {
    const index = campaigns.value.findIndex(
      (campaign) => campaign.campaign_id === newCampaign.campaign_id
    );
    campaigns.value.splice(index, 1, newCampaign);
    campaignService.value.saveCampaigns(campaigns.value);
  }

  return { campaigns, getCampaigns, addCampaign, editCampaign };
});
