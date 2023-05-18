export interface ListLines {
  ok:    boolean;
  lines: Line[];
  total: number;
}

export interface Line {
  name:        string;
  indicative:  string;
  description?: string;
  created_at?:  Date;
  updated_at?:  Date;
  id?:          string;
}

export interface LineForm {
  name: string;
  indicative: string;
  description: string;
}
