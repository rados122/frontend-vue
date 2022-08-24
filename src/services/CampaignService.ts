import { Campaign } from '../models/Campaign';

export default class CampaignService {
  public getCampaigns(): Campaign[] {
    const data = localStorage.getItem('campaigns');
    return data ? JSON.parse(data) : [];
  }

  public saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }
}
