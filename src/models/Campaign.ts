import TYPES from '../data/campaign_types.json';
import STATUS from '../data/campaign_status.json';

export class Campaign {
  public campaign_name: string;
  public campaign_type: number;
  public campaign_start_time: number;
  public campaign_end_time: number;
  public campaign_status_id: number;
  public campaign_id: number;

  constructor(
    name: string,
    type: number,
    startDate: Date,
    endDate: Date,
    status = 1,
    id = new Date().getTime()
  ) {
    this.campaign_name = name;
    this.campaign_type = type;
    this.campaign_start_time = startDate.getTime();
    this.campaign_end_time = endDate.getTime();
    this.campaign_status_id = status;
    this.campaign_id = id;
  }
}

export class Type {
  public id: number;
  public label: string;

  constructor(id: number, label: string) {
    this.id = id;
    this.label = label;
  }

  public static getTypeLabel(id: number): string {
    const type = TYPES.find((t) => t.id === id);
    return type ? type.label : 'Unknown';
  }
}

export class Status {
  public id: number;
  public label: string;

  constructor(id: number, label: string) {
    this.id = id;
    this.label = label;
  }

  public static getStatusLabel(id: number): string {
    const status = STATUS.find((t) => t.id === id);
    return status ? status.label : 'Unknown';
  }
}
