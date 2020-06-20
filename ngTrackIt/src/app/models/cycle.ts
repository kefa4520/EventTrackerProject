export class Cycle {
  id: number;
  name: string;
  periodDuration: number;
  cycleLength: number;
  notes: string;
  volume: string;
  periodStart: string;

  constructor(id?: number,
              name?: string,
              periodDuration?: number,
              cycleLength?: number,
              notes?: string,
              volume?: string,
              periodStart?: string){
      this.id = id;
      this.name = name;
      this.periodDuration = periodDuration;
      this.cycleLength = cycleLength;
      this.notes = notes;;
      this.volume = volume;
      this.periodStart = periodStart;

    }

}
