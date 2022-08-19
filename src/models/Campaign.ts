export class Campaign {
  public campaign_name: string;
  public campaign_start_time: number;
  public campaign_end_time: number;
  public campaign_type: number;
  public campaign_status_id?: number;
  public campaign_id?: number;

  constructor(
    name: string,
    startDate: Date,
    endDate: Date,
    type: number,
    status = 1,
    id = new Date().getTime()
  ) {
    this.campaign_name = name;
    this.campaign_start_time = startDate.getTime();
    this.campaign_end_time = endDate.getTime();
    this.campaign_type = type;
    this.campaign_status_id = status;
    this.campaign_id = id;
  }

  public static convertDateFormat(timestamp: number): string {
    return new Date(timestamp).toISOString().substring(0, 10);
  }

  public static convertCampaignTypeLabel(value: number): string {
    const type = CampaignType.find((type) => type.value === value);
    return type ? type.label : '';
  }

  public static convertCampaignStatusLabel(value: number): string {
    const status = CampaignStatus.find((status) => status.value === value);
    return status ? status.label : '';
  }
}

export const CampaignType = [
  {
    value: 1,
    label: 'Standard',
  },
  {
    value: 2,
    label: 'AB Test',
  },
  {
    value: 3,
    label: 'MV Test',
  },
];

const CampaignStatus = [
  {
    value: 0,
    label: 'deleted',
  },
  {
    value: 1,
    label: 'active',
  },
];
