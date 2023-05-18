export interface linesGroupsOrder {
    linesId?:string,
    linesName: string;
    lisGroup: [];
  }

  export interface Lines {
    ok:    boolean;
    lines: Line[];
    total: number;
}

export interface Line {
    name:        string;
    indicative:  string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
    id:          string;
}
