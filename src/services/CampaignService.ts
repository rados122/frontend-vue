import { Campaign } from '../models/Campaign';

export default class CampaignService {
  public getCampaigns(): Campaign[] {
    const value = localStorage.getItem('campaigns');
    const campaigns = value ? JSON.parse(value) : [];
    return campaigns;
  }

  public createCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }

  public editCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(
      (c) => c.campaign_id === campaign.campaign_id
    );
    campaigns[index] = campaign;
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }

  public changeStatus(campaignId: number, statusId: number): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex((c) => c.campaign_id === campaignId);
    campaigns[index].campaign_status_id = statusId;
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }
}
